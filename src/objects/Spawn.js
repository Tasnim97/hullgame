import Enemy from './Enemy.js';

export default class Spawn extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.setIgnoreGravity(true);
        this.spawned = false;
        this.allow = true;
        this.count;
        this.max = config.max
        this.step = 0
        this.delay = config.delay
        this.spawnx = config.sx
        this.spawny = config.sy
    }

    more(){
        this.allow = true;
    }

    addEnemy() {
        this.scene.enemies.add( new Enemy ({
            scene: this.scene,
            key: 'enemy',
            x: this.spawnx,
            y: this.spawny,
            frame: null,
            option: {
                isStatic: false, 
                label: "enemy",
                collisionFilter: {
                    mask: 0x0001,
                    category: 0x0002
                },
                //vertices: [ { "x":60, "y":0 },  { "x":60, "y":75 }, { "x":146, "y":75 }, { "x":146, "y":0 } ]
            }
        }));
    }

    update() {
        if(this.step < this.max){
            if(this.spawned){
                
                if(this.allow){
                    this.addEnemy();
                    this.step += 1;
                    this.allow = false;
                    this.count = 0;
                    //line below not working why?
                    //this.scene.time.delayedCall(this.delay, this.more(), [], this);
                } else {
                    this.count += 1;
                    if(this.count >= this.delay){
                        this.more();
                        this.count = 0;
                    }
                }
            }
        } else {
            this.scene.spawnpoints.remove(this);
            this.destroy();
        }
    }
}