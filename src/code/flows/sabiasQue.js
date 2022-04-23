
async function SabiasQue(videos, config, artyom, commandsIn, buttonsYesOrNot, predictionsYes, predictionsNo, menus){
    const handleEndVIdeo = (artyom,commands,  buttonsYesOrNot, predictionsYes, predictionsNo, menusIn) => {
        artyom.emptyCommands();
        artyom.addCommands(commands.yesOrNo);
        artyom.obey();
        buttonsYesOrNot((button)=>{
            if(button) {
                predictionsYes(artyom, commands.main, menusIn)
            }else{
                predictionsNo(artyom, commands.main, menusIn)
            }
        })
    }
    const commands = Commands(commandsIn, videos, config, artyom,buttonsYesOrNot, menus)
    videos.pauseAll()
    videos.hideAll()
    videos[config.SABIAS_QUE].video.play()
    videos[config.SABIAS_QUE].video.style ="display:block"
    videos[config.SABIAS_QUE].video.removeEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
    videos[config.SABIAS_QUE].video.addEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
}