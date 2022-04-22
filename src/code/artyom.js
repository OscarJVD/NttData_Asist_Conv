function ArtyomInit(constants, commands){
    const artyom =  new Artyom();
    return {
        getInstance(){
            return artyom;
        },
        async createInstance(){
             await artyom.initialize({
                lang:"es-ES",// A lot of languages are supported. Read the docs !
                continuous:true,// recognize 1 command and stop listening !
                listen:true, // Start recognizing
                debug:true, // Show everything in the console
                speed:1 // talk normally
            });
            return artyom
        },
        async loadCommands(videos){
            console.log(commands)
            artyom.addCommands([
                {
                    indexes:["Predicciones","predicciones","prediciones","predictions"],
                    action:async function(e){
                        try{
                            artyom.dontObey();
                            console.log("Obey unactivated")
                            Predictions(videos, constants, artyom);
                        }catch(err){
                            console.log(err)
                        }
                    }
                },
                {
                    indexes: commands.saludo,
                    action:function(...e){
                        try{

                            artyom.dontObey();
                            console.log("Obey unactivated")
                            initFlow(videos, constants, artyom);
                        }catch(err){
                            console.log(err)
                        }
                    }
                }
            ]);
        }
    }
};