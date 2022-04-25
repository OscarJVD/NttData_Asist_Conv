let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function configApp(){
    const BASE_URL = './static/videos/';
    const ID_RANDOM_PREDICTION = guid();
    const ID_RANDOM_DESPEDIDA = guid();
    const ID_RANDOM_SABIAS_QUE = guid();
    const ID_RANDOM_NTTDATA = guid();
    const ID_RANDOM_AWS = guid();

    const constants = {
        BUTTONS_CONFIRM_NAME:{
            DEFAULT:{
                YES:"Si, Me gustaria",
                NO: "No, gracias"
            },
            PREDICTION:{
                YES:"Si, buena idea",
                NO: "De momento no"
            }
        },
        //ids
        ID_RANDOM_PREDICTION,
        ID_RANDOM_DESPEDIDA,
        ID_RANDOM_SABIAS_QUE,
        ID_RANDOM_NTTDATA,
        ID_RANDOM_AWS,
        //idle
        IDLE:"idle",
        OTRA_TEMATICA:"otra-tematica",
        //init part
        SALUDO:"saludo",
        PRESENTACION_INICIAL_ONLY_QUESTIONS: "presentacion-inicial-only-questions",
        PRESENTACION_INICIAL: "presentacion-inicial",

        SABIAS_QUE:"sabias-que",
        NTT_DATA:"ntt-data",
        ASSISTANT:"assistant",
        //predictions part
        PREDICTIONS_INTRODUCTION:"predicciones",
        PREDICTIONS_RANDOM_1: ID_RANDOM_PREDICTION+"#1",
        PREDICTIONS_RANDOM_2: ID_RANDOM_PREDICTION+"#2",
        PREDICTIONS_RANDOM_3: ID_RANDOM_PREDICTION+"#3",
        PREDICTIONS_RANDOM_4: ID_RANDOM_PREDICTION+"#4",
        PREDICTIONS_RANDOM_5: ID_RANDOM_PREDICTION+"#5",
        PREDICTIONS_QUESTION_REPEAT: "predicciones-question-continue",
        //despedida
        DESPEDIDA:"despedida",
        RH_DESPEDIDA_RANDOM_1: ID_RANDOM_DESPEDIDA+"#1",
        RH_DESPEDIDA_RANDOM_2: ID_RANDOM_DESPEDIDA+"#2",

        //storage for randoms
        STORAGE_PREDICTIONS:"STORAGE_PREDICTIONS",
        STORAGE_SABIAS_QUE:"STORAGE_SABIAS_QUE",
        STORAGE_NTTDATA:"STORAGE_NTTDATA",
        STORAGE_AWS:"STORAGE_AWS",
        STORAGE_DESPEDIDA:"STORAGE_DESPEDIDA",
    }
    const commands = {
        saludo: ['Hola', 'hola', 'Holi', 'Buenos dias', 'Buenas tardes', 'Buenas noches', 'Buenas', 'Hello', 'Hi', 'Good Morning', 'Good afternoon', 'Good night'],
        sabiasQue: ['sabias que', 'sabias', '¿Sabías que?', "sabias que?"],
        prediction: ["Predicciones","predicciones","prediciones","predictions"],
        assitenteAws: ["asistente","Aws"],
        nttData: ["nttdata","ntt data"],
        confirmacion:["Sí.","si", "dale caña", "me gustaria", "si me gustaria", "Sí, buena idea", "buena idea"],
        negacion:["No.", "no", " no, gracias", "No, gracias", "No de momento", "No, de momento"]
    }
    const folders = {
        idle: BASE_URL+"0_IDLE/",
        presentacion: BASE_URL+"2_PRESENTACIÓN_INICIAL/",
        saludo: BASE_URL+"1_SALUDOS/",
        predictions: BASE_URL+"3_PREDICCIONES/",
        despedida: BASE_URL+"8_DESPEDIDA/",
        rh: BASE_URL+"7_OFERTA_RRHH/",
    }
    return {
        commands,
        constants,
        videos:{
            [constants.IDLE]:folders.idle+"0_IDLE.mp4",
            [constants.OTRA_TEMATICA]: folders.predictions+"10_PREGUNTA_PREDICCIONES_OTRA_TEMATICA_.mp4"
            ,
            [constants.SALUDO]: folders.saludo+"1_SALUDO_INICIAL.mp4",

            [constants.PRESENTACION_INICIAL]: folders.presentacion+"2_PRESENTACIÓN_INICIAL.mp4",
            [constants.PRESENTACION_INICIAL_ONLY_QUESTIONS]: folders.presentacion+"24_PRESENTACIÓN_CUANDO_VIENE_DE_PREGUNTA.mp4",

            [constants.PREDICTIONS_INTRODUCTION]: folders.predictions+ "3_INTRODUCCIÓN_PREDICCIONES.mp4",
            [constants.PREDICTIONS_RANDOM_1] :folders.predictions+"4_PRIMERA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_2] :folders.predictions+"5_SEGUNDA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_3] :folders.predictions+"6_TERCERA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_4] :folders.predictions+"7_CUARTA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_RANDOM_5] :folders.predictions+"8_QUINTA_PREDICCIÓN.mp4",
            [constants.PREDICTIONS_QUESTION_REPEAT] :folders.predictions+"9_PREGUNTA_SOBRE_PREDICCIONES.mp4",

            [constants.SABIAS_QUE]: BASE_URL+"8_DESPEDIDA/27_DESPEDIDA.mp4",
            [constants.RH_DESPEDIDA_RANDOM_1]: folders.rh+"25_OFERTA_RRHH_R1.mp4",
            [constants.RH_DESPEDIDA_RANDOM_2]: folders.rh+"26_OFERTA_RRHH_R2.mp4",
            [constants.DESPEDIDA]: folders.despedida+"27_DESPEDIDA.mp4",

        }
    }
}