var scriptName = "Prevenir baneos"; var scriptAuthor = "By Virus"; var scriptVersion = 1.0; var Virus = moduleManager.getModule("Speed"); var Virus2 = moduleManager.getModule("Fly"); var Virus3 = Java.type('net.minecraft.item.ItemFood'); var Virus11 = moduleManager.getModule("Fly");
function VerusModule() {
    var Virus6 = ["KillAura"]; var Virus7Modules = []; var Virus13 = ["KillAura"]; var Virus14Modules = [];
    this.getName = function() { return "NoEatAura"; }; this.getDescription = function() { return "Prevenir baneos." }; this.getCategory = function() { return "Fun"; };    
    this.onUpdate = function() {
        if((mc.thePlayer.getHeldItem() != null) && ((mc.thePlayer.getHeldItem().getItem() instanceof Virus3))) {
            for (var Virus9 in Virus6) {
                var Virus8Module = moduleManager.getModule(Virus6[Virus9]);

                 if (Virus8Module.getState()) {
                    Virus7Modules.push(Virus6[Virus9]);
                 }

                 Virus8Module.setState(false);
            }
        }else{
            for (var Virus9 in Virus7Modules) {
                var Virus8Module = moduleManager.getModule(Virus7Modules[Virus9]);
                Virus8Module.setState(true);
            }
            Virus7Modules = [];

        }  
  
    }
    this.onDisable = function() { mc.timer.timerSpeed = 1.0; };
 
}

var verusModule = new VerusModule(); var verusModuleClient;

function onEnable() { verusModuleClient = moduleManager.registerModule(verusModule); };
function onDisable() { moduleManager.unregisterModule(verusModuleClient); };  

