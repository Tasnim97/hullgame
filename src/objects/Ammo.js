export default class Ammo extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.setDepth(9);
    }

    pickup(){
        this.scene.sound.add('ammo_sfx').play();
        this.scene.player.ammo = 90;
        this.scene.player.grenade = 3;
        this.destroy();
    }
}