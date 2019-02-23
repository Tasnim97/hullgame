/*import Mario from '../sprites/Mario';
import Goomba from '../sprites/Goomba';
import Turtle from '../sprites/Turtle';
import PowerUp from '../sprites/PowerUp';
import SMBTileSprite from '../sprites/SMBTileSprite';
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
import Fire from '../sprites/Fire';*/

import Player from '../objects/Player.js';
import Spawn from '../objects/Spawn.js';
import Heavy from '../objects/Heavy.js';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    
    create() {
        this.anims.create({
            key: 'MuzzleFlash',
            frames: this.anims.generateFrameNumbers('flash', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'Shockwave',
            frames: this.anims.generateFrameNumbers('shock', { start: 0, end: 10 }),
            frameRate: 30,
            repeat: 0
        });

        this.anims.create({
            key: 'HeavyDeath',
            frames: this.anims.generateFrameNumbers('heavy', { start: 19, end: 24 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'HeavyAttack',
            frames: this.anims.generateFrameNumbers('heavy', { start: 11, end: 18 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'HeavyRun',
            frames: this.anims.generateFrameNumbers('heavy', { start: 0, end: 9 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'HeavyStand',
            frames: [ { key: 'heavy', frame: 0 } ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'HeavyJump',
            frames: [ { key: 'heavy', frame: 10 } ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'EnemyDeath',
            frames: this.anims.generateFrameNumbers('death', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'EnemyAttack',
            frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'EnemyRun',
            frames: this.anims.generateFrameNumbers('enemy', { start: 1, end: 8 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'EnemyStand',
            frames: [ { key: 'enemy', frame: 2 } ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'EnemyJump',
            frames: [ { key: 'enemy', frame: 0 } ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'EnemyDamage',
            frames: [ { key: 'enemy', frame: 9 } ],
            frameRate: 15,
            repeat: 4
        });

        this.anims.create({
            key: 'PlayerDead',
            frames: this.anims.generateFrameNumbers('pdead', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: 0
        });


        this.anims.create({
            key: 'PlayerRun',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'PlayerRunR',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }).reverse(),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'PlayerStand',
            frames: [ { key: 'player', frame: 9 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'PlayerJump',
            frames: [ { key: 'player', frame: 10 } ],
            frameRate: 20
        });

        this.hud = this.add.text(0, 0, 'Progress: 0%', { color: '#00ff00' });
        this.cross = this.add.sprite(0, 0, 'cross');
        
        this.tiles = [];
        this.bullets = this.add.group();
        this.enemies = this.add.group();
        this.crates = this.add.group();
        this.spawnpoints = this.add.group();

        this.cameras.main.setBounds(0, 100, 3840, 820);
        this.matter.world.setBounds(0, 0, 3840, 1220);
        this.add.tileSprite(1200, 650, 2560, 1220, 'bg');
        this.add.tileSprite(3600, 650, 2560, 1220, 'bg');
        this.add.tileSprite(0, 1420, 2560, 1220, 'bottom').setScale(2560, 1).setDepth(20);

        this.add.sprite(3585, 55, 'rail');
        this.add.sprite(3585, 165, 'rail');
        this.add.sprite(3585, 275, 'rail');
        this.add.sprite(3585, 385, 'rail');
        this.add.sprite(3585, 495, 'rail');
        this.add.sprite(3585, 605, 'rail');
        this.add.sprite(3585, 715, 'rail');
        this.add.sprite(3585, 825, 'rail');
        this.lift = this.add.sprite(3585, 1025, 'lift').setScale(1.5);

        this.tiles.push((this.matter.add.sprite(300, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(25,12).body);
        this.tiles.push((this.matter.add.sprite(1500, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(20,12).body);
        this.tiles.push((this.matter.add.sprite(3085, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(45,12).body);
        //tiles.push((this.matter.add.sprite(3435, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(25,12).body);
        this.tiles.push((this.matter.add.sprite(400, 630, 'tile2', null, { isStatic: true, label: "tile"})).setScale(1,7).body);
        this.tiles.push((this.matter.add.sprite(700, 450, 'tile2', null, { isStatic: true, label: "tile"})).setScale(5,2).body);
        this.tiles.push((this.matter.add.sprite(1500, 380, 'tile2', null, { isStatic: true, label: "tile"})).setScale(21,2).body);
        this.tiles.push((this.matter.add.sprite(2300, 630, 'tile2', null, { isStatic: true, label: "tile"})).setScale(1,7).body);
        
        //control heavy enemy
        this.matter.add.sprite(1100, 700, 'tile2', null, { isStatic: true, isSensor: true, label: "turn"}).setAlpha(0);
        this.matter.add.sprite(1900, 700, 'tile2', null, { isStatic: true, isSensor: true, label: "turn"}).setAlpha(0);
        this.crates.add(this.matter.add.sprite(3335, 670, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(3395, 670, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(3275, 670, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(3335, 610, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        
        new Spawn ({
            scene: this,
            key: 'spawn',
            x: 3335,
            y: 690,
            frame: null,
            max: 1,
            delay: 50,
            sx: 2935,
            sy: 100,
            option: {
                isSensor: true, 
                label: "spawn"
            }
        });
        //this.elevator = this.sound.add('eloop_sfx', {loop: true});

        this.matterCollision.events.on("paircollisionstart", event => this.col(event));

        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W, 
            down:Phaser.Input.Keyboard.KeyCodes.S, 
            left:Phaser.Input.Keyboard.KeyCodes.A, 
            right:Phaser.Input.Keyboard.KeyCodes.D,
            shift:Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.player = new Player ({
            scene: this,
            key: 'player',
            x: 1500,
            y: 0,
            frame: null,
            option: {
                isStatic: false, 
                label: "player",
                collisionFilter: { category: 0x0002, mask: 0x0001 },
                //vertices: [ { "x":19, "y":0 }, { "x":19, "y":106 }, { "x":57, "y":106 }, { "x":57, "y":0 } ] 
            }
        });
        //this.shake = new Shake(this.cameras.main)

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(1);
        this.hud.setDepth(100);
        this.cross.setDepth(101);

        this.music = this.sound.add('soundtrack', {volume: 0.5});
        this.music.loop = true;
        //this.music.play();

        this.enemies.add( new Heavy ({
            scene: this,
            key: 'heavy',
            x: 1500,
            y: 600,
            frame: null,
            option: {
                isStatic: false, 
                label: "enemy",
                collisionFilter: {
                    mask: 0x0001,
                    category: 0x0002
                },
                vertices: [ { "x":24, "y":34 },  { "x":24, "y":131 }, { "x":129, "y":131 }, { "x":129, "y":34 } ]
            }
        }));
        
        resize();
    }

    col(event){
        if(event.bodyA.label == "bullet" && (event.bodyB.label != "tile" && event.bodyB.label != "player")){
            if (event.bodyB.label == "enemy"){
                event.gameObjectB.hit(20);
            } else if (event.bodyB.label == "box"){
                var targetAngle = Phaser.Math.Angle.Between(event.gameObjectB.x, event.gameObjectB.y, this.player.x, this.player.y);
                event.gameObjectB.setVelocityX(-1*(Math.cos(targetAngle) * 5))
                event.gameObjectB.setVelocityY(-1*(Math.sin(targetAngle) * 5))
            }
            if(event.gameObjectA){
                this.bullets.remove(event.gameObjectA);
                event.gameObjectA.destroy();
            }
        } else if(event.bodyB.label == "bullet" && (event.bodyA.label != "tile" && event.bodyA.label != "player")){
            if (event.bodyA.label == "enemy"){
                event.gameObjectA.hit(20);
            } else if (event.bodyA.label == "box"){
                var targetAngle = Phaser.Math.Angle.Between(event.gameObjectA.x, event.gameObjectA.y, this.player.x, this.player.y);
                event.gameObjectA.setVelocityX(-1*(Math.cos(targetAngle) * 5))
                event.gameObjectA.setVelocityY(-1*(Math.sin(targetAngle) * 5))
            }
            if(event.gameObjectB){
                this.bullets.remove(event.gameObjectB);
                event.gameObjectB.destroy();
            }
        } else if(event.bodyB.label == "player" && event.bodyA.label == "spawn"){
            if(!event.gameObjectA.spawned){
                event.gameObjectA.spawned = true;
                this.spawnpoints.add(event.gameObjectA);
            }
            //this.elevator.play();
        } else if(event.bodyA.label == "player" && event.bodyB.label == "spawn"){
            if(!event.gameObjectB.active){
                event.gameObjectB.spawned = true;
                this.spawnpoints.add(event.gameObjectB);
            }
            //this.elevator.play();
        } else if(event.bodyB.label == "player" && event.bodyA.label == "sensorhit"){
            if(event.gameObjectA.active){
                event.gameObjectB.hit(200);
                //console.log("player hit")
            }
            //this.elevator.play();
        } else if(event.bodyA.label == "player" && event.bodyB.label == "sensorhit"){
            if(event.gameObjectB.active){
                event.gameObjectA.hit(200);
                //console.log("player hit")
            }
            //this.elevator.play();
        } else if(event.bodyB.label == "turn" && event.bodyA.label == "enemy"){
            if(event.gameObjectA.type == "heavy" && event.gameObjectA.action == 0){
                event.gameObjectA.dir *= -1;
            }
        } else if(event.bodyA.label == "turn" && event.bodyB.label == "enemy"){
            if(event.gameObjectB.type == "heavy" && event.gameObjectB.action == 0){
                event.gameObjectB.dir *= -1;
            }
        }  else if(event.bodyB.label == "tile" && event.bodyA.label == "enemy"){
            if(event.gameObjectA.type == "heavy" && event.gameObjectA.action == 1){
                this.cameras.main.shake(150, 0.01);
                event.gameObjectA.action = 2;
                event.gameObjectA.shock.setAlpha(1)
                event.gameObjectA.shock.anims.play("Shockwave");
            }
        } else if(event.bodyA.label == "tile" && event.bodyB.label == "enemy"){
            if(event.gameObjectB.type == "heavy" && event.gameObjectB.action == 1){
                this.cameras.main.shake(150, 0.01);
                event.gameObjectB.action = 2;
                event.gameObjectB.shock.setAlpha(1)
                event.gameObjectB.shock.anims.play("Shockwave");
            }
        }
    }

    elevatorSFX(){
        this.elevator.stop();
        this.sound.add('estop_sfx').play();
    }

    update(){
        this.hud.x = this.cameras.main.scrollX+100;
        this.hud.y = this.cameras.main.scrollY+100;

        this.cross.x = this.cameras.main.scrollX+this.game.input.activePointer.x;
        this.cross.y = this.cameras.main.scrollY+this.game.input.activePointer.y;

        if(this.rise){
            if(this.lift.y > 550){
                this.lift.y -= 2
            }
        }
        
        this.enemies.children.entries.forEach(
            (enemy) => {
                enemy.update();
            }
        );

        this.spawnpoints.children.entries.forEach(
            (point) => {
                point.update();
            }
        );
        if(this.player.alive){
            if (Phaser.Physics.Matter.Matter.Query.collides(this.player.sensor.body, this.tiles).length > 0){
                this.player.setFriction(0.9);
                this.player.jump = true;
            } else if (Math.abs(Math.floor(this.player.body.velocity.y)) > 1) {
                this.player.setFriction(0.0);
                this.player.jump = false;
            }
        }

        this.player.update(this.cursors);

        //explosion test
        if (this.game.input.activePointer.buttons == 2 && this.game.input.activePointer.isDown) {
            this.crates.children.entries.forEach(
                (crate) => {
                    var angle = 1;
                    var force = 1/(Math.sqrt(Math.pow(crate.x - this.cross.x, 2) + Math.pow(crate.y - this.cross.y, 2))/4000);
                    var targetAngle = Phaser.Math.Angle.Between(crate.x, crate.y, this.cross.x, this.cross.y);
                    crate.setVelocityX(-1*(Math.cos(targetAngle) * force))
                    crate.setVelocityY(-1*(Math.sin(targetAngle) * force))
                    if(this.cross.x > crate.x){
                        angle = -1;
                    }
                    crate.setAngularVelocity((force/100) * angle);
                }
            );
        }

        var debug = [
            'AMMO: ' + this.player.ammo,
            'ENERGY: ' + this.player.energy
        ];

        this.hud.setText(debug);
    }
}

export default GameScene;
