Jarvis.when("ERROR", function (data) {
  console.error(data);
});

Jarvis.when("SPEECH_SYNTHESIS_START", function () {
  // Si artyom habla
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
document.getElementById('openquestionTrack').addEventListener('timeupdate', () => {
  let timeUpdFlag = true;
  if ((validateEndVideo('openquestionTrack')) && timeUpdFlag) {
    timeouts.push(setTimeout(() => {
      document.getElementById('buttonsBox').classList.add('d-none');
      document.querySelectorAll('video').forEach(video => video.style.height = '100%');
    }, 400))
    timeUpdFlag = false;
  }
})

document.getElementById('respuestaTrack').addEventListener('timeupdate', () => {
  let timeUpdFlag = true;
  if ((validateEndVideo('respuestaTrack')) && timeUpdFlag) {
    timeouts.push(setTimeout(() => {
      if (document.getElementById("videoMsgRespuesta"))
        document.getElementById("videoMsgRespuesta").classList.add("d-none");
      // Jarvis.fatality(); // stop artyom if stills active

      // setTimeout(() => {
      //   startArtyom('es-ES', respuestaMode);
      // }, 250)
    }, 400))
    timeUpdFlag = false;
  }
})

document.getElementById('galeriasTrack').addEventListener('timeupdate', () => {
  let timeUpdFlag = true;

  if ((validateEndVideo('galeriasTrack')) && timeUpdFlag) {
    timeouts.push(
      setTimeout(() => {
        document.getElementById('btnGallery').classList.remove('blueHover')
        timeouts.push(
          setTimeout(() => {
            playVideo('tellmoreTrack')
          }, 1500)
        )
      }, 400)
    )
    timeUpdFlag = false;
  }
})

document.getElementById('tellmoreTrack').addEventListener('timeupdate', () => {
  let timeUpdFlag = true;

  if ((validateEndVideo('galeriasTrack')) && timeUpdFlag) {

    timeouts.push(setTimeout(() => {
      document.getElementById("buttonsPartOne").classList.add('d-none')
      document.getElementById("buttonsPartBox").classList.add('d-none')
      document.getElementById("YesOrNoBox").classList.remove('d-none')
      if (document.getElementById('btnVideoCenter') && !document.getElementById('btnVideoCenter').classList.contains('d-none'))
        document.getElementById('btnVideoCenter').classList.add('d-none')
    }, 400))
    timeUpdFlag = false;
  }

})

document.querySelectorAll('video').forEach(video => {
  if (video.id != 'reposoTrack') {
    video.addEventListener('play', function () {
      Jarvis.dontObey();
    });

    video.addEventListener('ended', function () {
      setTimeout(() => {
        Jarvis.obey();
      }, 1000);
    });

    video.addEventListener('pause', function () {
      setTimeout(() => {
        Jarvis.obey();
      }, 1000);
    });

    video.addEventListener('load', function () {
      setTimeout(() => {
        Jarvis.obey();
      }, 1000);
    });
  }
});
// END TRACK LISTENERS


document.querySelectorAll('button').forEach(button => {
  let btnRestart = document.getElementById('btnReset')
  if (button.id != 'btnReset'
    //  && button.id != 'btnActiveRecognizer'
  ) {
    button.addEventListener('click', () => {
      btnRestart.removeAttribute('disabled')
    })
  }
})

document.getElementById('btnReset').addEventListener('click', async () => {

  let videoElements = getVideos();

  videoElements.forEach(video => {
    if (video.id != 'reposoTrack') {
      // console.log(video.duration)
      // console.log(`${video.paused} ${video.id}`)
      if (!video.paused) 
        video.currentTime = 1000
      
      //   // 3 formas para reiniciar los videos
      //   // let videoSrc = video.src
      //   // video.pause();
      //   // video.removeAttribute('src'); // empty source
      //   // video.load();
      //   // video.pause();
      //   // video.setAttribute('src', videoSrc)
      //   // video.load();

      //   video.pause();
      //   video.currentTime = 0;
      // }
      // video.onplaying = function() { console.log(` ${video.id} Video is now loaded and playing`); }

      // video.pause();
      // video.currentTime = 0;
      // video.load()
      // video.reset()
    }
  });

  let cont = 0;
  let id = setInterval(function () {
    clearTimeOuts(timeouts)
    cont++;
    if (cont == 10) clearInterval(id);
  }, 100);

  Jarvis.ArtyomWebkitSpeechRecognition.stop()
  mainBtnsDisabled(false)
  document.getElementById('talkBtnBox').style.position = "fixed"
  document.getElementById("buttonsPartOne").classList.remove('d-none')
  document.getElementById("buttonsPartBox").classList.remove('d-none')
  document.getElementById('buttonsBox').classList.remove('d-none');
  document.querySelectorAll('video').forEach(video => video.style.height = '71%');
  document.getElementById("YesOrNoBox").classList.add('d-none')
  document.getElementById('talkBtnBox').classList.remove('d-none')
  document.querySelectorAll('button').forEach(button => button.classList.remove('blueHover'))

  // setTimeout(() => {
  // }, 800);
  playVideo('reposoTrack')
  Jarvis.obey();
})

document.getElementById('btnNo').addEventListener('click', function () {
  setTimeout(() => {
    playVideo("openquestionTrack")
  }, 800);
})

document.getElementById('btnActiveRecognizer').addEventListener('click', function () {
  // setInterval(() => {
  //   console.log(Jarvis.isObeying());
  // }, 1000);
  document.getElementById('btnTalkLoader').classList.remove('d-none')
  document.getElementById('microphoneIcon').classList.add('d-none')
  startArtyom("es-ES", 'quick', false);
});
