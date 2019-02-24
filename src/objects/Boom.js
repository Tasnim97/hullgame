export default class Boom extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.setDepth(9);
        this.setAlpha(0);
        this.setIgnoreGravity(true);
        this.active = true;
        this.hit = false;
        this.scene.sound.add(config.sound).play();
        this.scene.cameras.main.shake(150, 0.01);
        this.g = this.scene.add.sprite(this.x, this.y+120, config.key).setScale(2).setOrigin(0.5, 1)
        this.g.anims.play(config.anim, true);
        this.g.on('animationupdate', this.check, this);
        this.g.on('animationcomplete', this.finish, this);
        this.type = config.type

        this.scene.crates.children.entries.forEach(
            (crate) => {
                var angle = 1;
                var force = 1/(Math.sqrt(Math.pow(crate.x - this.x, 2) + Math.pow(crate.y - this.y+120, 2))/4000);
                if (force < 1){
                    force = 0;
                }
                var targetAngle = Phaser.Math.Angle.Between(crate.x, crate.y, this.x, this.y+120);
                crate.setVelocityX(-1*(Math.cos(targetAngle) * force))
                crate.setVelocityY(-1*(Math.sin(targetAngle) * force))
                if(this.x > crate.x){
                    angle = -1;
                }
                crate.setAngularVelocity((force/100) * angle);
            }
        );
    }

    finish() {
        this.g.destroy();
        this.destroy();
    }

    check(anim, frame, go){
        
        if(frame.index >= 1 && frame.index < 6){
            this.active = true;
        } else {
            this.active = false;
        }
    }
}