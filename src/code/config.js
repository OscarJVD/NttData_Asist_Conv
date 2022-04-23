function configApp(){
    const BASE_URL = 'http://localhost:9001/videos/';
    const constants = {
        PREDICTIONS:"predicciones",
        SALUDO:"saludo",
        SABIAS_QUE:"sabias-que",
        IDLE:"idle",
        DESPEDIDA:"despedida",
    }
    const commands = {
        saludo: ['Hola', 'hola', 'Holi', 'Buenos dias', 'Buenas tardes', 'Buenas noches', 'Buenas', 'Hello', 'Hi', 'Good Morning', 'Good afternoon', 'Good night'],
        sabiasQue: ['sabias que', 'sabias', '¿Sabías que?', "sabias que?"],
        prediction: ["Predicciones","predicciones","prediciones","predictions"],
        confirmacion:["Sí.","si", "dale caña", "esta bien"],
        negacion:["No.", "no", "deja asi"]
    }
    return {
        commands,
        constants,
        videos:{
            [constants.IDLE]:BASE_URL+"6_IDLE.mp4",
            [constants.SALUDO]: BASE_URL+"1_SALUDO_INICIAL.mp4",
            [constants.PREDICTIONS]: BASE_URL+"4_TEGUSTARIAHABLAROTRATEMATICA.mp4",
            [constants.DESPEDIDA]: BASE_URL+"5_DESPEDIDA.mp4",
            [constants.SABIAS_QUE]: BASE_URL+"5_DESPEDIDA.mp4"
        }
    }
}