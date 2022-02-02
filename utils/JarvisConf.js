// INSTANCIA DE JARVIS
let Jarvis = new Artyom();

// START ARTYOM
// Esta funcion inicia artyom en el reconocimiento discontinuo (para conexiones http)
function startOneCommandArtyom() {
  artyom.fatality(); // Detener cualquier instancia previa

  setTimeout(function() { // Esperar 250ms para inicializar
    artyom.initialize({
      lang: "en-GB", // Más lenguajes son soportados, lee la documentación
      continuous: false, // Reconoce 1 solo comando y basta de escuchar
      listen: true, // Iniciar !
      debug: true, // Muestra un informe en la consola
      speed: 1 // Habla normalmente
    }).then(function() {
      console.log("Ready to work !");
    });
  }, 250);
}

function startArtyom(language, mode, recognizeType = true) {
  if (!language)
    language = Jarvis.getLanguage();

  let _startArtyom = function() {
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

Jarvis.when("SPEECH_SYNTHESIS_START", function() {
  if (Jarvis.isRecognizing() || Jarvis.isSpeaking()) {
    Jarvis.dontObey();
  }
});

Jarvis.when("SPEECH_SYNTHESIS_END", function() {
  setTimeout(() => {
    if (!Jarvis.isRecognizing() || !Jarvis.isSpeaking()) {
      Jarvis.obey();
    }
  }, 1000);
});

const commands = {
  saludos: ['saludos', 'hola', 'Buenas', 'Buenos días', 'Como vas'],
  respuestasPreguntaArteFavorito: ['monalisa', 'odisea', 'romeo y julieta'],
  respuestasOpinionRobot: ['a bueno', 'me alegra', 'si sabe'],
  modoReposo: ['reposo'],
  modoFrasesLentas: ['lento', 'cortas', 'lento'],
  modoFrasesNormales: ['normal', 'normales', 'normal'],
  modoFrasesLargas: ['largo', 'largas', 'rapido'],
  silenciar: ['silencio', 'callate'],
}

const definitiveCommands = postData('synonyms', commands)
console.log(definitiveCommands);

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

Jarvis.on(arrAttachedCommands).then(function(i) {

  const defCommand = identifySection(arrSec, i)

  console.log('defCommand', defCommand)
  switch (defCommand) {
    case 0:

      if (getRandomArbitrary(1, 2) == 1) {
        playVideo('saludoTrack');
      } else {
        /**
         * Say something random of what is in the array when this function is triggered.
         */
        let randomSay = [
          "Buenos días",
          "Ey, que bueno verte de nuevo",
          "Hola, ¿cómo vas?",
          "Que onda, ¿cómo estás?"
        ]

        let randomSayIndex = getRandomArbitrary(0, 3)

        Jarvis.say(randomSay[randomSayIndex], {
          onStart() {
            Jarvis.dontObey();
          },
          onEnd() {
            setTimeout(() => {
              Jarvis.obey();
              playVideo('preguntaTrack');
            }, 1200);
          },
        });
      }

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
Jarvis.when("ERROR", function(data) {
  console.error(data);
});

document.querySelectorAll('video').forEach(elem => {
  if (elem.id != 'reposoTrack') {
    elem.addEventListener('play', function() {
      Jarvis.dontObey();
    });

    elem.addEventListener('ended', function() {
      setTimeout(() => {
        Jarvis.obey();
      }, 1000);
    });
  }
});

document.getElementById('btnActiveRecognizer').addEventListener('click', function() {
  startArtyom("es-ES", 'quick', false);
});