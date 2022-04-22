function Idle(videos, config, artyom){
    videos.pauseAll();
    videos.hideAll()
    videos[config.IDLE].video.style ="display:block";
    videos[config.IDLE].video.play();

}