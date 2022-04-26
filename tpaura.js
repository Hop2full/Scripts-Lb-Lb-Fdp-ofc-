var scriptName = "TP Aura addon for KillAura";
var scriptVersion = 0.1;
var scriptAuthor = "Soulplexis";


var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
var KillAura = moduleManager.getModule("KillAura");
var KillAuraRange = KillAura.getValue("Range"); 
function randomIntFrom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
} 
function Module() {
	var Vertical = value.createBoolean("Vertical", false);
    this.getName = function () {
        return "TPAura";
    };

    this.getDescription = function () {
        return "When KillAura is enabled, you will teleport around the enemy being attacked.";
    };

    this.getCategory = function () {
        return "Combat";
    };
	var target;
	this.onAttack = function(event){
		if(KillAura.getState() == true) {
		target = event.getTargetEntity();
		if(Vertical.get() == false) {
		mc.thePlayer.setPosition(target.posX + randomIntFrom(-KillAuraRange.get(),KillAuraRange.get()) / 2, target.posY, target.posZ + randomIntFrom(-KillAuraRange.get(),KillAuraRange.get()) / 2) 
		} else {
			mc.thePlayer.setPosition(target.posX + randomIntFrom(-KillAuraRange.get(),KillAuraRange.get()) / 2, target.posY + (randomIntFrom(-KillAuraRange.get(),KillAuraRange.get())) / 2, target.posZ + randomIntFrom(-KillAuraRange.get(),KillAuraRange.get()) / 2) 
			}
		}
	}
	this.addValues = function(value) {
		value.add(Vertical);
	}
}
var Module = new Module();
var ModuleClient;

function onEnable() {
    ModuleClient = moduleManager.registerModule(Module);
};

function onDisable() {
    moduleManager.unregisterModule(ModuleClient);
};