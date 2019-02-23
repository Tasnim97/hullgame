import Death from './Death.js';
import Attack from './Attack.js';
import Hit from './Hit.js';

export default class Enemy extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.health = 100;
        this.setScale(1.3);
        this.setDepth(9);
        this.setFixedRotation(true);
        this.target = config.scene.player;
        this.scene.sound.add('spawn_sfx').play();
        this.action = 0;
        this.attackL = false;
        this.attackR = false;
        this.type = "skirm";

        this.sensorR = new Hit ({
            scene: this.scene,
            key: 'sensor',
            x: 0,
            y: 0,
            frame: null,
            option: {
                isSensor: true, 
                label: "sensorhit",
                vertices: [ { "x":0, "y":0 }, { "x":0, "y":10 }, { "x":75, "y":25 }, { "x":75, "y":15 } ]
            },
        });

        this.sensorL = new Hit ({
            scene: this.scene,
            key: 'sensor',
            x: 0,
            y: 0,
            frame: null,
            option: {
                isSensor: true, 
                label: "sensorhit",
                vertices: [ { "x":0, "y":15 }, { "x":0, "y":25 }, { "x":75, "y":10 }, { "x":75, "y":0 } ]
            },
        });

        this.attack = new Attack ({
            scene: this.scene,
            parent: this,
            key: 'attack',
            x: this.x,
            y: this.y,
            flip: this.flipX
        });
    }

    finish(){
        this.action = 0;
    }

    hit(damage){
        this.health -= damage;
        if(this.health <= 0){
            this.kill();
        } else {
            this.anims.play("EnemyDamage", true);
            this.on('animationcomplete', this.finish);
            this.action = 2;
            if(this.flipX)
            {
                this.setVelocityX(5);
            } else {
                this.setVelocityX(-5);
            }
        }
    }

    kill() {
        var speed = 5;
        var invert = true;
        this.attack.destroy();
        this.sensorR.destroy();
        this.sensorL.destroy();
        this.scene.enemies.remove(this);
        if(this.target.x > this.x){
            speed = -5
            invert = false;
        }
        new Death ({
            scene: this.scene,
            key: 'death',
            x: this.x,
            y: this.y,
            frame: null,
            anim: "EnemyDeath",
            option: {
                isStatic: false, 
                label: "death",
                collisionFilter: { category: 0x0002, mask: 0x0001 }
            },
            sound: "death_sfx",
            jump: 5,
            dir: speed,
            flip: invert,
            player: false,
        });
        this.destroy();
    }

    update() {
        if(this.health > 0){
            this.attack.x = this.x
            this.attack.y = this.y - 10
            
            this.sensorL.y = this.y - 20
            this.sensorR.y = this.y - 20
            if(this.attackL){
                this.sensorL.x = this.x - 65
            } else {
                this.sensorL.x = this.x
            }

            if(this.attackR){
                this.sensorR.x = this.x + 65
            } else {
                this.sensorR.x = this.x
            }
            if(this.target.alive){
                if(Math.abs(Math.floor(this.body.velocity.y)) > 1 && this.action != 2){
                    this.setVelocityX(0);
                    this.anims.play("EnemyJump", true);
                    if (this.target.x < this.x) {
                        this.flipX = true
                    } else if (this.target.x > this.x) {
                        this.flipX = false
                    }
                } else {
                    if (this.target.x > (this.x+920) && this.action == 0){
                        this.anims.play("EnemyStand", true);
                        this.setVelocityX(0);
                    } else if (this.target.x < (this.x-920) && this.action == 0){
                        this.anims.play("EnemyStand", true);
                        this.setVelocityX(0);
                    } else if (this.target.x > (this.x+120) && this.action == 0){
                        this.setVelocityX(5);
                        this.anims.play("EnemyRun", true);
                        this.flipX = false
                    } else if (this.target.x < (this.x-120) && this.action == 0){
                        this.setVelocityX(-5);
                        this.anims.play("EnemyRun", true);
                        this.flipX = true
                    } else if (this.target.x < (this.x) && this.action != 2) {
                        this.anims.play("EnemyStand", true);
                        this.setVelocityX(0);
                        this.flipX = true;
                        if(this.attack.done){
                            this.attack.start();
                        }
                        this.action = 1;
                    } else if (this.target.x > (this.x) && this.action != 2) {
                        this.anims.play("EnemyStand", true);
                        this.setVelocityX(0);
                        this.flipX = false
                        if(this.attack.done){
                            this.attack.start();
                        }
                        this.action = 1;
                    }
                }
            } else {
                this.setVelocityX(0);
                this.anims.play("EnemyStand", true);
            }
        } else {
            return;
        }
    }
}