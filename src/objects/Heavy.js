import Death from './Death.js';
export default class Heavy extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key, config.frame, config.option);
        config.scene.add.existing(this);
        this.health = 150;
        this.setScale(1.3);
        this.setDepth(9);
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
        this.shock = this.scene.add.sprite(1100, 690, "shock").setScale(2).setOrigin(0.5, 1).setAlpha(0);
        this.shock.setDepth(10);

        /*this.sensorR = this.scene.matter.add.sprite(0, 0, 'sensor', null, { 
            isSensor: true, 
            label: "sensorhit",
            vertices: [ { "x":0, "y":0 }, { "x":0, "y":10 }, { "x":75, "y":25 }, { "x":75, "y":15 } ] 
        })
        this.sensorL = this.scene.matter.add.sprite(0, 0, 'sensor', null, { 
            isSensor: true, 
            label: "sensorhit",
            vertices: [ { "x":0, "y":15 }, { "x":0, "y":25 }, { "x":75, "y":10 }, { "x":75, "y":0 } ] 
        })*/
    }

    finish(){
        this.action = 0;
    }

    hit(damage){
        this.health -= damage;
        if(this.health <= 0){
            this.kill();
        }
    }

    kill() {
        var invert = true;
        //this.sensorR.destroy();
        //this.sensorL.destroy();
        this.shock.destroy();
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
            sound: "death_sfx",
            jump: 0,
            dir: 0,
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

            /*this.sensorL.y = this.y - 20
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
            }*/
            
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
            this.shock.y = this.y + 60
            if(this.flipX){
                this.shock.x = this.x -40
            } else {
                this.shock.x = this.x +40
            }
        } else {
            return;
        }
    }
}