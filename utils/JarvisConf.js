// INSTANCIA DE JARVIS
let Jarvis = new Artyom();

// START ARTYOM
// Esta funcion inicia artyom en el reconocimiento discontinuo (para conexiones http)
function startOneCommandArtyom() {
  artyom.fatality(); // Detener cualquier instancia previa

  setTimeout(function () { // Esperar 250ms para inicializar
    artyom.initialize({
      lang: "en-GB", // Más lenguajes son soportados, lee la documentación
      continuous: false, // Reconoce 1 solo comando y basta de escuchar
      listen: true, // Iniciar !
      debug: true, // Muestra un informe en la consola
      speed: 1 // Habla normalmente
    }).then(function () {
      console.log("Ready to work !");
    });
  }, 250);
}

function startArtyom(language, mode, recognizeType = true) {
  if (!language)
    language = Jarvis.getLanguage();

  let _startArtyom = function () {
    Jarvis.initialize({
      lang: language, // Start artyom with provided language
      continuous: recognizeType ? true : false, // Continuous mode enabled
      listen: true, // Start recognizing
      debug: true, // Show everything in the console
      speed: 5, // talk normally
      volume: 1,
      soundex: true, // Use the soundex algorithm to understand different words
      mode: mode, // Opciones: quick, normal, slow
      // name: "jarvis"
      // obeyKeyword: "start again",
      // executionKeyword: "now" // say "now" at the end of a command to execute it immediately
    });
  }

  console.log("Artyom is listening to your commands");

  // stop artyom if stills active
  Jarvis.fatality();
  setTimeout(_startArtyom, 250);
}

let respuestaMode = 'quick';

document.getElementById('saludoTrack').addEventListener('ended', () => {
  setTimeout(() => {
    playVideo('preguntaTrack')
  }, 1200);
});

document.getElementById('respuestaTrack').addEventListener('ended', () => {

  if (document.getElementById("videoMsgRespuesta"))
    document.getElementById("videoMsgRespuesta").classList.add("d-none");

  // Jarvis.fatality(); // stop artyom if stills active

  // setTimeout(() => {
  //   startArtyom('es-ES', respuestaMode);
  // }, 250)
});

function configVideos(arrVideoElementsIds = ["reposoTrack", "saludoTrack", "preguntaTrack", "respuestaTrack", "cierreTrack"]) {


  arrVideoElementsIds.forEach(video => {
    let videoElement = document.getElementById(video);
    videoElement.style.width = screen.width;
    videoElement.style.height = screen.height;

    if (video != 'reposoTrack') {
      document.getElementById(video).addEventListener('ended', () => {
        document.getElementById(video).style.display = 'none';
        document.getElementById('reposoTrack').style.display = 'inherit';
        document.getElementById('reposoTrack').play();
      });

      document.getElementById(video).addEventListener('play', () => {
        document.getElementById('reposoTrack').style.display = 'none';
      });
    }
  });
}

async function playVideo(videoId) {
  document.getElementById(videoId).style.display = 'inherit';
  await document.getElementById(videoId).play();
}

configVideos();

if (!Jarvis.recognizingSupported()) {
  alert("navegador no soportado. Se necesita Google Chrome versión 25 y posteriores")
}

Jarvis.when("SPEECH_SYNTHESIS_START", function () {
  if (Jarvis.isRecognizing() || Jarvis.isSpeaking()) {
    Jarvis.dontObey();
  }
});

Jarvis.when("SPEECH_SYNTHESIS_END", function () {
  setTimeout(() => {
    if (!Jarvis.isRecognizing() || !Jarvis.isSpeaking()) {
      Jarvis.obey();
    }
  }, 1000);
});

const commands = {
  saludos: ['Hola', 'hola','Holi','Buenos dias','Buenas tardes','Buenas noches','Buenas','Hello','Hi','Good Morning','Good afternoon','Good night'],
  respuestasPreguntaArteFavorito: ['Mona Lisa','Romero y Juelita','Joan Miró', 'Odisea'],
  respuestasOpinionRobot: ['Excelente','Muy bien','Excelente respuesta','Que inteligente eres','Gracias','Buena Respuesta'],
  modoReposo: ['reposo'],
  modoFrasesLentas: ['lento', 'cortas', 'lento'],
  modoFrasesNormales: ['normal', 'normales', 'normal'],
  modoFrasesLargas: ['largo', 'largas', 'rapido'],
  silenciar: ['silencio', 'callate'],
}

const arrsCommands = Object.values(commands)
const arrAttachedCommands = [].concat(...arrsCommands);
const arrAttachedCommandsLength = arrAttachedCommands.length
const commandsLengths = []
arrsCommands.forEach(elem => commandsLengths.push(elem.length))

const commandsLengthsLength = commandsLengths.length
const arrSec = []
let acumulador = [];

for (let i = 0; i < commandsLengthsLength; i++) {
  if (i == 0) {
    arrSec.push(commandsLengths[i])
    acumulador.push(commandsLengths[i])
  } else {
    arrSec.push(acumulador.reduce((a, b) => a + b, 0) + commandsLengths[i])
    acumulador.push(commandsLengths[i])
  }
}

function identifySection(arrSecti, commandIndex) {
  let lastIndex = 0,
    defValue = 0;

  arrSecti.forEach((elem, index) => {

    if (commandIndex >= lastIndex && commandIndex < elem) {
      lastIndex = elem;
      defValue = index;
      return;
    }

    lastIndex = elem;
  })

  console.log(defValue, 'defValue')

  return defValue
}

let flag = false

Jarvis.on(arrAttachedCommands).then(function (i) {

  const defCommand = identifySection(arrSec, i)

  console.log('defCommand', defCommand)
  switch (defCommand) {
    case 0:
      playVideo('saludoTrack');
      break;
    case 1:
      playVideo('respuestaTrack');
      break;
    case 2:
      playVideo('cierreTrack');
      break;
    case 3:
      playVideo('reposoTrack');
      Jarvis.say("Estoy sin hacer nada");
      break;
    case 4:
      Jarvis.say("Modo frases lentas activado", {
        onStart() {
          Jarvis.dontObey();
        },
        onEnd() {
          Jarvis.obey();
        },
      })
      startArtyom('es-ES', 'slow');
      if (respuestaMode) respuestaMode = 'slow'
      break;
    case 5:
      Jarvis.say("Modo frases normales activado", {
        onStart() {
          Jarvis.dontObey();
        },
        onEnd() {
          Jarvis.obey();
        },
      })
      startArtyom('es-ES', 'normal');
      if (respuestaMode) respuestaMode = 'normal'
      break;
    case 6:
      Jarvis.say("Modo frases rápidas activado", {
        onStart() {
          Jarvis.dontObey();
        },
        onEnd() {
          Jarvis.obey();
        },
      })
      startArtyom('es-ES', 'quick');
      if (respuestaMode) respuestaMode = 'quick'
      break;
    case 7:
      console.log('PAUSADO')
      // if (!flag) {
      //   document.querySelectorAll('video').forEach(elem => {

      //     console.log(elem)
      //     // elem.setAttribute('muted', 'true')
      //     // elem.defaultMuted = true;
      //     elem.pause();
      //     // elem.currentTime = 0;
      //   });

      //   flag = true;
      // }
      Jarvis.shutUp();

      break;
  }
});

// // Catch errors
Jarvis.when("ERROR", function (data) {
  console.error(data);
});

document.querySelectorAll('video').forEach(elem => {
  if (elem.id != 'reposoTrack') {
    elem.addEventListener('play', function () {
      Jarvis.dontObey();
    });

    elem.addEventListener('ended', function () {
      setTimeout(() => {
        Jarvis.obey();
      }, 1000);
    });
  }
});

document.getElementById('btnActiveRecognizer').addEventListener('click', function () {
  startArtyom("es-ES", 'quick', false);
});

Jarvis.redirectRecognizedTextOutput((recognized, isFinal) => {
  console.log('TEXTO RECONOCIDO  ', recognized, `isFinal ${isFinal}`);

  arrAttachedCommands.forEach(async (cmd, cmdIndex) => {
    if ( // Si coincide con algún comando o si lo que se dice tiene alguna coincidencia entre comandos
      (
        recognized.toLowerCase() == cmd.toLowerCase()
        || recognized.toLowerCase().includes(cmd.toLowerCase())
        || cmd.toLowerCase().includes(recognized.toLowerCase())
      )
      // && isFinal
    ) {
      let ask;

      const defCommand = identifySection(arrSec, cmdIndex)

      switch (defCommand) {
        case 0:
          ask = "Hola, encantada, mi nombre es eva la asistente virtual de la feria"
          break;
        case 1:
          ask = "Dime, de las 7 obras que visté, ¿Cuál te gusto mas?"
          break;
        case 2:
          ask = "Es una de mis favoritas, su autor Jhoan fue un pintor, escultor, grabador y ceramista español" // opinion sobre eso
          break;
        case 3:
          ask = "Reposo"
          break;
        case 4:
          ask = "Activación frases lentas"
          break;
        case 5:
          ask = "Activación frases normales"
          break;
        case 6:
          ask = "Activación frases rápidas"
          break;
        case 7:
          ask = "silencio"
          break;
      }

      await postData('storeAnswers', { ask, answer: recognized })
    }
  })
});