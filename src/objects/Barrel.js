import Boom from './Boom.js';

export default class Barrel extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.setDepth(2);
    }

    explode(){
        new Boom ({
            scene: this.scene,
            key: 'explo',
            x: this.x,
            y: this.y - 70,
            frame: null,
            anim: "Explosion",
            option: {
                isSensor: true,
                isStatic: true, 
                label: "boom",
                vertices: [{x:40, y:40}, {x:40, y:244}, {x:196, y:244}, {x:196, y:40}]
            },
            sound: "shock_sfx",
            type: 1
        });
        this.scene.crates.remove(this);
        this.destroy();
    }
}