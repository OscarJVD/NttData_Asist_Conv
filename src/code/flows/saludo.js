function initFlow(videos, config, artyom){
    artyom.dontObey();
    videos.pauseAll();
    videos.hideAll()
    videos[config.SALUDO].video.style ="display:block";
    videos[config.SALUDO].video.play();
    console.log(config.SALUDO,videos[config.SALUDO].video.currentSrc)

}