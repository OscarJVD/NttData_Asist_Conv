function configApp(){
    const BASE_URL = 'http://localhost:9001/videos/';
    const constants = {
        PREDICTIONS:"predicciones",
        SALUDO:"saludo",
        IDLE:"idle",
        DESPEDIDA:"despedida",
    }
    const commands = {
        saludo: ['Hola', 'hola', 'Holi', 'Buenos dias', 'Buenas tardes', 'Buenas noches', 'Buenas', 'Hello', 'Hi', 'Good Morning', 'Good afternoon', 'Good night'],
    }
    return {
        commands,
        constants,
        videos:{
            [constants.IDLE]:BASE_URL+"6_IDLE.mp4",
            [constants.SALUDO]: BASE_URL+"1_SALUDO_INICIAL.mp4",
            [constants.PREDICTIONS]: BASE_URL+"4_TEGUSTARIAHABLAROTRATEMATICA.mp4",
            [constants.DESPEDIDA]: BASE_URL+"5_DESPEDIDA.mp4",
        }
    }
}