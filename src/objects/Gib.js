export default class Gib extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.setDepth(9);
        
        this.scene.crates.add(this);
        var angle = 1;
        var force = 1/(Math.sqrt(Math.pow(this.x - config.tarx, 2) + Math.pow(this.y - config.tary, 2))/4000);
        if (force < 0.01){
            force = 0;
        } else if (force > 20){
            force = 20;
        }

        var targetAngle = Phaser.Math.Angle.Between(this.x, this.y, config.tarx, config.tary);
        this.setVelocityX(-1*(Math.cos(targetAngle) * force))
        this.setVelocityY(-1*(Math.sin(targetAngle) * force))
        if(this.x > config.tarx){
            angle = -1;
        }
        this.setAngularVelocity((force/100) * angle);
        
        this.scene.tweens.add({
            targets: this,
            duration: 3000,
            alpha: 0,
            onComplete: () => {
                this.scene.crates.remove(this);
                this.destroy();
            }
        });
    }
}