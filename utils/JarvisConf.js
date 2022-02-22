if (localStorage.getItem('isGirlAvatarFlag') === null) {
  console.log("GIRL AVATAR")
  localStorage.setItem('isGirlAvatarFlag', true)
}

// if (isProduction()) console.log = function () { }

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('isGirlAvatarFlag') == 'true') {
    document.getElementById('reposoChicoTrack').style.display = 'none';
    document.getElementById('reposoTrack').style.display = 'inherit';
  } else {
    document.getElementById('reposoTrack').style.display = 'none';
    document.getElementById('reposoChicoTrack').style.display = 'inherit';
  }
})

configVideos();

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
    case 1:
      if (localStorage.getItem('isGirlAvatarFlag') == 'true')
        playVideo('reposoTrack');
      else
        playVideo('reposoChicoTrack');
      Jarvis.say("Estoy sin hacer nada");
      break;
    case 2:
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
    case 3:
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
    case 4:
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
    case 5:
      Jarvis.shutUp();
      break;
    case 6:
      let randomGallery = getRandomArbitrary(1, 8)
      if (localStorage.getItem('isGirlAvatarFlag') == 'true') {

        if (random == 1) playVideo('galeriasMasunoSecTrack')
        else if (random == 2) playVideo('galeriasNuncaFirstTrack')
        else if (random == 3) playVideo('galeriasNuncaSecTrack')
        else if (random == 4) playVideo('galeriasOpeningFirstTrack')
        else if (random == 5) playVideo('galeriasOpeningSecTrack')
        else if (random == 6) playVideo('galeriasProgramaFirstTrack')
        else if (random == 7) playVideo('galeriasProgramaSecTrack')
        else playVideo('galeriasArtistasTrack')
      } else {

        if (randomGallery == 1) playVideo('galeriasChicoMasunoSecTrack')
        else if (randomGallery == 2) playVideo('galeriasChicoNuncaFirstTrack')
        else if (randomGallery == 3) playVideo('galeriasChicoNuncaSecTrack')
        else if (randomGallery == 4) playVideo('galeriasChicoOpeningFirstTrack')
        else if (randomGallery == 5) playVideo('galeriasChicoOpeningSecTrack')
        else if (randomGallery == 6) playVideo('galeriasChicoProgramaFirstTrack')
        else if (randomGallery == 7) playVideo('galeriasChicoProgramaSecTrack')
        else playVideo('galeriasChicoArtistasTrack')

      }
      break;
    case 7:
      // Reinicializar Jarvis sin comandos
      if (localStorage.getItem('isGirlAvatarFlag') == 'true') {
        playVideo('listYesChicaTrack');
      }
      else {
        playVideo('listYesChicoTrack');
      }

      document.getElementById("buttonsPartOne").classList.remove('d-none')
      document.getElementById("buttonsPartBox").classList.remove('d-none')
      document.getElementById("YesOrNoBox").classList.add('d-none')
      // if (localStorage.getItem('isGirlAvatarFlag') == 'true')
      //   playVideo('openQuestionTrack');
      // else
      //   playVideo('openQuestionChicoTrack');
      break;
    case 8:
      if (localStorage.getItem('isGirlAvatarFlag') == 'true')
        playVideo('scoreTrack');
      else
        playVideo('scoreChicoTrack');
      // document.getElementById('btnYes').click()
      break;
    case 9:
      let randomArch = getRandomArbitrary(1, 8)
      if (localStorage.getItem('isGirlAvatarFlag') == 'true') {

        if (randomArch == 1) playVideo('architectureFundacionFirstTrack')
        else if (randomArch == 2) playVideo('architectureFundacionSecTrack')
        else if (randomArch == 3) playVideo('architectureEspaciosFirstTrack')
        else if (randomArch == 4) playVideo('architectureEspaciosSecTrack')
        else if (randomArch == 5) playVideo('architectureProgramaTrack')
        else if (randomArch == 6) playVideo('architectureSalaTrack')
        else if (randomArch == 7) playVideo('architectureVipTrack')
        else playVideo('architectureArcoTrack')
      } else {

        if (randomArch == 1) playVideo('architectureChicoFundacionFirstTrack')
        else if (randomArch == 2) playVideo('architectureChicoFundacionSecTrack')
        else if (randomArch == 3) playVideo('architectureChicoEspaciosFirstTrack')
        else if (randomArch == 4) playVideo('architectureChicoEspaciosSecTrack')
        else if (randomArch == 5) playVideo('architectureChicoProgramaTrack')
        else if (randomArch == 6) playVideo('architectureChicoSalaTrack')
        else if (randomArch == 7) playVideo('architectureChicoVipTrack')
        else playVideo('architectureChicoArcoTrack')

      }
      break;
    case 10:
      let randomHistory = getRandomArbitrary(1, 3)
      if (localStorage.getItem('isGirlAvatarFlag') == 'true') {
        if (randomHistory == 1) playVideo('historyArcoFirstTrack')
        else if (randomHistory == 2) playVideo('historyArcoSecTrack')
        else playVideo('historyArcoThirdTrack')
      } else {
        if (randomHistory == 1) playVideo('historyChicoArcoFirstTrack')
        else if (randomHistory == 2) playVideo('historyChicoArcoSecTrack')
        else playVideo('historyChicoArcoThirdTrack')
      }
      break;
    case 11:
      let randomNews = getRandomArbitrary(1, 3)
      if (localStorage.getItem('isGirlAvatarFlag') == 'true') {
        if (randomNews == 1) playVideo('newsFirstTrack')
        else if (randomNews == 2) playVideo('newsSecTrack')
        else playVideo('newsThirdTrack')
      } else {
        if (randomNews == 1) playVideo('newsChicoFirstTrack')
        else if (randomNews == 2) playVideo('newsChicoSecTrack')
        else playVideo('newsChicoThirdTrack')
      }
      break;
    case 12:
      // Puntuación
      document.getElementById('scoreBox').classList.add('d-none');
      document.getElementById('buttonsBox').classList.add('d-none');
      if (localStorage.getItem('isGirlAvatarFlag') == 'true') playVideo('openQuestionTrack');
      else playVideo('openQuestionChicoTrack');
      break;
  }
});

Jarvis.redirectRecognizedTextOutput(async (recognized, isFinal) => {
  console.log('TEXTO RECONOCIDO  ', recognized, `isFinal ${isFinal}`);
  if (recognized) {
    let recogBox = document.getElementById('recognizedTxtCaption');
    let recogTxt = document.getElementById('spanRecognizedTxtCaption');

    // OWN CODE
    const arrForbidden = ['ERROR', 'SPEECH_SYNTHESIS_START', 'SPEECH_SYNTHESIS_END', 'TEXT_RECOGNIZED', 'COMMAND_RECOGNITION_START', 'COMMAND_RECOGNITION_END', 'COMMAND_MATCHED', 'NOT_COMMAND_MATCHED', 'text chunk pro']

    if (recogBox && recogTxt && arrForbidden.every(value => !recognized.includes(value))) {
      // let recognizedTxt = recognized.replace('Quick mode :', '').replace('>>', '');
      recogBox = document.getElementById('recognizedTxtCaption');
      recogTxt = document.getElementById('spanRecognizedTxtCaption');
      recogTxt.textContent = capitalizarPrimeraLetra(recognized);
      recogBox.classList.remove('d-none');

      if (isFinal)
        recogTxt.textContent = capitalizarPrimeraLetra(recognized);
    }
    // let recognizedBox = document.getElementById('recognizedTxtCaption');
    // let recognizedTxt = document.getElementById('spanRecognizedTxtCaption');

    //   // LocalStorage and BD Storing
    //   // END LocalStorage and BD Storing

    //   recogTxt.textContent = capitalizarPrimeraLetra(recognizedTxt);
    //   recogBox.classList.remove('d-none');


    // if (isFinal) {
    //   recogTxt.textContent = capitalizarPrimeraLetra(recognizedTxt);
    //   recogBox.classList.remove('d-none');
    // }


    if (!recogBox.classList.contains("d-none")) {
      setTimeout(() => {
        if (recogBox)
          recogBox.classList.add('d-none');
      }, 10000);
    }
  }

  let ask;
  arrAttachedCommands.forEach(async (cmd, cmdIndex) => {
    if ( // Si coincide con algún comando o si lo que se dice tiene alguna coincidencia entre comandos
      (
        recognized.toLowerCase() == cmd.toLowerCase()
        || recognized.toLowerCase().includes(cmd.toLowerCase())
        || cmd.toLowerCase().includes(recognized.toLowerCase())
      )
    ) {

      const defCommand = identifySection(arrSec, cmdIndex)

      switch (defCommand) {
        case 0:
          ask = "Saludo"
          break;
        case 1:
          ask = "Reposo"
          break;
        case 2:
          ask = "Activación frases lentas"
          break;
        case 3:
          ask = "Activación frases normales"
          break;
        case 4:
          ask = "Activación frases rápidas"
          break;
        case 5:
          ask = "silencio"
          break;
        case 6:
          ask = "Galerias y secciones"
          break;
        case 7:
          ask = "Si quisieron saber mas de la feria"
          break;
        case 8:
          ask = "No quisieron saber mas de la feria, puntuaron"
          break;
        case 9:
          ask = "Espacios y arquitectura"
          break;
        case 10:
          ask = "Historia de Arco"
          break;
        case 11:
          ask = "Novedades 2022"
          break;
        case 12:
          ask = "Respuesta libre por 10 segundos"
          break;
      }

      if (isFinal)
        await postData('storeAnswers', { ask, answer: recognized })
    }
  })
});