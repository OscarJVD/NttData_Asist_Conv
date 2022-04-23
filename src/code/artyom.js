function ArtyomInit(constants, commandsConfig){
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
        async loadCommands(videos, buttonsYesOrNot, menus){
            console.log("menus", menus)
            const commands = Commands(commandsConfig, videos, constants, artyom, buttonsYesOrNot, menus);
            artyom.addCommands(commands.main);
        }
    }
};