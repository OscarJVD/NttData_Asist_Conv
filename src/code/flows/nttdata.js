
async function NttData(videos, config, artyom, commandsIn, buttonsYesOrNot, predictionsYes, predictionsNo, menus, menuMain){
    console.log("NTTDATA CONFIG")
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
    const commands = Commands(commandsIn, videos, config, artyom,buttonsYesOrNot, menus, menuMain)
    videos.pauseAll()
    videos.hideAll()
    videos[config.PREDICTIONS].video.play()
    videos[config.PREDICTIONS].video.style ="display:block"
    videos[config.PREDICTIONS].video.removeEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus ))
    videos[config.PREDICTIONS].video.addEventListener("ended", (e)=> handleEndVIdeo(artyom,commands, buttonsYesOrNot, predictionsYes, predictionsNo, menus))
}