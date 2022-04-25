
const getARandomKeyModule = (videos, keyStorage, idStartsVideos) => {
    const getKeyRandomFromAndObject = (videosRandomIn) => Object.keys(videosRandomIn)[Math.floor(Math.random() * Object.keys(videosRandomIn).length)];;
    const ID = idStartsVideos;
    const videosRandom = Object.fromEntries(Object.entries(videos).filter(([key])=> key.startsWith(ID)));
    let mustRepeat = true, keyRandom = null;
    do{
        keyRandom = getKeyRandomFromAndObject(videosRandom);
        if(window.nttdata[keyStorage].length >= Object.keys(videosRandom).length){
            window.nttdata.randomsPredictions = []
        }
        if(!window.nttdata[keyStorage].includes(keyRandom)){
            window.nttdata[keyStorage].push(keyRandom)
            mustRepeat = false
        }
    }while(mustRepeat);
    return keyRandom
}

const disableAllButtons = (buttons) => {
    Object.values(buttons).forEach(button => {
        button.disabled = true
    })
}

const enableAllButtons = (buttons) => {
    Object.values(buttons).forEach(button => {
        button.removeAttribute("disabled")
    })
}

const customizeNameConfirmationButtons = (allButtons, config)=>{
    allButtons.buttonConfirmationYes.textContent = config.BUTTONS_CONFIRM_NAME.PREDICTION.YES
    allButtons.buttonConfirmationNo.textContent = config.BUTTONS_CONFIRM_NAME.PREDICTION.NO
};
const restoreNameConfirmationButtons = (allButtons, config)=>{
    allButtons.buttonConfirmationYes.textContent = config.BUTTONS_CONFIRM_NAME.DEFAULT.YES
    allButtons.buttonConfirmationNo.textContent = config.BUTTONS_CONFIRM_NAME.DEFAULT.NO
};
const resetMenuButtonsConfirmation = (menusIn) => {
    menusIn.menuGeneral.style.display = "block"
    menusIn.menuConfirmation.style.display = "none"
}

const showQr =(menus, allButtons)=>{
    Object.values(menus).forEach(menu=> menu.style.display = "none");
    allButtons.qrCodeSpace.style.display = "block";
};

const hideQr =(menus, allButtons)=>{
    Object.values(menus).forEach(menu=> menu.style.display = "block");
    allButtons.qrCodeSpace.style.display = "none";
};