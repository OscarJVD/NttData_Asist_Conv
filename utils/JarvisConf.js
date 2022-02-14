// INSTANCIA DE JARVIS
let Jarvis = new Artyom(), respuestaMode = 'quick', reset = false;

document.getElementById('respuestaTrack').addEventListener('ended', () => {

  if (document.getElementById("videoMsgRespuesta"))
    document.getElementById("videoMsgRespuesta").classList.add("d-none");

  // Jarvis.fatality(); // stop artyom if stills active

  // setTimeout(() => {
  //   startArtyom('es-ES', respuestaMode);
  // }, 250)
});

document.getElementById('galeriasTrack').addEventListener('ended', () => {
  document.getElementById('btnGallery').classList.remove('blueHover')
});

configVideos();

if (!Jarvis.recognizingSupported())
  alert("navegador no soportado. Se necesita Google Chrome versión 25 y posteriores")

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
  saludos: ['Hola', 'hola', 'Holi', 'Buenos dias', 'Buenas tardes', 'Buenas noches', 'Hello', 'Hi', 'Good Morning', 'Good afternoon', 'Good night'],
  respuestasPreguntaArteFavorito: ['Mona Lisa', 'Romero y Juelita', 'Joan Miró', 'Odisea'],
  respuestasOpinionRobot: ['Excelente', 'Muy bien', 'Excelente respuesta', 'Que inteligente eres', 'Gracias', 'Buena Respuesta'],
  modoReposo: ['reposo'],
  modoFrasesLentas: ['lento', 'cortas', 'lento'], // En pruebas(versión beta)
  modoFrasesNormales: ['normal', 'normales', 'normal'], // En pruebas(versión beta)
  modoFrasesLargas: ['largo', 'largas', 'rapido'],
  silenciar: ['silencio', 'callate'], // En pruebas(versión beta)
  galeriasysecciones: ['galerias', 'galerías', 'secciones', 'galerías y secciones'], // En pruebas(versión beta)
}

const arrsCommands = Object.values(commands)
const arrAttachedCommands = [].concat(...arrsCommands);
const arrAttachedCommandsLength = arrAttachedCommands.length
const commandsLengths = [], arrSec = []
arrsCommands.forEach(elem => commandsLengths.push(elem.length))

const commandsLengthsLength = commandsLengths.length
let acumulador = [], flag = false

for (let i = 0; i < commandsLengthsLength; i++) {
  if (i == 0) {
    arrSec.push(commandsLengths[i])
    acumulador.push(commandsLengths[i])
  } else {
    arrSec.push(acumulador.reduce((a, b) => a + b, 0) + commandsLengths[i])
    acumulador.push(commandsLengths[i])
  }
}

Jarvis.on(arrAttachedCommands).then(function (i) {

  const defCommand = identifySection(arrSec, i)

  console.log('defCommand', defCommand)
  switch (defCommand) {
    case 0:
      playVideo('saludoTrack');
      setTimeout(() => {
        document.getElementById('btnGallery').classList.add('blueHover')
        setTimeout(() => {
          document.getElementById('btnGallery').classList.remove('blueHover')
          setTimeout(() => {
            document.getElementById('btnPlaces').classList.add('blueHover')
            setTimeout(() => {
              document.getElementById('btnPlaces').classList.remove('blueHover')
              setTimeout(() => {
                document.getElementById('btnHistory').classList.add('blueHover')
                setTimeout(() => {
                  document.getElementById('btnHistory').classList.remove('blueHover')
                  setTimeout(() => {
                    document.getElementById('btnNew').classList.add('blueHover')
                    setTimeout(() => {
                      document.getElementById('btnNew').classList.remove('blueHover')
                    }, 1400)
                  }, 900)
                }, 1400)
              }, 1100)
            }, 1400);
          }, 1500)
        }, 1400);
      }, 14650);
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
    case 8:
      playVideo('galeriasTrack');
      break;
  }
});

Jarvis.when("ERROR", function (data) {
  console.error(data);
});

document.getElementById('btnReset').addEventListener('click', () => {
  reset = true;
  document.querySelectorAll('.videoIA').forEach(elem => {
    // elem.pause();
    elem.currentTime = 1000;
    // elem.load();
  });
  playVideo('reposoTrack')
  document.getElementById('talkBtnBox').style.position = "fixed"
  reset = false;
})

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
  document.getElementById('btnTalkLoader').classList.remove('d-none')
  document.getElementById('microphoneIcon').classList.add('d-none')
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
        case 8:
          ask = "¿Galerías y secciones, espacios y arquitectura, historia de arco o novedades 2022?"
          break;
      }

      await postData('storeAnswers', { ask, answer: recognized })
    }
  })
});