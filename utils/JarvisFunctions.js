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

      document.getElementById(video.id).addEventListener('timeupdate', () => {
        let timeUpdFlag = true;
        if ((validateEndVideo(video.id)) && timeUpdFlag) {
          timeouts.push(setTimeout(() => {
            document.getElementById('talkBtnBox').classList.remove('d-none')
            document.getElementById(video.id).style.display = 'none';
            document.getElementById('reposoTrack').style.display = 'inherit';
            document.getElementById('reposoTrack').play();
          }, 400))
          timeUpdFlag = false;
        }
      })

      document.getElementById(video.id).addEventListener('play', () => {
        document.getElementById('reposoTrack').style.display = 'none';
        mainBtnsDisabled(true)
      });
    }

    document.getElementById(video.id).addEventListener('timeupdate', () => {
      let timeUpdFlag = true;
      if ((validateEndVideo(video.id)) && timeUpdFlag) {
        timeouts.push(setTimeout(() => {
          document.getElementById('talkBtnBox').classList.remove('d-none')
          mainBtnsDisabled(false)
        }, 400))
        timeUpdFlag = false;
      }
    })
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
  console.log('vdeioid', videoId);

  // Hide talk button
  if (videoId != 'reposoTrack')
    document.getElementById('talkBtnBox').classList.add('d-none')


  let videoElements = document.querySelectorAll('.videoIA');
  videoElements.forEach(video => {
    if (video.id != videoId)
      document.getElementById(video.id).style.display = 'none';
  })

  document.getElementById(videoId).style.display = 'inherit';
  // document.getElementById(videoId).pause();
  // document.getElementById(videoId).load();
  let video = document.getElementById(videoId);
  // let isPlaying = video.currentTime > 0 && !video.paused && !video.ended
  // && video.readyState > video.HAVE_CURRENT_DATA;

  // if (!isPlaying) {
  // video.load()
  // video.currentTime = 0;
  await video.play();
  // let cont = 0;
  // let id = setInterval(async function () {
  //   cont++;
  //   await video.play();
  //   if (cont == 20) clearInterval(id);
  // }, 100);
  // }
  // return document.getElementById(videoId).play();
  // await document.getElementById(videoId).play();
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

  setTimeout(() => {
    playVideo('saludoTrack');
  }, 800);

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
    ? true
    : false;
}