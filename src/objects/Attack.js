export default class Attack extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        this.done = true;
        this.setScale(1.3);
        this.setDepth(9);
        this.parent = config.parent;
        //this.scene.sound.add('death_sfx').play();
        this.setAlpha(0)
        this.count;
    }

    sense(anim, frame, go) {
        //console.log(frame);
        if(frame.index == 2){
            if(this.flipX){
                this.parent.sensorL.active = true;
                this.parent.attackL = true;
            } else {
                this.parent.sensorR.active = true;
                this.parent.attackR = true;
            }
        } else {
            this.parent.sensorL.active = false;
            this.parent.sensorR.active = false;
            this.parent.attackL = false;
            this.parent.attackR = false;
        }
    }

    finish(anim, frame, go) {
        this.done = true;
        this.parent.action = 0;
        this.parent.setAlpha(1);
        this.setAlpha(0)
    }

    start() {
        this.flipX = this.parent.flipX
        this.done = false;
        this.setAlpha(1)
        this.parent.setAlpha(0);
        this.play("EnemyAttack", false);
        this.on('animationupdate', this.sense);
        this.on('animationcomplete', this.finish);
    }
}