import laya

from app.questions.laya import QUESTIONS

model = laya.load("multilingual")

state = {
    "new": "Fuerte sismo sacude Panamá y enciende las alarmas en zonas costeras",
    "body": "Nota de actualización sobre el sismo registrado en Panamá, reportes de daños y pronunciamiento de las autoridades de emergencia."
}

res = model.predict(state, QUESTIONS)
print(res["answers"]["emociones"])
