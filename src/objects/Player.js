import Death from './Death.js';
import Grenade from './Grenade.js';

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.complete = false;
        this.energy = 100;
        this.ammo = 90;
        this.grenade = 3;
        this.unlocked = false;
        this.gl = true;
        this.firerate = 100;
        this.walkgo = true;
        this.jumpgo = true;
        this.jump = false;
        this.shift = true;
        this.shiftup = true;
        this.fire = true;
        this.alive = true;

        this.sensor = this.scene.matter.add.sprite(0, 0, 'sensor', null, { 
            isSensor: true, 
            label: "sensor",
            vertices: [ { "x":0, "y":0 }, { "x":0, "y":1 }, { "x":71, "y":1 }, { "x":71, "y":0 } ] 
        });
        this.head = this.scene.add.sprite(0, 0, 'head');
        this.gun = this.scene.add.sprite(0, 0, 'gun');
        this.flash = this.scene.add.sprite(400, 400, 'flash');
        
        this.head.setOrigin(0.33,0.5);
        this.head.setDepth(11);
        
        this.gun.setOrigin(0.045,0.5);
        this.gun.setDepth(13);
        
        this.flash.setOrigin(0.0,0.5);
        this.flash.setAlpha(0);
        this.flash.anims.play("MuzzleFlash", true);
        this.flash.setDepth(12);
        
        this.setFixedRotation(true);
        this.setFriction(0.0);
        this.setDepth(10);
    }

    hit(damage, dir) {
        if(this.alive){
            this.energy -= damage;
            if(this.energy <= 0){
                this.alive = false;
                if(this.x > dir){
                    this.kill(5);
                } else {
                    this.kill(-5);
                }
            } /*else {
                if(energy < damage){
                    energy = 0;
                } else {
                    this.energy -= damage;
                }
            }*/
        }
    }

    kill(dirs) {
        var invert = false;
        this.sensor.destroy();
        this.head.destroy();
        this.flash.destroy();
        this.gun.destroy();
        if(dirs > 0){
            invert = true;
        }
        var dead = new Death ({
            scene: this.scene,
            key: 'pdead',
            x: this.x,
            y: this.y+3,
            frame: null,
            anim: "PlayerDead",
            option: {
                isStatic: false, 
                label: "pdead",
                collisionFilter: { category: 0x0002, mask: 0x0001 }
            },
            sound: "pdeath_sfx",
            jump: 0,
            dir: dirs,
            ang: 0,
            flip: invert,
            player: true,
        });
        this.scene.cameras.main.stopFollow();
        //this.scene.cameras.main.startFollow(dead, true, 0.08, 0.08);
        this.setVelocityX(0);
        this.setVelocityY(0)
        this.setSensor(true);
        this.setIgnoreGravity(true);
        this.setAlpha(0);
        //this.destroy(); this is buggy
    }

    shiftEvent(){
        this.setFrictionAir(0.01);
        this.shift = true;
        this.setAlpha(1);
        this.head.setAlpha(1);
        this.gun.setAlpha(1);
    }

    fireEvent(){
        this.scene.sound.add('fire_sfx').play();
        this.fire = true;
    }

    glEvent(){
        
        this.gl = true;
    }


    walk(){
        this.walkgo = true;
    }

    update(keys) {
        
        if(this.alive && !this.complete){
            if(this.y > 900){
                this.hit(200, this.x)
                this.alive = false;
            }
            this.gun.y = this.y - 25;
            
            this.head.y = this.y - 38;
            this.head.x = this.x;
            
            this.sensor.y = this.y + 52;
            this.sensor.x = this.x;

            var gunflip = false;
            var bulletY = -8;
            var half = Math.PI/2;
            var rad = Phaser.Math.Angle.Between(this.gun.x, this.gun.y-8, this.scene.game.input.activePointer.x+this.scene.cameras.main.scrollX, this.scene.game.input.activePointer.y+this.scene.cameras.main.scrollY);
            
            this.flash.setRotation(rad);
            this.gun.setRotation(rad);
            this.head.setRotation(rad);

            if(rad > -1*(half) && rad < (half)){
                gunflip = false;
                bulletY = -8;
                this.gun.x = this.x - 13;
            } else {
                gunflip = true;
                bulletY = 8;
                this.gun.x = this.x + 13;
            }

            if(this.jump){
                var run = true;
                if(this.body.velocity.x > 1 && gunflip && this.shift){
                    this.anims.play("PlayerRunR", true);
                } else if(this.body.velocity.x < -1 && gunflip && this.shift){
                    this.anims.play("PlayerRun", true);
                } else if(this.body.velocity.x > 1 && !gunflip && this.shift){
                    this.anims.play("PlayerRun", true);
                } else if (this.body.velocity.x < -1 && !gunflip && this.shift) {
                    this.anims.play("PlayerRunR", true);
                } else {
                    this.anims.play("PlayerStand", true);
                    run = false
                }

                if (keys.left.isDown && !keys.shift.isDown) {
                    this.setVelocityX(-6);
                } else if (keys.right.isDown && !keys.shift.isDown) {
                    this.setVelocityX(6);
                }

                if(this.walkgo && run && this.shift){
                    this.walkgo = false;
                    this.scene.sound.add('move_sfx').play();
                    this.scene.time.delayedCall(300, this.walk, [], this);
                }
            } else {
                this.anims.play("PlayerJump", true);
            }

            if (keys.up.isDown && this.jump){
                if(this.jumpgo){
                    this.scene.sound.add('move_sfx').play();
                    this.jumpgo = false;
                }
                this.setVelocityY(-9);
                this.setFriction(0.0);
                this.jump = false;
            }
            
            if (keys.up.isUp) {
                this.jumpgo = true;
            }

            if (keys.shift.isDown && this.shiftup && this.shift && this.energy >= 50){
                var land = 72;
                var air = 48;
                this.energy -= 50;
                this.scene.sound.add('shift_sfx').play();
                this.shift = false;
                this.shiftup = false;
                if(keys.left.isDown){
                    land *= -1;
                    air *= -1;
                } else if (!keys.right.isDown){
                    if(gunflip){
                        land *= -1;
                        air *= -1;
                    }
                }

                if(this.jump){
                    this.setVelocityX(land);
                } else {
                    this.setVelocityX(air);
                }
                
                this.setVelocityY(0);
                this.setAlpha(0.5);
                this.head.setAlpha(0.5);
                this.gun.setAlpha(0.5);
                this.setFrictionAir(0.2);
                this.scene.time.delayedCall(200, this.shiftEvent, [], this);
            }

            if (keys.shift.isUp){
                this.shiftup = true;
            }

            if (this.shift && this.energy < 100) {
                this.energy += 1;
            }

            if (this.scene.game.input.activePointer.buttons == 1 && this.scene.game.input.activePointer.isDown && this.ammo > 0 ) {
                var gunx = this.gun.x + ((55) * Math.cos(rad) - (bulletY) * Math.sin(rad));
                var guny = this.gun.y + ((55) * Math.sin(rad) + (bulletY) * Math.cos(rad));
                this.flash.y = guny
                this.flash.x = gunx
                this.flash.setAlpha(1);
                if(this.fire){
                    this.fire = false;
                    this.ammo -= 1
                    var bullet = this.scene.matter.add.sprite(0,0, 'bullet', null, { isSensor: true, label: "bullet"})
                    this.scene.bullets.add(bullet);
                    bullet.setDepth(12);
                    bullet.setIgnoreGravity(true);
                    if (bullet) {
                        bullet.x = gunx;
                        bullet.y = guny;
                        bullet.setAngle(this.gun.angle);
                        bullet.thrust(0.002);
                    }
                    this.scene.time.delayedCall(this.firerate, this.fireEvent, [], this);
                }
            } else {
                this.flash.setAlpha(0);
            }

            if (this.scene.game.input.activePointer.buttons == 2 && this.scene.game.input.activePointer.isDown && this.grenade > 0 && this.unlocked) {
                var gunx = this.gun.x + ((55) * Math.cos(rad) - (bulletY) * Math.sin(rad));
                var guny = this.gun.y + ((55) * Math.sin(rad) + (bulletY) * Math.cos(rad));
                
                if(this.gl){
                    this.gl = false;
                    this.grenade -= 1
                    var nade = new Grenade({
                        scene: this.scene,
                        x: gunx,
                        y: guny,
                        key: "grenade",
                        frame: null,
                        option: {
                            isSensor: true, label: "nade"
                        }
                    })
                    nade.setDepth(12);
                    if (nade) {
                        nade.setAngle(this.gun.angle);
                        nade.thrust(0.008);
                    }
                    this.scene.sound.add('launcher_sfx').play();
                    this.scene.time.delayedCall(1000, this.glEvent, [], this);
                }
            }
            
            this.head.flipY = gunflip;
            this.gun.flipY = gunflip;
            this.flipX = gunflip
        } else if(this.complete){
            this.anims.play("PlayerStand", true);
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
    }
}