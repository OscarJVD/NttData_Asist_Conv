async function Predictions(videos, config, artyom){
    artyom.addCommands([
        {
        indexes:["sí","vale"],
        action:async function(e){
                try{
                    await artyom.say("Muy bien")
                    artyom.obey()
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:["no","no de moment"],
            action:async function(e){
                try{
                    await artyom.say("No problem")
                    artyom.obey()
                }catch(err){
                    console.log(err)
                }
            }
        }
    ]);
    videos.pauseAll()
    videos.hideAll()
    videos[config.PREDICTIONS].video.play()
    videos[config.PREDICTIONS].video.addEventListener("ended", ()=>{
        console.log("Estais escuchando?", artyom.isObeying())
        setInterval(() => {
            console.log(artyom.isRecognizing(), artyom.isSpeaking())
            console.log(artyom.getAvailableCommands())
            console.log("Estais escuchando 3?", artyom.isObeying())
        }, 1500);
    })
    videos[config.PREDICTIONS].video.style ="display:block"
}