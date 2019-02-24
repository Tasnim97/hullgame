import Death from './Death.js';
import Boom from './Boom.js';

export default class Heavy extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.health = 200;
        this.setScale(1.3);
        this.setDepth(8);
        this.setFixedRotation(true);
        this.target = config.scene.player;
        this.action = 0;
        this.attackL = false;
        this.attackR = false;
        this.type = "heavy";
        this.dir = 8;
        this.dist = Math.abs(this.target.x - this.x);
        this.height = Math.abs(this.target.y - this.y);
        this.jump = true;
    }

    finish(){
        this.action = 0;
    }

    attack(){
        var offset = 40;
        if(this.flipX){
            offset = -40
        }
        new Boom ({
            scene: this.scene,
            key: 'explo',
            x: this.x + offset,
            y: this.y -40,
            frame: null,
            anim: "Explosion",
            option: {
                isSensor: true,
                isStatic: true, 
                label: "boom",
                vertices: [{x:40, y:40}, {x:40, y:244}, {x:196, y:244}, {x:196, y:40}]
            },
            sound: "shock_sfx",
            type: 0
        });
    }

    hit(damage){
        this.health -= damage;
        if(this.health <= 0){
            this.kill();
        }
    }

    kill() {
        var invert = true;
        this.scene.enemies.remove(this);
        if(this.target.x > this.x){
            invert = false;
        }
        new Death ({
            scene: this.scene,
            key: 'heavy',
            x: this.x,
            y: this.y,
            frame: null,
            anim: "HeavyDeath",
            option: {
                isStatic: false, 
                label: "death",
                collisionFilter: { category: 0x0002, mask: 0x0001 },
                vertices: [ { "x":24, "y":34 },  { "x":24, "y":131 }, { "x":129, "y":131 }, { "x":129, "y":34 } ]
            },
            sound: "heavy_death_sfx",
            jump: 0,
            dir: 0,
            ang: 0,
            flip: invert,
            player: false,
        });
        this.destroy();
    }

    update() {
        if(this.health > 0){
            if(this.target.alive){
                this.dist = Math.abs(this.target.x - this.x);
                this.height = Math.abs(this.target.y - this.y);
            }
            
            if(this.action == 0){
                
                if(Math.abs(Math.floor(this.body.velocity.y)) > 1 ){
                    this.anims.play("HeavyJump", true);
                    if((Math.floor(this.body.velocity.x)) > 1) {
                        this.flipX = false
                    } else if((Math.floor(this.body.velocity.x)) < -1){
                        this.flipX = true
                    }
                } else {
                    this.setVelocityX(this.dir);
                    this.anims.play("HeavyRun", true);
                    if((Math.floor(this.body.velocity.x)) > 1) {
                        this.flipX = false
                    } else if((Math.floor(this.body.velocity.x)) < -1){
                        this.flipX = true
                    }
                    if(this.target.alive){
                        if((this.dist > 30 && this.dist < 35) && (this.height >= 0 && this.height < 200)){
                            this.action = 1;
                        }
                    }
                }
            } else if (this.action == 1) {
                if(this.jump){
                    this.anims.play("HeavyJump", true);
                    this.setVelocityY(-10);
                    this.setVelocityX(0);
                    this.jump = false;
                }
            } else if (this.action == 2){
                this.anims.play("HeavyAttack", true);
                this.jump = true;
                this.scene.time.delayedCall(500, this.finish, [], this);
            }
            
        } else {
            return;
        }
    }
}