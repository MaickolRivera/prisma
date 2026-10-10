import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LAYERS } from "@/data/layers";
import type { LayerId, LayerReading } from "@/types";

interface Props {
  values: Record<LayerId, LayerReading>;
  focus: LayerId;
  onFocus: (id: LayerId) => void;
}

interface LabelDef {
  pos: [number, number];
  anchor: [number, number];
  el: HTMLDivElement;
  tag: boolean;
}

interface LayerObj {
  group: THREE.Group;
  vis: number;
  fillOp: number;
  cur: { x: number; y: number; c: number };
  meshes: THREE.Mesh[];
  fillMat: THREE.MeshBasicMaterial;
  borderMat: THREE.LineBasicMaterial;
  gridMat: THREE.LineBasicMaterial;
  axMat: THREE.LineBasicMaterial;
  arrowMat: THREE.MeshBasicMaterial;
  arrow: THREE.Group;
  shaft: THREE.Mesh;
  head: THREE.Mesh;
  labels: LabelDef[];
}

const S = 1.7; // valor (±1) → unidades de escena
const HALF = 2; // semilado de cada plano
const SPACING = 1.35; // separación entre capas apiladas
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function square(h: number) {
  return [new THREE.Vector3(-h, 0, -h), new THREE.Vector3(h, 0, -h), new THREE.Vector3(h, 0, h), new THREE.Vector3(-h, 0, h)];
}

export function LayerScene(props: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const labelsEl = labelsRef.current!;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const UP = new THREE.Vector3(0, 1, 0);
    const objs: Record<string, LayerObj> = {};

    LAYERS.forEach((ld) => {
      const col = new THREE.Color(ld.color);
      const group = new THREE.Group();

      const fillMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false });
      const fill = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, HALF * 2).rotateX(-Math.PI / 2), fillMat);
      fill.userData.layer = ld.id;
      fill.renderOrder = 1;
      group.add(fill);

      const borderMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.9 });
      group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(square(HALF)), borderMat));

      const gridPts: THREE.Vector3[] = [];
      [-1, 1].forEach((k) => {
        const p = (k * HALF) / 2;
        gridPts.push(new THREE.Vector3(-HALF, 0, p), new THREE.Vector3(HALF, 0, p), new THREE.Vector3(p, 0, -HALF), new THREE.Vector3(p, 0, HALF));
      });
      const gridMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.22 });
      group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(gridPts), gridMat));

      const axPts = [new THREE.Vector3(-HALF, 0, 0), new THREE.Vector3(HALF, 0, 0), new THREE.Vector3(0, 0, -HALF), new THREE.Vector3(0, 0, HALF)];
      const axMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.6 });
      group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(axPts), axMat));

      const arrowMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 1 });
      const arrow = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1, 12), arrowMat);
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 18), arrowMat);
      shaft.renderOrder = 2;
      head.renderOrder = 2;
      shaft.userData.layer = ld.id;
      head.userData.layer = ld.id;
      arrow.add(shaft, head);
      group.add(arrow);
      scene.add(group);

      const mk = (cls: string, html: string) => {
        const el = document.createElement("div");
        el.className = `scene-lbl ${cls}`;
        el.style.setProperty("--c", ld.color);
        el.innerHTML = html;
        labelsEl.appendChild(el);
        return el;
      };
      const labels: LabelDef[] = [
        { pos: [HALF + 0.12, 0], anchor: [0, -50], el: mk("", ld.x[1]), tag: false },
        { pos: [-HALF - 0.12, 0], anchor: [-100, -50], el: mk("", ld.x[0]), tag: false },
        { pos: [0, -HALF - 0.1], anchor: [-50, -110], el: mk("", ld.y[1]), tag: false },
        { pos: [0, HALF + 0.1], anchor: [-50, 10], el: mk("", ld.y[0]), tag: false },
      ];

      objs[ld.id] = {
        group, vis: 1, fillOp: 0.1,
        cur: { x: 0, y: 0, c: propsRef.current.values[ld.id].c },
        meshes: [fill, shaft, head],
        fillMat, borderMat, gridMat, axMat, arrowMat, arrow, shaft, head, labels,
      };
    });

    // eje vertical que atraviesa la pila
    const stackAxis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1, 0)]),
      new THREE.LineBasicMaterial({ color: 0x8a99a6, transparent: true, opacity: 0.45 }),
    );
    scene.add(stackAxis);

    /* --- cámara e interacción --- */
    let theta = 0.75, phi = 1.02, phiT = 1.02, zoom = 1.4;
    let spread = 1, spreadT = 1;
    let autoRotate = !reduce;
    let dragging = false, moved = 0, lx = 0, ly = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; autoRotate = false;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
      theta -= dx * 0.008;
      phi = clamp(phi - dy * 0.008, 0.12, 1.52);
      phiT = phi;
    };
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const pick = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      let targets: THREE.Mesh[] = [];
      LAYERS.forEach((l) => { if (objs[l.id].vis > 0.5) targets = targets.concat(objs[l.id].meshes); });
      const hits = ray.intersectObjects(targets, false);
      if (!hits.length) return;
      const arrowHit = hits.find((h) => (h.object as THREE.Mesh).geometry.type !== "PlaneGeometry");
      propsRef.current.onFocus(((arrowHit ?? hits[0]).object.userData.layer) as LayerId);
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (moved < 5) pick(e);
    };
    const onCancel = () => { dragging = false; };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom = clamp(zoom * (1 + e.deltaY * 0.001), 0.6, 1.6);
    };
    const onKey = (e: KeyboardEvent) => {
      let used = true;
      if (e.key === "ArrowLeft") theta += 0.12;
      else if (e.key === "ArrowRight") theta -= 0.12;
      else if (e.key === "ArrowUp") { phi = clamp(phi - 0.1, 0.12, 1.52); phiT = phi; }
      else if (e.key === "ArrowDown") { phi = clamp(phi + 0.1, 0.12, 1.52); phiT = phi; }
      else if (e.key === "+" || e.key === "=") zoom = clamp(zoom * 0.92, 0.6, 1.6);
      else if (e.key === "-") zoom = clamp(zoom * 1.08, 0.6, 1.6);
      else used = false;
      if (used) { e.preventDefault(); autoRotate = false; }
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("keydown", onKey);

    const resize = () => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    /* --- bucle --- */
    const proj = new THREE.Vector3();
    const dir = new THREE.Vector3();
    let last = performance.now();
    let raf = 0;

    const frame = (t: number) => {
      const p = propsRef.current;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const k = reduce ? 1 : 1 - Math.exp(-dt * 6);

      spread += (spreadT - spread) * k;
      phi += (phiT - phi) * k;
      if (autoRotate) theta += dt * 0.12;

      const aspect = camera.aspect || 1;
      const radius = 9.8 * zoom * (aspect < 1 ? 1 / Math.pow(Math.max(aspect, 0.5), 0.8) : 1);
      camera.position.set(radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta));
      camera.lookAt(0, 0, 0);

      const n = LAYERS.length;
      const w = wrap.clientWidth, h = wrap.clientHeight;

      LAYERS.forEach((ld, i) => {
        const o = objs[ld.id];
        const target = p.values[ld.id];
        const isFocus = p.focus === ld.id;

        o.group.visible = o.vis > 0.01;
        o.group.position.y = ((n - 1) / 2 - i) * SPACING * spread;

        o.cur.x += (target.x - o.cur.x) * k;
        o.cur.y += (target.y - o.cur.y) * k;
        o.cur.c += (target.c - o.cur.c) * k;

        o.fillOp += ((isFocus ? 0.17 : 0.07) - o.fillOp) * k;
        o.fillMat.opacity = o.fillOp * o.vis;
        o.borderMat.opacity = (isFocus ? 1 : 0.6) * o.vis;
        o.gridMat.opacity = 0.22 * o.vis;
        o.axMat.opacity = (isFocus ? 0.7 : 0.4) * o.vis;
        o.arrowMat.opacity = (0.35 + 0.65 * o.cur.c) * o.vis;

        // la flecha sale del centro hacia (x, y); y positivo = hacia el fondo
        const vx = o.cur.x * S, vz = -o.cur.y * S;
        const len = Math.hypot(vx, vz);
        if (len < 0.08) {
          o.arrow.visible = false;
        } else {
          o.arrow.visible = true;
          dir.set(vx / len, 0, vz / len);
          o.arrow.quaternion.setFromUnitVectors(UP, dir);
          const hl = Math.min(0.3, len * 0.45);
          o.shaft.scale.y = Math.max(0.001, len - hl);
          o.shaft.position.y = (len - hl) / 2;
          o.head.scale.y = hl / 0.3;
          o.head.position.y = len - hl / 2;
        }

        o.labels.forEach((l) => {
          proj.set(l.pos[0], o.group.position.y, l.pos[1]).project(camera);
          const sx = (proj.x * 0.5 + 0.5) * w;
          const sy = (-proj.y * 0.5 + 0.5) * h;
          l.el.style.transform = `translate(${sx.toFixed(1)}px,${sy.toFixed(1)}px) translate(${l.anchor[0]}%,${l.anchor[1]}%)`;
          const show = l.tag ? 0.95 : isFocus ? 1 : 0;
          l.el.style.opacity = proj.z < 1 ? (show * o.vis).toFixed(2) : "0";
        });
      });

      stackAxis.scale.y = ((n - 1) * SPACING * spread + 0.7) / 2;
      (stackAxis.material as THREE.LineBasicMaterial).opacity = 0.45 * clamp(1 - (1 - spread) * 1.4, 0, 1);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("keydown", onKey);
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      labelsEl.replaceChildren();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative size-full">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        className="absolute inset-0 size-full cursor-grab touch-none active:cursor-grabbing"
        aria-label="Escena 3D con una capa por categoría y una flecha en cada una. Usa las flechas del teclado para girar y más o menos para acercar."
      />
      <div ref={labelsRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" />
    </div>
  );
}
