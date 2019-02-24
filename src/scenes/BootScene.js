class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    
    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            //makeAnimations(this);
            progress.destroy();
            this.scene.start('GameScene');
        });
        
        resize();

        this.load.audio('soundtrack', [ 
            'assets/sound/soundtrack.mp3'
        ]);
        this.load.audio('ammo_sfx', [
            'assets/sound/ammo.wav'
        ]);
        this.load.audio('heavy_death_sfx', [ 
            'assets/sound/heavydeath.wav'
        ]);
        this.load.audio('pdeath_sfx', [ 
            'assets/sound/pdeath.wav'
        ]);
        this.load.audio('death_sfx', [ 
            'assets/sound/death.wav'
        ]);
        this.load.audio('spawn_sfx', [
            'assets/sound/spawn.wav'
        ]);
        this.load.audio('fire_sfx', [
            'assets/sound/fire.wav'
        ]);
        this.load.audio('launcher_sfx', [
            'assets/sound/launcher.wav'
        ]);
        this.load.audio('upgrade_sfx', [
            'assets/sound/upgrade.wav'
        ]);
        this.load.audio('move_sfx', [
            'assets/sound/move.wav'
        ]);
        this.load.audio('shift_sfx', [ 
            'assets/sound/shift.wav'
        ]);
        this.load.audio('eloop_sfx', [ 
            'assets/sound/elevator.wav'
        ]);
        this.load.audio('estart_sfx', [ 
            'assets/sound/elevator_start.wav'
        ]);
        this.load.audio('estop_sfx', [
            'assets/sound/elevator_stop.wav'
        ]);
        this.load.audio('shock_sfx', [
            'assets/sound/shockwave.wav'
        ]);
        this.load.image("cross", "assets/cross.png");
        this.load.image("lift", "assets/lift.png");
        this.load.image("rail", "assets/rail.png");
        this.load.image("box", "assets/box.png");
        this.load.image("barrel", "assets/barrel.png");
        this.load.image('bottom', 'assets/bottom.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.image("tile2", "assets/tile2.png");
        this.load.image("muzzleflash", "assets/star.png");
        this.load.image("gun", "assets/gun.png");
        this.load.image('bullet', "assets/bullet.png");
        this.load.image('orb', "assets/orb.png");
        this.load.image("head", "assets/head.png");
        this.load.image("sensor", "assets/sensor.png");
        this.load.image("spawn", "assets/spawn.png");
        this.load.image("gib", "assets/gib.png");
        this.load.image("ammo", "assets/ammo.png");
        this.load.image("grenade", "assets/grenade.png");
        this.load.image("launcher", "assets/launcher.png");
        this.load.image("door", "assets/door.png");
        this.load.image("restart", "assets/restart.png");
        this.load.image("complete", "assets/complete.png");
        //this.load.image("gib", "assets/gib.png");
        this.load.spritesheet("explo", "assets/animations/explo.png", { frameWidth: 118, frameHeight: 122 });
        this.load.spritesheet("fly", "assets/animations/fstrip.png", { frameWidth: 58, frameHeight: 58 });
        this.load.spritesheet("flydead", "assets/animations/fdead.png", { frameWidth: 58, frameHeight: 58 });
        this.load.spritesheet("heavy", "assets/animations/hstrip.png", { frameWidth: 160, frameHeight: 160 });
        this.load.spritesheet("shock", "assets/animations/shock.png", { frameWidth: 48, frameHeight: 56 });
        this.load.spritesheet("player", "assets/animations/strip.png", { frameWidth: 73, frameHeight: 106 });
        this.load.spritesheet("pdead", "assets/animations/pdead.png", { frameWidth: 104, frameHeight: 100 });
        this.load.spritesheet("flash", "assets/animations/flash.png", { frameWidth: 56, frameHeight: 58 });
        this.load.spritesheet("enemy", "assets/animations/estrip.png", { frameWidth: 146, frameHeight: 75 });
        this.load.spritesheet("attack", "assets/animations/eattack.png", { frameWidth: 163, frameHeight: 95 });
        this.load.spritesheet("death", "assets/animations/edeath.png", { frameWidth: 148, frameHeight: 68 });
    }
}

export default BootScene;
