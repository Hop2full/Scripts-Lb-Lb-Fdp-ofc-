/// api_version=2
var script = registerScript({
    name: "RadiusAntiBot",
    version: "1.0",
    authors: ["BestNub"]
});

var EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");
var notAlwaysInRadius = [];

script.registerModule({
    name: "RadiusAntiBot",
    description: "Removes bots always in radius.",
    category: "Misc",
    settings: {
        radius: Setting.float({
            name: "Radius",
            default: 20.0,
            min: 10.0,
            max: 100.0
        }),
        removeRadius: Setting.float({
            name: "RemoveRadius",
            default: 10.0,
            min: 0.0,
            max: 10.0
        }),
        chatLog: Setting.boolean({
            name: "ChatLog",
            default: false
        }),
    }
}, function (module) {
    module.on("enable", function () {
        notAlwaysInRadius = [];
    });

    module.on("world", function (event) {
        notAlwaysInRadius = [];
    });

    module.on("update", function () {
        var entityList = mc.theWorld.getLoadedEntityList();
        var playerList = [];

        for (var i in entityList)
            if (entityList[i] instanceof EntityPlayer)
                playerList.push(entityList[i]);

        for (var i in playerList) {
            var currentEntity = playerList[i];

            if (notAlwaysInRadius.indexOf(currentEntity.getEntityId()) == -1 && mc.thePlayer.getDistanceToEntity(currentEntity) > module.settings.radius.get()) {
                notAlwaysInRadius.push(currentEntity.getEntityId());
                if (module.settings.chatLog.get())
                    Chat.print("[RadiusAntiBot] " + currentEntity.getName() + " is a Player");
            }

            if (currentEntity != mc.thePlayer && notAlwaysInRadius.indexOf(currentEntity.getEntityId()) == -1 && mc.thePlayer.getDistanceToEntity(currentEntity) < module.settings.removeRadius.get()) {
                mc.theWorld.removeEntity(currentEntity);
                if (module.settings.chatLog.get())
                    Chat.print("[RadiusAntiBot] Removed " + currentEntity.getName());
            }
        }
    });
});