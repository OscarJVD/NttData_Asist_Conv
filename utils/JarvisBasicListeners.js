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
    // Contenido
    document.getElementById('buttonsBox').classList.add('d-none');
    document.querySelectorAll('video').forEach(video => video.style.height = '100%');
    document.getElementById('btnActiveRecognizer').dataset.freesay = 'true';
    videoEnd()
  }
};

document.getElementById('tellmoreTrack').ontimeupdate = function () {
  // console.log(getPercentage('tellmoreTrack'));
  if (getPercentage('tellmoreTrack') == 'preend') {

    console.log('HOLAAAAA');
    // Contenido
    document.getElementById("buttonsPartOne").classList.add('d-none')
    document.getElementById("buttonsPartBox").classList.add('d-none')
    document.getElementById("YesOrNoBox").classList.remove('d-none')
    if (document.getElementById('btnVideoCenter') && !document.getElementById('btnVideoCenter').classList.contains('d-none'))
      document.getElementById('btnVideoCenter').classList.add('d-none')
    videoEnd()
  }
};

document.getElementById('saludoTrack').ontimeupdate = function () {
  console.log(getPercentage('saludoTrack'));
  if (getPercentage('saludoTrack') == 'preend') 
    videoEnd()
  
};

document.getElementById('galeriasTrack').ontimeupdate = function () {
  // console.log(getPercentage('galeriasTrack'));
  if (getPercentage('galeriasTrack') == 'preend') {
    // Contenido
    document.getElementById('btnGallery').classList.remove('blueHover')

    timeouts.push(setTimeout(() => {
      playVideo('tellmoreTrack')
    }, 1500))
    videoEnd()
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

  videoEnd()
  let videoElements = getVideos();

  videoElements.forEach(video => {
    if (video.id != 'reposoTrack') {
      if (!video.paused)
        video.currentTime = 1000
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
})

document.getElementById('btnNo').addEventListener('click', function () {
  setTimeout(() => {
    playVideo("openquestionTrack")
  }, 800);
})

document.getElementById('btnActiveRecognizer').addEventListener('click', function () {
  document.getElementById('btnTalkLoader').classList.remove('d-none')
  document.getElementById('microphoneIcon').classList.add('d-none')

  if (document.getElementById('btnActiveRecognizer').getAttribute('data-freesay') == 'true') {
    document.getElementById('btnTalkLoader').classList.add('d-none')
    document.getElementById('microphoneIcon').classList.add('d-none')
    document.getElementById('timerFreeSay').classList.remove('d-none')
    timeLeft = timeLeft;

    function countdown() {
      timeLeft--;
      document.getElementById('timerFreeSay').textContent = timeLeft.toString();
      if (timeLeft > 0) setTimeout(countdown, 1000);
      else if (timeLeft <= 0) alert("finalizó")
    };

    setTimeout(countdown, 1000);
  }

  startArtyom("es-ES", 'quick', false);
});