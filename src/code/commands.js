window.alreadyLoaded = false;
function Commands(commands, videos, constants, artyom, buttonsYesOrNot, menus, mainMenu){
    console.log(menus, "menus2");
    const resetMenubButtonsConfirmation = (menusIn) => {
        console.log(menusIn)
        menusIn.menuGeneral.style.display = "block"
        menusIn.menuConfirmation.style.display = "none"
    }

    const userSayYes = async (artyom, mainOut, menusIn)=>{
        try{
            await artyom.say("Muy bien")
            artyom.emptyCommands();
            artyom.addCommands(mainOut);
            artyom.obey()
            resetMenubButtonsConfirmation(menusIn)
        }catch(err){
            console.log(err)
        }
    };
    const userSayNo = async (artyom, mainOut, menusIn)=>{
        try{
            await artyom.say("Aqui hemos terminado")
            artyom.emptyCommands();
            artyom.addCommands(mainOut);
            artyom.obey()
            resetMenubButtonsConfirmation(menusIn)
        }catch(err){
            console.log(err)
        }
    };
    if(!window.alreadyLoaded){
        window.alreadyLoaded = true;
        mainMenu({
                handleNttdata: ()=>{
                console.log("nttdata")
                NttData(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
            },
            handlePredictions:()=>{
                console.log("predictions")
                Predictions(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
            },
            handleSabiasQue:()=>{
                console.log("sabiasQue")
                SabiasQue(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
            },
            handleAssistant:()=>{
                console.log("assistant")
                AsistenteAws(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
            }
        });
    }
    const mainOut = [
        {
            indexes:commands.assitenteAws,
            action:async function(e){
                try{
                    AsistenteAws(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.nttData,
            action:async function(e){
                try{
                    NttData(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.prediction,
            action:async function(e){
                try{
                    Predictions(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.sabiasQue,
            action:async function(e){
                try{
                    SabiasQue(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes: commands.saludo,
            action:function(e){
                try{
                    initFlow(videos, constants, artyom, commands);
                }catch(err){
                    console.log(err)
                }
            }
        }
    ]
    return {
        main: mainOut,
        yesOrNo:[
            {
                indexes:commands.confirmacion,
                action: ()=> userSayYes(artyom, mainOut, menus),
            },
            {
                indexes:commands.negacion,
                action: ()=> userSayNo(artyom, mainOut, menus)
            }
        ]
    }
}