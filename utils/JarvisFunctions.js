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

function isProduction() {
  if(window.location.origin == 'https://my.local.host:50000'){
    return false;
  }else{
    setInterval(() => {
      console.clear();
    }, 5000);
    return true;
  }
}

function startArtyom(language, mode, recognizeType = true) {
  if (!language)
    language = Jarvis.getLanguage();

  let _startArtyom = function () {
    Jarvis.initialize({
      lang: language, // Start artyom with provided language
      continuous: recognizeType ? true : false, // Continuous mode enabled
      listen: true, // Start recognizing
      debug: isProduction() ? false : true, // Show everything in the console
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

function configVideos() {
  let arrVideoElementsIds = getVideos()

  arrVideoElementsIds.forEach(video => {
    let videoElement = document.getElementById(video.id);
    videoElement.style.width = screen.width;
    videoElement.style.height = screen.height;

    if (video.id != 'reposoTrack' && video.id != 'reposoChicoTrack') {

      document.getElementById(video.id).addEventListener('timeupdate', () => {
        document.getElementById('reposoTrack').style.display = 'none';
        document.getElementById('reposoChicoTrack').style.display = 'none';
        mainBtnsDisabled(true)
      });
    }
  });
}

function mainBtnsDisabled(isDisabled) {
  // console.log('aaaaaaa')
  document.querySelectorAll('button').forEach(button => {
    if (button.id != 'btnReset')
      button.disabled = isDisabled
  })
}

function getVideos() {
  return document.querySelectorAll('.videoIA')
}

async function playVideo(videoId) {
  console.log('videoId', videoId);

  // Hide talk button
  if (videoId != 'reposoTrack' && videoId != 'reposoChicoTrack')
    document.getElementById('talkBtnBox').classList.add('d-none')

  let videoElements = document.querySelectorAll('.videoIA');
  videoElements.forEach(video => {
    if (video.id != videoId)
      document.getElementById(video.id).style.display = 'none';
  })

  let video = document.getElementById(videoId);
  video.style.display = 'inherit';
  await video.play();
}

function pauseVideo(video) {
  // Initializing values
  let isPlayingVid = true;

  // On video playing toggle values
  video.onplaying = function () {
    isPlayingVid = true;
  };

  // On video pause toggle values
  video.onpause = function () {
    isPlayingVid = false;
  };

  // Pause video function
  if (!video.paused && !isPlayingVid)
    video.pause();
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

function greeting() {

  if (localStorage.getItem('isGirlAvatarFlag') == 'true')
    playVideo('saludoTrack');
  else
    playVideo('saludoChicoTrack');

  document.getElementById("buttonsPartOne").classList.remove('d-none')
  document.getElementById("buttonsPartBox").classList.remove('d-none')
  document.getElementById("YesOrNoBox").classList.add('d-none')
}

function clearTimeOuts(arrTimeouts) {
  for (var i = 0; i < arrTimeouts.length; i++)
    clearTimeout(arrTimeouts[i])
}

function validateEndVideo(videoId) {

  return document.getElementById(videoId).currentTime.toString().split('.')[0] == document.getElementById(videoId).duration.toString().split('.')[0]
    // return document.getElementById(videoId).currentTime.toString().split('.')[0] == document.getElementById(videoId).duration.toString().split('.')[0]
    ? true
    : false;
}

function timer(elementId, timeLeft = 11) {
  timeLeft = timeLeft;

  function countdown() {
    timeLeft--;
    document.getElementById(elementId).textContent = timeLeft.toString();
    if (timeLeft > 0) setTimeout(countdown, 1000);
    // else if (timeLeft <= 0) alert("finalizó")
  };

  setTimeout(countdown, 1000);
}

function getPercentage(videoId) {
  let myPlayer = document.getElementById(videoId);

  if (myPlayer.currentTime >= myPlayer.duration - getPercentOfNumber(myPlayer.duration, 2) && myPlayer.currentTime < 100)
    return 'preend';
  else return false;
}

function getPercentOfNumber(number, percent) {
  return (percent * number) / 100
}

function videoEnd(videoId) {
  document.getElementById('talkBtnBox').classList.remove('d-none')
  mainBtnsDisabled(false)
  document.getElementById(videoId).style.display = 'none';

  if (localStorage.getItem('isGirlAvatarFlag') == 'true') {
    document.getElementById('reposoTrack').style.display = 'inherit';
    document.getElementById('reposoTrack').play();
  } else {
    document.getElementById('reposoChicoTrack').style.display = 'inherit';
    document.getElementById('reposoChicoTrack').play();
  }
}

function pauseRestartLoadVideo(video) {
  if (!video.paused) {
    // if (!Jarvis.isRecognizing())
    // pauseVideo(video)
    video.pause()
    video.currentTime = 0
    if (video.readyState !== 4)
      video.load()
  }
}

function toggleFullScreen(elem) {
  if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
}