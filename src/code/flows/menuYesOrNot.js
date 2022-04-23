function MenuYesOrNo(buttonYes, buttonNo, menuGeneral, menuCondifirmation) {
    return (actionYesCallback)=>{
        menuGeneral.style.display = "none";
        menuCondifirmation.style.display = "block";
        const resetStateButtons = ()=>{
            menuGeneral.style.display = "block";
            menuCondifirmation.style.display = "none";
        };
        const handleClickYes = (e)=>{
            actionYesCallback(true)
            // resetStateButtons()
        };
        const handleClickNo = (e)=>{
            actionYesCallback(false)
            // resetStateButtons()
        };

        buttonNo.removeEventListener("click", handleClickNo)
        buttonYes.removeEventListener("click", handleClickYes)

        buttonNo.addEventListener("click", handleClickNo);
        buttonYes.addEventListener("click", handleClickYes);
        return resetStateButtons;
    };
}