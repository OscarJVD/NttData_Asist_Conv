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
document.getElementById('openquestionTrack').ontimeupdate = function () {
  // console.log(getPercentage('openquestionTrack') == 'preend');
  if (getPercentage('openquestionTrack') == 'preend') {
    // pauseRestartLoadVideo(document.getElementById('openquestionTrack'))
    // Contenido
    document.getElementById('buttonsBox').classList.add('d-none');
    document.querySelectorAll('video').forEach(video => video.style.height = '100%');
    document.getElementById('btnActiveRecognizer').dataset.freesay = 'true';
    videoEnd('openquestionTrack')
    freeSayFlag = true
  }
};

document.getElementById('tellmoreTrack').ontimeupdate = function () {
  // console.log(getPercentage('tellmoreTrack'));
  if (getPercentage('tellmoreTrack') == 'preend') {
    // Contenido

    // pauseRestartLoadVideo(document.getElementById('tellmoreTrack'))
    document.getElementById("buttonsPartOne").classList.add('d-none')
    document.getElementById("buttonsPartBox").classList.add('d-none')
    document.getElementById("YesOrNoBox").classList.remove('d-none')
    if (document.getElementById('btnVideoCenter') && !document.getElementById('btnVideoCenter').classList.contains('d-none'))
      document.getElementById('btnVideoCenter').classList.add('d-none')
    videoEnd('tellmoreTrack')
    document.getElementById('talkBtnBox').classList.add('d-none')
  }
};

document.getElementById('saludoTrack').ontimeupdate = function () {
  if (getPercentage('saludoTrack') == 'preend') {
    // pauseRestartLoadVideo(document.getElementById('saludoTrack'))
    videoEnd('saludoTrack')
  }
};

document.getElementById('byeTrack').ontimeupdate = function () {
  console.log(getPercentage('byeTrack'));
  if (getPercentage('byeTrack') == 'preend') {
    // pauseRestartLoadVideo(document.getElementById('byeTrack'))

    playVideo("reposoChicoTrack")
    document.getElementById('microphoneIcon').classList.remove('d-none')
    document.getElementById('timerFreeSay').classList.add('d-none')
    videoEnd('byeTrack')
    isGirlAvatarFlag = false;
    // setTimeout(() => {
    //   alert("¡Pronto!")
    // }, 2000);
  }
};

document.getElementById('galeriasTrack').ontimeupdate = function () {
  // console.log(getPercentage('galeriasTrack'));
  if (getPercentage('galeriasTrack') == 'preend') {
    // Contenido
    console.log('DINOSAURIO');

    // pauseRestartLoadVideo(document.getElementById('galeriasTrack'))

    document.getElementById('btnGallery').classList.remove('blueHover')

    timeouts.push(setTimeout(() => {
      playVideo('tellmoreTrack')
    }, 1500))

    videoEnd('tellmoreTrack')

  }
};

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

  return location.reload();

  let videoElements = getVideos();

  videoElements.forEach(video => {
    if (video.id != 'reposoTrack') {
      // if (!video.paused && video) {
      // video.currentTime = 1000
      // video.pause()
      // if (!Jarvis.isRecognizing())
      // pauseVideo(video)
      // video.currentTime = 0
      // // video.addEventListener("canplay", function onCanPlay() {
      // //   video.removeEventListener("canplay", onCanPlay);
      // //   video.play();
      // // });
      // if (video.readyState !== 4)
      //   video.load()

      // videoEnd(video.id)
      // // video.muted = true
      // video.style.display = 'none'
      // }
    }
  });

  let cont = 0;
  let id = setInterval(function () {
    clearTimeOuts(timeouts)
    cont++;
    if (cont == 10) clearInterval(id);
  }, 100);

  Jarvis.ArtyomWebkitSpeechRecognition.stop()
  document.getElementById('talkBtnBox').style.position = "fixed"
  document.getElementById("buttonsPartOne").classList.remove('d-none')
  document.getElementById("buttonsPartBox").classList.remove('d-none')
  document.getElementById('buttonsBox').classList.remove('d-none');
  document.querySelectorAll('video').forEach(video => video.style.height = '71%');
  document.getElementById("YesOrNoBox").classList.add('d-none')
  document.getElementById('talkBtnBox').classList.remove('d-none')
  document.querySelectorAll('button').forEach(button => button.classList.remove('blueHover'))
  playVideo('reposoTrack')
  Jarvis.obey();
  document.getElementById('timerFreeSay').classList.add('d-none')
  document.getElementById('microphoneIcon').classList.remove('d-none')
})

document.getElementById('btnNo').addEventListener('click', function () {
  // Reinicializar Jarvis sin comandos
  playVideo("openquestionTrack")
})

document.getElementById('btnActiveRecognizer').addEventListener('click', function () {
  document.getElementById('btnTalkLoader').classList.remove('d-none')
  document.getElementById('microphoneIcon').classList.add('d-none')

  let btnTalk = document.getElementById('btnActiveRecognizer')
  startArtyom("es-ES", 'quick', false);

  if (btnTalk.getAttribute('data-freesay') == 'true') {
    Jarvis.ArtyomWebkitSpeechRecognition.stop()
    let dictationSettings = {
      continuous: true, // Don't stop never because i have https connection
      lang: 'es-ES',
      onResult: function (text) {
        // Show the Recognized text in the console
        console.log("Recognized text: ", text);
      },
      onStart: function () {
        console.log("Dictation started by the user");
      },
      onEnd: function () {
        console.log("Dictation stopped by the user");
      }
    };

    let UserDictation = Jarvis.newDictation(dictationSettings);
    UserDictation.start();
    // Jarvis.emptyCommands();
    // toast.info({ message: 'Tienes 10 segundos para contestar la pregunta', type: 'info' });
    // setTimeout(() => {
    // }, 300);
    // btnTalk.disabled = true
    document.getElementById('btnTalkLoader').classList.add('d-none')
    document.getElementById('microphoneIcon').classList.add('d-none')
    document.getElementById('timerFreeSay').classList.remove('d-none')
    timeLeft = 11;

    function countdown() {
      timeLeft--;
      document.getElementById('timerFreeSay').textContent = timeLeft.toString();
      if (timeLeft > 0) timeouts.push(setTimeout(countdown, 1000))
      else if (timeLeft <= 0) {
        btnTalk.removeAttribute('data-freesay')
        delete btnTalk.dataset.freesay;
        freeSayFlag = false
        playVideo("byeTrack")
        UserDictation.stop();
        // startArtyom("es-ES", 'quick', false);
        // let commands = Jarvis.getAvailableCommands();
        // console.log(commands); // Ouputs : []
        // Jarvis.ArtyomWebkitSpeechRecognition.stop()

        document.getElementById('btnActiveRecognizer').disabled = false
      }
    };

    timeouts.push(setTimeout(countdown, 1000))
  }
});