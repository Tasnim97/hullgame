export default class Death extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.setDepth(9);
        if(config.ang <= 0){
            this.setFixedRotation(true);
        } else {
            this.setAngularVelocity(config.ang);
        }
        this.setVelocityX(config.dir);
        this.setVelocityY(config.jump);
        this.flipX = config.flip;
        this.scene.sound.add(config.sound).play();
        this.play(config.anim, false);
        if(!config.player){
            this.setScale(1.3);
            this.on('animationcomplete', this.fadeout, this);
        }
    }

    fadeout() {
        this.scene.tweens.add({
            targets: this,
            duration: 1000,
            alpha: 0,
            onComplete: () => {
                this.destroy();
            }
        });
    }
}