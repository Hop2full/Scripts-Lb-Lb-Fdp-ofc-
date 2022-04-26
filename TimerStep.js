var scriptName = "TimerStep";
var scriptVersion = 1.0;
var scriptAuthor = "Hunter171 & PlumerMan";

function TimerStep() {
    this.getName = function() {
        return "TimerStep";
    };

    this.getDescription = function() {
        return "Uses timer when stepping up";
    };

    this.getCategory = function() {
        return "Movement";
    };
    this.onEnable = function() {
        wasTimer = false;
    };
    this.onUpdate = function() {
        !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava() && mc.thePlayer.onGround == true;
        if (wasTimer == true) {
            wasTimer = false, mc.timer.timerSpeed = 1;
        }
    };
    this.onDisable = function() {
        mc.thePlayer.stepHeight = 0.6;
        mc.timer.timerSpeed = 1;
        wasTimer = false;
    };
    this.onStepConfirm = function(event) {
        if (mc.thePlayer.getEntityBoundingBox().minY - mc.thePlayer.posY > 0.6 && mc.thePlayer.getEntityBoundingBox().minY - mc.thePlayer.posY < 1.1) {
            wasTimer = true, mc.timer.timerSpeed = 0.3;
        }
        if(mc.thePlayer.getEntityBoundingBox().minY - mc.thePlayer.posY > 1 && mc.thePlayer.getEntityBoundingBox().minY - mc.thePlayer.posY < 1.6) {
            
            wasTimer = true, mc.timer.timerSpeed = 0.2;

        } else if(mc.thePlayer.getEntityBoundingBox().minY - mc.thePlayer.posY > 1.5) {
            
            wasTimer = true, mc.timer.timerSpeed = 0.1;

        }
    };
};
var TimerStep = new TimerStep();
var TimerStepCL;

function onEnable() {
    TimerStepCL = moduleManager.registerModule(TimerStep);
};

function onDisable() {
    moduleManager.unregisterModule(TimerStepCL);
};