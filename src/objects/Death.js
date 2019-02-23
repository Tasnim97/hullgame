export default class Death extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.setScale(1.3);
        this.setDepth(9);
        this.setFixedRotation(true);
        this.setVelocityX(config.dir);
        this.setVelocityY(config.jump);
        this.flipX = config.flip;
        this.scene.sound.add(config.sound).play();
        this.play(config.anim, false);
        if(!config.player){
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