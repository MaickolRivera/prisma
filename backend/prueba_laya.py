import laya

from app.questions.laya import QUESTIONS

model = laya.load("multilingual")

state = {
    "new": "La UE aprueba la histórica Ley de Inteligencia Artificial para regular los sistemas de riesgo en Europa",
    "body": "El Parlamento Europeo aprobó con amplia mayoría el primer marco legal integral del mundo para regular la inteligencia artificial. La normativa prohíbe aplicaciones de IA que representen un 'riesgo inaceptable' (como la categorización biométrica no autorizada o el reconocimiento de emociones en espacios de trabajo) e impone estrictos requisitos de transparencia para modelos generativos de propósito general. Mientras los promotores celebran el texto como un hito para la protección de los derechos ciudadanos, diversos gremios tecnológicos advierten que los altos costes de cumplimiento podrían frenar la innovación y la competitividad de las startups europeas frente a EE. UU. y China."
}

res = model.predict(state, QUESTIONS)
for nombre, respuesta in res["answers"].items():
    valor = respuesta.get("choice", respuesta.get("noul"))
    print(f"{nombre:25} {valor}")
