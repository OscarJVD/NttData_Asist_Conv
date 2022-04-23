
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const ID_IDLE = "DFSDFSD"
//CODIGO RARO
const showIdle = (videosIn, config)=>{
    // videosIn.pauseAll();
    // videosIn.hideAll();
    videosIn[config.IDLE].video.style ="display:block";
    videosIn[config.IDLE].video.play();
    console.log("HIDEyES", videosIn[config.IDLE].video)
  };
  const hideIdle = (videosIn, config)=>{
    videosIn[config.IDLE].video.style ="display:none";
    videosIn[config.IDLE].video.pause();
    console.log("HIDE", videosIn[config.IDLE].video)
  };

const loadVideo= (key, url, isIdle = false) => {
    const video = document.createElement('video');
    video.src = url;
    video.autoplay = false;
    video.preload = 'auto';
    video.width = "500";
    video.style ="display:none"
    if(isIdle){
        video.loop = true;
        video.id = ID_IDLE
    }
    return [key, { video }]
};
async function bootstrap(){
    const { constants, commands: commandsConfig, videos: config } = configApp();
    //videos
    const videos = document.querySelector("#videos")
    //buttons
    const predictions = document.querySelector("#predictions")
    const sabiasQue = document.querySelector("#sabias-que")
    const assistant = document.querySelector("#assistant")
    const nttdata = document.querySelector("#nttdata")
    const menuGeneral = document.querySelector("#menu-general")
    const menuConfirmation = document.querySelector("#menu-confirmacion")
    const buttonConfirmationYes = document.querySelector("#confirmacion-si")
    const buttonConfirmationNo = document.querySelector("#confirmacion-no")
    const artyomInit = ArtyomInit(constants,commandsConfig)
    const artyom = await artyomInit.createInstance();
    // process
    let videlosLoaded = Object.entries(config).map(([key,value]) => {
        return loadVideo(key, value, key === constants.IDLE)
    });
    videlosLoaded = Object.fromEntries(videlosLoaded);
    Object.entries(videlosLoaded).forEach(([key,value])=> videos.appendChild(value.video))
    // init
    videlosLoaded.__proto__.pauseAll = function(){
        Object.values(this).forEach(video => video.video.pause());
    }
    videlosLoaded.__proto__.hideAll = function(){
        Object.values(this).forEach(video => video.video.style ="display:none");
    }

    videlosLoaded.__proto__.addEventObey = function(){
        const handleObey = (e) => {
            Idle(videlosLoaded, constants, artyom)
            artyom.obey();
            console.log("Obey activaded: ",e.type)
        };

        Object.values(this).forEach(video => {
            if(video.video.id == ID_IDLE) return;
            video.video.addEventListener("ended", handleObey)
            video.video.addEventListener("pause", handleObey)
        });
    }
    videlosLoaded.__proto__.addEventDontObey = function(){

        Object.values(this).forEach(video => {
            if(video.video.id == ID_IDLE) return;
            video.video.addEventListener("playing",(e)=>{
                console.log("Obey unactivated: ",e.type)
                artyom.dontObey();
            })
        });
    }
    videlosLoaded.addEventDontObey()
    videlosLoaded.addEventObey()
    const menus = { menuGeneral, menuConfirmation };
    //buttons yes - not
    menuConfirmation.style.display = "none"
    const buttonsYesOrNot = MenuYesOrNo(buttonConfirmationYes, buttonConfirmationNo, menuGeneral, menuConfirmation)
    await artyomInit.loadCommands(videlosLoaded, buttonsYesOrNot, menus)

    Idle(videlosLoaded, constants, artyom)
    AudioViewer().then(()=>console.log("well")).catch(console.error)
    setInterval(() => {
        console.log("Id Obeying: ",
            artyom.isObeying(),
            artyom.isRecognizing(),
            artyom.getAvailableCommands().map(({ indexes }) => indexes)
        )
    }, 2000);
}


async function  init() {
    const app = document.querySelector("#app")
    const buttonStart = document.querySelector("#start-app")
    app.style.display = "none";
    let loaded = false;
    buttonStart.addEventListener("click", async ()=>{
        console.log("Click")
        if(!loaded){
            loaded = true
            buttonStart.style.display = "none";
            app.style.display = "block";
            await bootstrap();
        }
    });
}
document.addEventListener("DOMContentLoaded", init)