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

function configVideos() {
  let arrVideoElementsIds = getVideos()

  arrVideoElementsIds.forEach(video => {
    let videoElement = document.getElementById(video.id);
    videoElement.style.width = screen.width;
    videoElement.style.height = screen.height;

    if (video.id != 'reposoTrack') {

      document.getElementById(video.id).addEventListener('play', () => {
        document.getElementById('reposoTrack').style.display = 'none';
        mainBtnsDisabled(true)
      });
    }
  });
}

function mainBtnsDisabled(isDisabled) {
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
  if (videoId != 'reposoTrack')
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
  let isPlaying = true;

  // On video playing toggle values
  video.onplaying = function () {
    isPlaying = true;
  };

  // On video pause toggle values
  video.onpause = function () {
    isPlaying = false;
  };

  // Pause video function
  if (!video.paused && isPlaying)
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

  playVideo('saludoTrack');

  document.getElementById("buttonsPartOne").classList.remove('d-none')
  document.getElementById("buttonsPartBox").classList.remove('d-none')
  document.getElementById("YesOrNoBox").classList.add('d-none')

  timeouts.push(
    setTimeout(() => {
      document.getElementById('btnGallery').classList.add('blueHover')

      timeouts.push(
        setTimeout(() => {
          document.getElementById('btnGallery').classList.remove('blueHover')

          timeouts.push(
            setTimeout(() => {
              document.getElementById('btnPlaces').classList.add('blueHover')

              timeouts.push(
                setTimeout(() => {
                  document.getElementById('btnPlaces').classList.remove('blueHover')

                  timeouts.push(
                    setTimeout(() => {
                      document.getElementById('btnHistory').classList.add('blueHover')

                      timeouts.push(
                        setTimeout(() => {
                          document.getElementById('btnHistory').classList.remove('blueHover')

                          timeouts.push(
                            setTimeout(() => {
                              document.getElementById('btnNew').classList.add('blueHover')

                              timeouts.push(
                                setTimeout(() => {
                                  document.getElementById('btnNew').classList.remove('blueHover')
                                }, 1400)
                              )
                            }, 900)
                          )
                        }, 1400)
                      )
                    }, 1100)
                  )
                }, 1400)
              )
            }, 1500)
          )
        }, 1800)
      )
    }, 14650)
  )
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
  let percentageCompleted = 0;
  let totalLength = 0;
  // let videoStarted, videoTwentyFive, videoFifty, videoSeventyFive, videoComplete = false;
  let myPlayer = document.getElementById(videoId)
  totalLength = myPlayer.duration % 60;
  percentageCompleted = (myPlayer.currentTime / totalLength) * 100;
  // console.log(totalLength);
  console.log(videoId + ' percentage', (percentageCompleted + '%'));

  let lastPart = 94
  if (videoId == 'tellmoreTrack' || videoId == 'openquestionTrack') lastPart = 94

  if (percentageCompleted >= lastPart && percentageCompleted < 100) return 'preend';
  else return false;

  // is 0
  // if ((!videoStarted) && (percentageCompleted > 0)) {
  //   console.log('VIDEO_STARTED');
  //   videoStarted = true;

  //   window.dataLayer = window.dataLayer || [];
  //   window.dataLayer.push({
  //     'event': 'playStart'
  //   });
  // }
  // // is 25
  // if ((!videoTwentyFive) && (percentageCompleted > 25)) {
  //   console.log('VIDEO_25');
  //   videoTwentyFive = true;

  //   window.dataLayer = window.dataLayer || [];
  //   window.dataLayer.push({
  //     'event': 'playTwentyFive'
  //   });
  // }
  // // is 50
  // if ((!videoFifty) && (percentageCompleted > 50)) {
  //   console.log('VIDEO_50');
  //   videoFifty = true;

  //   window.dataLayer = window.dataLayer || [];
  //   window.dataLayer.push({
  //     'event': 'playFifty'
  //   });
  // }
  // // is 75
  // if ((!videoSeventyFive) && (percentageCompleted > 75)) {
  //   console.log('VIDEO_75');
  //   videoSeventyFive = true;

  //   window.dataLayer = window.dataLayer || [];
  //   window.dataLayer.push({
  //     'event': 'playSeventyFive'
  //   });
  // }
  // // is 100
  // if ((!videoComplete) && (percentageCompleted > 99)) {
  //   console.log('VIDEO_100');
  //   videoComplete = true;

  //   window.dataLayer = window.dataLayer || [];
  //   window.dataLayer.push({
  //     'event': 'playComplete'
  //   });
  // }
}

function videoEnd(videoId) {
  document.getElementById('talkBtnBox').classList.remove('d-none')
  mainBtnsDisabled(false)
  document.getElementById(videoId).style.display = 'none';
  document.getElementById('reposoTrack').style.display = 'inherit';
  document.getElementById('reposoTrack').play();
}