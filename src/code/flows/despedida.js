
function Despedida(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons) {
    showQr(menus, allButtons)
    const handleEndFlowApp = (menus, allButtons)=>{
        hideQr(menus, allButtons)
    };

    const handleEndVIdeo = () => {
        videos.pauseAll()
        videos.hideAll()
        //Inmediatamente un video random
        videos[config.DESPEDIDA].video.play()
        videos[config.DESPEDIDA].video.style ="display:block"
        videos[config.DESPEDIDA].video.removeEventListener("ended", (e)=> handleEndFlowApp(menus, allButtons))
        videos[config.DESPEDIDA].video.addEventListener("ended", (e)=> handleEndFlowApp(menus, allButtons))
    }

    videos.pauseAll()
    videos.hideAll()
    const keyRandom  = getARandomKeyModule(videos, config.STORAGE_DESPEDIDA, config.ID_RANDOM_DESPEDIDA)
    console.log(keyRandom, videos)

    videos[keyRandom].video.play()
    videos[keyRandom].video.style ="display:block"
    videos[keyRandom].video.removeEventListener("ended", (e)=> handleEndVIdeo())
    videos[keyRandom].video.addEventListener("ended", (e)=> handleEndVIdeo())
}