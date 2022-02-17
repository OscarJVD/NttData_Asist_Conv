// INSTANCIA DE JARVIS
let Jarvis = new Artyom(), respuestaMode = 'quick', timeouts = [];

configVideos();

const commands = {
  saludos: ['Hola', 'hola', 'Holi', 'Buenos dias', 'Buenas tardes', 'Buenas noches', 'Hello', 'Hi', 'Good Morning', 'Good afternoon', 'Good night'],
  modoReposo: ['reposo'],
  modoFrasesLentas: ['lento', 'cortas', 'lento'], // En pruebas(versión beta)
  modoFrasesNormales: ['normal', 'normales', 'normal'], // En pruebas(versión beta)
  modoFrasesLargas: ['largo', 'largas', 'rapido'],
  silenciar: ['silencio', 'callate'], // En pruebas(versión beta)
  galeriasysecciones: ['galerías y secciones'],
  opinionPuntuacion: ['uno', 'dos', 'tres', 'cuatro', 'cinco'],
  // dimeMas: ['Sí, me gustaría', 'No gracias']
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
      greeting();
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
      Jarvis.shutUp();
      break;
    case 8:
      playVideo('galeriasTrack');
      break;
    case 9:
      playVideo('openquestionTrack');
      break;
  }
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
        case 9:
          ask = "¿Qué esperas de la feria?"
          break;
      }

      await postData('storeAnswers', { ask, answer: recognized })
    }
  })
});