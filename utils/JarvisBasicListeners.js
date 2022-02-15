let resetFlag = false;

Jarvis.when("ERROR", function (data) {
  console.error(data);
});

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

// TRACK LISTENERS
document.getElementById('openquestionTrack').addEventListener('ended', () => {
  document.getElementById('buttonsBox').classList.add('d-none');
  document.querySelectorAll('video').forEach(video => video.style.height = '100%');
})

document.getElementById('respuestaTrack').addEventListener('ended', () => {

  if (document.getElementById("videoMsgRespuesta"))
    document.getElementById("videoMsgRespuesta").classList.add("d-none");

  // Jarvis.fatality(); // stop artyom if stills active

  // setTimeout(() => {
  //   startArtyom('es-ES', respuestaMode);
  // }, 250)
});

document.getElementById('galeriasTrack').addEventListener('ended', () => {
  console.log('HOLA ERROR');
  document.getElementById('btnGallery').classList.remove('blueHover')

  console.log('resetFlag', resetFlag);

  if (!resetFlag)
    timeouts.push(setTimeout(() => { playVideo('tellmoreTrack') }, 1500))
  // setTimeout(() => { playVideo('tellmoreTrack') }, 1500)
});

document.getElementById('tellmoreTrack').addEventListener('ended', () => {
  if (!resetFlag) {
    document.getElementById("buttonsPartOne").classList.add('d-none')
    document.getElementById("buttonsPartBox").classList.add('d-none')
    document.getElementById("YesOrNoBox").classList.remove('d-none')
  }

  if (document.getElementById('btnVideoCenter') && !document.getElementById('btnVideoCenter').classList.contains('d-none'))
    document.getElementById('btnVideoCenter').classList.add('d-none')
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
// END TRACK LISTENERS

document.getElementById('btnReset').addEventListener('click', () => {
  resetFlag = true;

  // Reiniciamos - Terminamos todos los videos
  document.querySelectorAll('.videoIA').forEach(elem => {
    // elem.pause();
    elem.currentTime = 1000;
    // elem.load();
  });

  let cont = 0;
  let id = setInterval(function () {
    cont++;
    clearTimeOuts(timeouts)
    if (cont == 10) clearInterval(id);
  }, 500);
  
  playVideo('reposoTrack')
  document.getElementById('talkBtnBox').style.position = "fixed"
  document.getElementById("buttonsPartOne").classList.remove('d-none')
  document.getElementById("buttonsPartBox").classList.remove('d-none')
  document.querySelectorAll('video').forEach(video => video.style.height = '71%');
  document.getElementById('buttonsBox').classList.remove('d-none');
  document.getElementById("YesOrNoBox").classList.add('d-none')
  document.getElementById('talkBtnBox').classList.remove('d-none')
  resetFlag = false;
  // setInterval(() => {
  //   resetFlag = false;
  // }, 600);
})

document.getElementById('btnNo').addEventListener('click', function () {
  playVideo("openquestionTrack")
})

document.getElementById('btnActiveRecognizer').addEventListener('click', function () {
  document.getElementById('btnTalkLoader').classList.remove('d-none')
  document.getElementById('microphoneIcon').classList.add('d-none')
  startArtyom("es-ES", 'quick', false);
});
