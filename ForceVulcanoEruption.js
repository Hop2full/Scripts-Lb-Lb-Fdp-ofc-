/// api_version=2
var script = registerScript({
    name: "ForceVulcanoEruption",
    version: "1",
    authors: ["Isaiah"]
});
var C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C16PacketClientStatus = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
var ticks;
var state;
var worldchange;
var tick;
var detected;
var lastattackticks;
var StringUtils = Java.type('net.minecraft.util.StringUtils');
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');
script.registerModule({
    name: "ForceVulcanoEruption",
    description: "Forces The Vulcano to Erupt",
    category: "Exploit",
    settings: {
		Auto3rdPerson: Setting.boolean({
            name: "Auto3rdPerson",
            default: false
        })
    }  
}, function (module) {
	module.on("packet", function (e) {
		
		var packet = e.getPacket();
		//No Sprint Packet
		if (packet instanceof C0BPacketEntityAction && packet.getAction() == C0BPacketEntityAction.Action.START_SPRINTING){
			e.cancelEvent();
		}
		//KillAura Aim Y Check Disabler
		if (e.getPacket() instanceof C03PacketPlayer && e.getPacket().getRotating() && !moduleManager.getModule("Scaffold").state && moduleManager.getModule("KillAura").state){
			packet.yaw + 2;
		}
		//Scaffold checks Disabler
		if (packet instanceof C08PacketPlayerBlockPlacement && moduleManager.getModule("Scaffold").state && state == 0){
			moduleManager.getModule("KillAura").state = false;
			mc.thePlayer.sendQueue.addToSendQueue(new C0BPacketEntityAction(mc.thePlayer,C0BPacketEntityAction.Action.START_SNEAKING));
			ticks = 2;
			state = 3;
		} else if (state > 0 && packet instanceof C08PacketPlayerBlockPlacement && moduleManager.getModule("Scaffold").state){
			state--;
		}
		//BattleasyaAutoPLay
		if (packet instanceof S02PacketChat){
			var msg = packet.getChatComponent().getUnformattedText();
			if (msg.contains("(!) Congratulations!")||msg.contains("(!) As a spectator, you can left click air or right click a block to access")){
				detected = true;
				mc.thePlayer.sendChatMessage("/sw leave");
			}
		}
	});
	module.on("attack", function () {
		if (moduleManager.getModule("KillAura").state && module.settings.Auto3rdPerson.get()){lastattackticks=10};
	});
	
	
	module.on("update", function () {
		//Auto 3rd Person
		if (moduleManager.getModule("KillAura").state){	if (lastattackticks>0){	mc.gameSettings.thirdPersonView = 1;lastattackticks--;	} else {mc.gameSettings.thirdPersonView = 0;}
		}
		if (detected) {	tick++;	if (tick > 15){	mc.thePlayer.sendChatMessage("/sw autojoin");detected = false;tick = 0;worldchange = false;}}
		if (ticks > 0){ticks--;}
		if (ticks == 0 && !moduleManager.getModule("KillAura").state){	mc.thePlayer.sendQueue.addToSendQueue(new C0BPacketEntityAction(mc.thePlayer,C0BPacketEntityAction.Action.STOP_SNEAKING));}
	});
	
	
	module.on("enable", function () {
		lastattackticks = 0;
		state = 0;
		ticks=0;
		detected = false;
		tick = 0;
		worldchange = false;
	});
	
	
	module.on("world", function () {
		if (detected){
			worldchange = true;
		}
    });
});