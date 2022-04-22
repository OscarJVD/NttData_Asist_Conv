
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const loadVideo= (key, url) => {
    const video = document.createElement('video');
    video.src = url;
    video.autoplay = false;
    video.preload = 'auto';
    video.width = "500";
    video.style ="display:none"
    return [key, { video }]
};
async function bootstrap(){
    const { constants, commands, videos: config } = configApp();
    //videos
    const videos = document.querySelector("#videos")
    //buttons
    const predictions = document.querySelector("#predictions")
    const sabiasQue = document.querySelector("#sabias-que")
    const assistant = document.querySelector("#assistant")
    const nttdata = document.querySelector("#nttdata")
    const artyomInit = ArtyomInit(constants,commands)
    const artyom = await artyomInit.createInstance();
    // process
    let videlosLoaded = Object.entries(config).map(([key,value]) => loadVideo(key, value));
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
            artyom.obey();
            console.log("Obey activaded: ",e.type)
        };

        Object.values(this).forEach(video => {
            console.log(video.video.id)
            video.video.addEventListener("ended", handleObey)
            video.video.addEventListener("pause", handleObey)
        });
    }
    videlosLoaded.__proto__.addEventDontObey = function(){

        Object.values(this).forEach(video => {

            video.video.addEventListener("playing",(e)=>{
                console.log("Obey unactivated: ",e.type)
                artyom.dontObey();
            })
        });
    }
    videlosLoaded.addEventDontObey()
    videlosLoaded.addEventObey()
    await artyomInit.loadCommands(videlosLoaded)
    initFlow(videlosLoaded, constants , artyom);
    AudioViewer().then(()=>console.log("well")).catch(console.error)
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