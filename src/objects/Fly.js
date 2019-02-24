import Death from './Death.js';
import Gib from './Gib.js';

export default class Fly extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.health = 70;
        this.setScale(1.3);
        this.setDepth(8);
        this.setFixedRotation(true);
        this.setIgnoreGravity(true);
        this.target = config.scene.player;
        this.action = 0;
        this.type = "fly";
        this.dir = 8;
        this.vdir = 5;
        this.dist = Math.abs(this.target.x - this.x);
        this.height = Math.abs(this.target.y - this.y);
        this.firerate = 5000;
        this.shoot = false;
        this.scene.time.delayedCall(this.firerate, this.attack, [], this);
    }

    finish(){
        this.action = 0;
    }

    attack(){
        this.shoot = true
    }

    hit(damage){
        this.health -= damage;
        if(this.health <= 0){
            this.setFixedRotation(false);
            this.kill(-5);
        }
    }

    gib(x,y){
        this.health -= 200;
        this.scene.enemies.remove(this);
        for(var i = 0; i < 2; ++i){
            var rx = Math.floor(Math.random() * 50)
            var ry = Math.floor(Math.random() * 50)
            
            new Gib ({
                scene: this.scene,
                key: 'gib',
                x: this.x + rx,
                y: this.y + ry,
                frame: null,
                option: {
                    isStatic: false, 
                    label: "gib",
                    collisionFilter: { category: 0x0002, mask: 0x0001 }
                },
                tarx: x,
                tary: y-120
            });
            
        }
        this.destroy();
    }

    kill(hv) {
        if(this.x > this.target.x){
            hv *= -1;
        }
        this.scene.enemies.remove(this);
        new Death ({
            scene: this.scene,
            key: 'flydead',
            x: this.x,
            y: this.y,
            frame: null,
            anim: "FlyDead",
            option: {
                isStatic: false,
                label: "flydead",
                collisionFilter: { category: 0x0002, mask: 0x0001 },
                vertices: [ { "x":25, "y":19 },  { "x":19, "y":24 }, { "x":19, "y":33 }, { "x":25, "y":36 }, { "x":30, "y":36 }, { "x":36, "y":32 }, { "x":36, "y":24 }, { "x":30, "y":19 } ]
            },
            sound: "death_sfx",
            jump: 0,
            dir: hv,
            ang: 0,
            flip: false,
            player: false,
        });
        this.destroy();
    }

    update() {
        var force
        var targx = this.scene.cameras.main.scrollX + 640
        var targy = this.scene.cameras.main.scrollY + 100
        var targetAngle = Phaser.Math.Angle.Between(this.x, this.y, targx, targy);
        if((this.x > this.scene.cameras.main.scrollX + 100 && this.x < this.scene.cameras.main.scrollX + 1180) && (this.y > this.scene.cameras.main.scrollY + 100 && this.y < this.scene.cameras.main.scrollY + 300)){
            this.action = 1;
            
        } else {
            this.action = 0;
            if(this.body.velocity.x > 0){
                this.dir = 8;
            } else {
                this.dir = -8;
            }
        }

        if(this.health > 0){
            this.anims.play("FlyChase", true);
            if(this.target.alive && !this.target.complete){
                force = 1/(Math.sqrt(Math.pow(this.x - targx, 2) + Math.pow(this.y - targy, 2))/4000);
                if(force > 10){
                    force = 10;
                }
                
                if(this.action == 0){
                    this.setVelocityX((Math.cos(targetAngle) * force))
                    this.setVelocityY((Math.sin(targetAngle) * force))
                } else if (this.action == 1) {
                    this.setVelocityX(this.dir);
                    if(this.x < this.scene.cameras.main.scrollX + 150){
                        this.setVelocityX(5);
                        this.dir = 5;
                    } else if (this.x > this.scene.cameras.main.scrollX + 1100){
                        this.setVelocityX(-5);
                        this.dir = -5;
                    } else if (this.y < this.scene.cameras.main.scrollY + 120){ 
                        this.setVelocityY(5);
                    } else if (this.y > this.scene.cameras.main.scrollY + 270){
                        this.setVelocityY(-5);
                    }
                    
                    targetAngle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
                    if(this.shoot){
                        this.shoot = false;
                        var orb = this.scene.matter.add.sprite(this.x, this.y, 'orb', null, 
                        { 
                            isSensor: true, 
                            label: "orb",
                            vertices: [{x:13, y:12}, {x:12, y:13}, {x:13, y:14}, {x:14, y:13}]
                        })
                        orb.setDepth(12);
                        orb.setIgnoreGravity(true);
                        orb.setRotation(targetAngle);
                        orb.setFrictionAir(0);
                        orb.thrust(0.00005);
                        this.scene.time.delayedCall(this.firerate, this.attack, [], this);
                    }
                }
            } else {
                this.setVelocityX(0)
                this.setVelocityY(0)
            }
            
        } else {
            return;
        }
    }
}