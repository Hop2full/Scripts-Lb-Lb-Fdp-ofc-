/// api_version=2
var script = registerScript({
    name: "VulcanoFly",
    version: "0.1",
    authors: ["Isaiah"]
});

var C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var x;var y;var z;
var S08PacketPlayerPosLook = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var detected;
var s08tick;
script.registerModule({
    name: "VulcanoFly",
    description: "Fly with the vulcano's ashes",
    category: "Movement",
    settings: {
    }  
}, function (module) {
    module.on("update", function () {
		ticks++;
		if (ticks % 15== 0){
			clip(9000000,0);
			mc.thePlayer.setPosition(x,y,z);
		}
		if (detected){
			s08tick++;
		}
		if (s08tick == 2){
			var height = 0;
			var dist = 2;
			if (mc.gameSettings.keyBindJump.isKeyDown()){
				height = 4;
				dist = 0;
			}
			
			if (mc.gameSettings.keyBindForward.isKeyDown()){
				dist = 9;
			}
			detected = false;
			s08tick = 0;
			clip(dist,height);
			x = mc.thePlayer.posX;
			y = mc.thePlayer.posY;
			z = mc.thePlayer.posZ;
		}
		mc.thePlayer.motionY = 0;
		
    });
    module.on("enable", function () {
		x = mc.thePlayer.posX;
		y = mc.thePlayer.posY;
		z = mc.thePlayer.posZ;
		clip(9000000,0);
		mc.thePlayer.setPosition(x,y,z);
		ticks = 0;
		s08tick = 0;
    });
    module.on("disable", function () {
		ticks = 0;
		s08tick = 0;
		detected = false;
		mc.timer.timerSpeed = 1;
		speed(0);
    });
	
	module.on("move", function (e) {
		if (!detected){
			e.cancelEvent();
		}
		mc.thePlayer.motionY = 0;
    });
	module.on("packet", function (e) {
		var p = e.getPacket();
		if (p instanceof C03PacketPlayer && ticks % 15 == 0){
			p.onGround = false;
		}
		if (p instanceof S08PacketPlayerPosLook){
			detected = true;
		}
    });
});






















    Math.radians = function(degrees) {
     return degrees * Math.PI / 180;
    };
   
    Math.degrees = function(radians) {
     return radians * 180 / Math.PI;
    };
    function speed(speed){
	var yaw = Math.radians(mc.thePlayer.rotationYaw);

    mc.thePlayer.motionX = -Math.sin(yaw) * speed;
    mc.thePlayer.motionZ = Math.cos(yaw) * speed;
    }
    function clip(dist, y) {
        var yaw = Math.radians(mc.thePlayer.rotationYaw);
        var x = -Math.sin(yaw) * dist;
        var z = Math.cos(yaw) * dist;
        mc.thePlayer.setPosition(mc.thePlayer.posX + x, mc.thePlayer.posY + y, mc.thePlayer.posZ + z);
        mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
    }