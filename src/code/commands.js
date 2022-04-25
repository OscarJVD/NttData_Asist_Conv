window.alreadyLoaded = false;
function Commands(commands, videos, constants, artyom, buttonsYesOrNot, menus, mainMenu, allButtons){

    const userSayYes = async (artyom, mainOut, menusIn)=>{
        try{
            artyom.emptyCommands();
            artyom.addCommands(mainOut);
            initFlow(videos, constants, artyom, false)
            resetMenuButtonsConfirmation(menusIn)
        }catch(err){
            console.log(err)
        }
    };
    const userSayNo = async (artyom, mainOut, menusIn, allButtons)=>{
        try{
            console.log(allButtons, "HERE")
            artyom.emptyCommands();
            artyom.addCommands(mainOut);
            Despedida(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons)
            resetMenuButtonsConfirmation(menusIn)
        }catch(err){
            console.log(err)
        }
    };
    if(!window.alreadyLoaded){
        window.alreadyLoaded = true;
        mainMenu({
                handleNttdata: ()=>{
                console.log("nttdata")
                NttData(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            },
            handlePredictions:()=>{
                console.log("predictions")
                Predictions(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            },
            handleSabiasQue:()=>{
                console.log("sabiasQue")
                SabiasQue(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            },
            handleAssistant:()=>{
                console.log("assistant")
                AsistenteAws(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
            }
        });
    }
    const mainOut = [
        {
            indexes:commands.assitenteAws,
            action:async function(e){
                try{
                    AsistenteAws(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.nttData,
            action:async function(e){
                try{
                    NttData(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.prediction,
            action:async function(e){
                try{
                    Predictions(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
                }catch(err){
                    console.log(err)
                }
            }
        },
        {
            indexes:commands.sabiasQue,
            action:async function(e){
                try{
                    SabiasQue(videos, constants, artyom, commands, buttonsYesOrNot, userSayYes, userSayNo, menus, mainMenu, allButtons);
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
                action: ()=> userSayNo(artyom, mainOut, menus, allButtons)
            }
        ]
    }
}