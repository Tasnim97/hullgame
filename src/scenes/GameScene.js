import Player from '../objects/Player.js';
import Spawn from '../objects/Spawn.js';
import Heavy from '../objects/Heavy.js';
import Barrel from '../objects/Barrel.js';
import Ammo from '../objects/Ammo.js';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    
    create() {
        this.anims.create({
            key: 'Explosion',
            frames: this.anims.generateFrameNumbers('explo', { start: 0, end: 23 }),
            frameRate: 60,
            repeat: 0
        });

        this.anims.create({
            key: 'MuzzleFlash',
            frames: this.anims.generateFrameNumbers('flash', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'FlyChase',
            frames: this.anims.generateFrameNumbers('fly', { start: 0, end: 5 }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'FlyDead',
            frames: this.anims.generateFrameNumbers('flydead', { start: 0, end: 6 }),
            frameRate: 9,
            repeat: 0
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
            frameRate: 2,
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

        this.cameras.main.setBounds(0, 100, 10000, 820);
        this.matter.world.setBounds(0, 0, 10000, 1220);
        this.add.tileSprite(1200, 650, 2560, 1220, 'bg');
        this.add.tileSprite(3600, 650, 2560, 1220, 'bg');
        this.add.tileSprite(5000, 650, 2560, 1220, 'bg');
        this.add.tileSprite(7400, 650, 2560, 1220, 'bg');
        this.add.tileSprite(9800, 650, 2560, 1220, 'bg');
        this.add.tileSprite(0, 1420, 2560, 1220, 'bottom').setScale(15560, 1).setDepth(20);

        this.tiles.push((this.matter.add.sprite(300, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(25,12).body);
        this.tiles.push((this.matter.add.sprite(1500, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(20,12).body);
        this.tiles.push((this.matter.add.sprite(3085, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(45,12).body);
        
        //tiles.push((this.matter.add.sprite(3435, 820, 'tile2', null, { isStatic: true, label: "tile"})).setScale(25,12).body);
        this.tiles.push((this.matter.add.sprite(400, 630, 'tile2', null, { isStatic: true, label: "tile"})).setScale(1,7).body);
        this.tiles.push((this.matter.add.sprite(700, 450, 'tile2', null, { isStatic: true, label: "tile"})).setScale(5,2).body);
        this.tiles.push((this.matter.add.sprite(1500, 380, 'tile2', null, { isStatic: true, label: "tile"})).setScale(21,2).body);
        this.tiles.push((this.matter.add.sprite(2300, 630, 'tile2', null, { isStatic: true, label: "tile"})).setScale(1,7).body);
        this.tiles.push((this.matter.add.sprite(2500, 380, 'tile2', null, { isStatic: true, label: "tile"})).setScale(21,2).body);
        this.tiles.push((this.matter.add.sprite(5085, 920, 'tile2', null, { isStatic: true, label: "tile"})).setScale(45,12).body);
        this.tiles.push((this.matter.add.sprite(6880, 920, 'tile2', null, { isStatic: true, label: "tile"})).setScale(45,12).body);
        this.tiles.push((this.matter.add.sprite(8070, 920, 'tile2', null, { isStatic: true, label: "tile"})).setScale(45,12).body);
        this.tiles.push((this.matter.add.sprite(4900, 730, 'tile2', null, { isStatic: true, label: "tile"})).setScale(4,7).body);
        this.tiles.push((this.matter.add.sprite(5300, 550, 'tile2', null, { isStatic: true, label: "tile"})).setScale(5,2).body);
        this.tiles.push((this.matter.add.sprite(5700, 450, 'tile2', null, { isStatic: true, label: "tile"})).setScale(5,2).body);
        this.tiles.push((this.matter.add.sprite(4800, 350, 'tile2', null, { isStatic: true, label: "tile"})).setScale(21,2).body);
        
        this.tiles.push((this.matter.add.sprite(6600, 780, 'tile2', null, { isStatic: true, label: "tile"})).setScale(20,2).body);
        this.tiles.push((this.matter.add.sprite(6700, 740, 'tile2', null, { isStatic: true, label: "tile"})).setScale(15,2).body);
        this.tiles.push((this.matter.add.sprite(6800, 700, 'tile2', null, { isStatic: true, label: "tile"})).setScale(10,2).body);
        this.tiles.push((this.matter.add.sprite(6900, 660, 'tile2', null, { isStatic: true, label: "tile"})).setScale(5,2).body);
        this.tiles.push((this.matter.add.sprite(6960, 620, 'tile2', null, { isStatic: true, label: "tile"})).setScale(2,2).body);
        this.tiles.push((this.matter.add.sprite(7000, 700, 'tile2', null, { isStatic: true, label: "tile"})).setScale(2,10).body);
        this.tiles.push((this.matter.add.sprite(9800, 270, 'tile2', null, { isStatic: true, label: "tile"})).setScale(20,2).body);
        //control heavy enemy
        this.matter.add.sprite(4400, 230, 'tile2', null, { isStatic: true, isSensor: true, label: "turn"}).setAlpha(0).setScale(1,10);
        this.matter.add.sprite(5200, 230, 'tile2', null, { isStatic: true, isSensor: true, label: "turn"}).setAlpha(0).setScale(1,10);

        this.matter.add.sprite(7100, 700, 'tile2', null, { isStatic: true, isSensor: true, label: "turn"}).setAlpha(0).setScale(1,10);
        this.matter.add.sprite(8900, 700, 'tile2', null, { isStatic: true, isSensor: true, label: "turn"}).setAlpha(0).setScale(1,10);

        this.liftvspeed = -5
        this.matter.add.sprite(9100, 220, 'tile2', null, { isSensor: true, label: "liftvturn"}).setIgnoreGravity(true).setScale(5,2).setAlpha(0);
        this.liftv = this.matter.add.sprite(9100, 820, 'tile2', null, { isStatic: true, label: "liftv"}).setScale(5,2)
        this.matter.add.sprite(9100, 860, 'tile2', null, { isSensor: true, label: "liftvturn"}).setIgnoreGravity(true).setScale(5,2).setAlpha(0);
        
        this.matter.add.sprite(9800, 190, 'door', null, { 
            isSensor: true,
            label: "door",
            vertices: [{x: 30, y: 0}, {x: 30, y: 120}, {x: 70, y:120}, {x:70, y:0}]
        }).setIgnoreGravity(true)

        this.tiles.push(this.liftv.body);
        
        this.crates.add(
            new Barrel ({
                scene: this,
                key: 'barrel',
                x: 3335,
                y: 670,
                frame: null,
                option: {
                    isStatic: false, 
                    label: "barrel",
                    collisionFilter: { mask: 0x0001 | 0x0004, category: 0x0004 }
                }
            })
        );
        
        this.crates.add(
            new Barrel ({
                scene: this,
                key: 'barrel',
                x: 3275,
                y: 670,
                frame: null,
                option: {
                    isStatic: false, 
                    label: "barrel",
                    collisionFilter: { mask: 0x0001 | 0x0004, category: 0x0004 }
                }
            })
        );

        this.crates.add(
            new Barrel ({
                scene: this,
                key: 'barrel',
                x: 3215,
                y: 670,
                frame: null,
                option: {
                    isStatic: false, 
                    label: "barrel",
                    collisionFilter: { mask: 0x0001 | 0x0004, category: 0x0004 }
                }
            })
        );

        this.crates.add(
            new Barrel ({
                scene: this,
                key: 'barrel',
                x: 1567,
                y: 670,
                frame: null,
                option: {
                    isStatic: false, 
                    label: "barrel",
                    collisionFilter: { mask: 0x0001 | 0x0004, category: 0x0004 }
                }
            })
        );
        
        this.crates.add(this.matter.add.sprite(335, 600, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(1335, 600, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(1395, 600, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(1335, 670, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        
        this.crates.add(this.matter.add.sprite(1115, 210, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(1175, 210, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(1175, 270, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))

        this.crates.add(this.matter.add.sprite(3335, 670, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(3395, 670, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(3275, 670, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(3335, 610, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(2835, 270, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(2835, 210, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        this.crates.add(this.matter.add.sprite(2775, 270, 'box', null, { isStatic: false, label: "box", collisionFilter: { mask: 0x0001 }}))
        
        new Spawn ({
            scene: this,
            key: 'spawn',
            x: 3335,
            y: 690,
            frame: null,
            max: 4,
            delay: 25,
            sx: 3200,
            sy: 100,
            type: 1,
            option: {
                isSensor: true, 
                label: "spawn"
            }
        });

        new Spawn ({
            scene: this,
            key: 'spawn',
            x: 1600,
            y: 360,
            frame: null,
            max: 4,
            delay: 50,
            sx: 1400,
            sy: 0,
            type: 3,
            option: {
                isSensor: true, 
                label: "spawn"
            }
        });

        new Spawn ({
            scene: this,
            key: 'spawn',
            x: 6500,
            y: 600,
            frame: null,
            max: 6,
            delay: 25,
            sx: 6900,
            sy: 100,
            type: 1,
            option: {
                isSensor: true, 
                label: "spawn"
            }
        });

        new Spawn ({
            scene: this,
            key: 'spawn',
            x: 7500,
            y: 600,
            frame: null,
            max: 3,
            delay: 50,
            sx: 7800,
            sy: 100,
            type: 1,
            option: {
                isSensor: true, 
                label: "spawn"
            }
        });

        new Spawn ({
            scene: this,
            key: 'spawn',
            x: 7500,
            y: 600,
            frame: null,
            max: 3,
            delay: 50,
            sx: 7200,
            sy: 100,
            type: 1,
            option: {
                isSensor: true, 
                label: "spawn"
            }
        });

        new Spawn ({
            scene: this,
            key: 'spawn',
            x: 7800,
            y: 600,
            frame: null,
            max: 12,
            delay: 50,
            sx: 7800,
            sy: 0,
            type: 3,
            option: {
                isSensor: true, 
                label: "spawn"
            }
        });
        //this.elevator = this.sound.add('eloop_sfx', {loop: true});
        this.res = this.add.sprite(0, 0, 'restart').setDepth(20);
        this.comp = this.add.sprite(0, 0, 'complete').setDepth(21);

        this.matterCollision.events.on("paircollisionstart", event => this.col(event));

        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W, 
            down:Phaser.Input.Keyboard.KeyCodes.S, 
            left:Phaser.Input.Keyboard.KeyCodes.A, 
            right:Phaser.Input.Keyboard.KeyCodes.D,
            shift:Phaser.Input.Keyboard.KeyCodes.SPACE,
            restart:Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        this.player = new Player ({
            scene: this,
            key: 'player',
            x: 100,
            y: 700,
            frame: null,
            option: {
                isStatic: false, 
                label: "player",
                collisionFilter: { category: 0x0002, mask: 0x0001 },
                //vertices: [ { "x":19, "y":0 }, { "x":19, "y":106 }, { "x":57, "y":106 }, { "x":57, "y":0 } ] 
            }
        });
        //this.shake = new Shake(this.cameras.main)
        //this.exp = this.add.sprite(1500, 630, "explo").setScale(2).setOrigin(0.5, 1);

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(1);
        this.hud.setDepth(100);
        this.cross.setDepth(101);

        this.music = this.sound.add('soundtrack', {volume: 0.5});
        this.music.loop = true;
        //this.music.play();

        this.matter.add.sprite(4800, 320, 'launcher', null, { isSensor: true, label: "upgrade"}).setIgnoreGravity(true);
        new Ammo ({
            scene: this,
            key: 'ammo',
            x: 5700,
            y: 370,
            frame: null,
            option: {
                isStatic: false, 
                label: "ammobox"
            }
        })

        this.enemies.add( new Heavy ({
            scene: this,
            key: 'heavy',
            x: 5000,
            y: 0,
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

        this.enemies.add( new Heavy ({
            scene: this,
            key: 'heavy',
            x: 4600,
            y: 0,
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

        this.enemies.add( new Heavy ({
            scene: this,
            key: 'heavy',
            x: 7200,
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

        this.enemies.add( new Heavy ({
            scene: this,
            key: 'heavy',
            x: 8600,
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
            var dest = false
            if (event.bodyB.label == "enemy"){
                if(event.gameObjectB.type != "heavy"){
                    event.gameObjectB.hit(20);
                }
                dest = true;
                
            } else if (event.bodyB.label == "barrel"){
                event.gameObjectB.explode();
            }
            if(event.gameObjectA && dest){
                this.bullets.remove(event.gameObjectA);
                event.gameObjectA.destroy();
            }
            
        } else if(event.bodyB.label == "bullet" && (event.bodyA.label != "tile" && event.bodyA.label != "player")){
            var dest = false
            if (event.bodyA.label == "enemy"){
                if(event.gameObjectA.type != "heavy"){
                    event.gameObjectA.hit(20);
                }
                dest = true;
            } else if (event.bodyA.label == "barrel"){
                event.gameObjectA.explode();
            }
            if(event.gameObjectB && dest){
                this.bullets.remove(event.gameObjectB);
                event.gameObjectB.destroy();
            }
            
        } else if(event.bodyB.label == "player" && event.bodyA.label == "spawn"){
            if(!event.gameObjectA.spawned){
                event.gameObjectA.spawned = true;
                this.spawnpoints.add(event.gameObjectA);
            }
        } else if(event.bodyA.label == "player" && event.bodyB.label == "spawn"){
            if(!event.gameObjectB.active){
                event.gameObjectB.spawned = true;
                this.spawnpoints.add(event.gameObjectB);
            }
        } else if(event.bodyB.label == "player" && event.bodyA.label == "upgrade"){
            event.gameObjectB.unlocked = true;
            event.gameObjectA.destroy();
        } else if(event.bodyA.label == "player" && event.bodyB.label == "upgrade"){
            event.gameObjectA.unlocked = true;
            event.gameObjectB.destroy();
            this.sound.add('upgrade_sfx').play();
        } else if(event.bodyB.label == "player" && event.bodyA.label == "ammobox"){
            event.gameObjectA.pickup();
            event.gameObjectA.destroy();
            this.sound.add('upgrade_sfx').play();
        } else if(event.bodyA.label == "player" && event.bodyB.label == "ammobox"){
            event.gameObjectB.pickup();
            event.gameObjectB.destroy();
        } else if(event.bodyB.label == "player" && event.bodyA.label == "sensorhit"){
            if(event.gameObjectA.active && event.gameObjectB.shift){
                event.gameObjectB.hit(40, event.gameObjectA.x);
            }
        } else if(event.bodyA.label == "player" && event.bodyB.label == "sensorhit"){
            if(event.gameObjectB.active && event.gameObjectA.shift){
                event.gameObjectA.hit(40, event.gameObjectB.x);
            }
        } else if(event.bodyB.label == "nade" && (event.bodyA.label == "tile" || event.bodyA.label == "enemy")){
            if(event.gameObjectB){
                event.gameObjectB.kill();
            }
        } else if(event.bodyA.label == "nade" && (event.bodyB.label == "tile" || event.bodyB.label == "enemy")){
            if(event.gameObjectA){    
                event.gameObjectA.kill();
            }
        } else if(event.bodyB.label == "player" && event.bodyA.label == "boom"){
            if(event.gameObjectA.active && event.gameObjectA.type == 0 && event.gameObjectB.shift){
                event.gameObjectB.hit(200, event.gameObjectA.x);
            }
        } else if(event.bodyA.label == "player" && event.bodyB.label == "boom"){
            if(event.gameObjectB.active && event.gameObjectB.type == 0 && event.gameObjectA.shift){
                event.gameObjectA.hit(200, event.gameObjectB.x);
            }
        } else if(event.bodyB.label == "barrel" && event.bodyA.label == "boom"){
            if(event.gameObjectA.active){
                event.gameObjectB.explode();
            }
        } else if(event.bodyA.label == "barrel" && event.bodyB.label == "boom"){
            if(event.gameObjectB.active){
                event.gameObjectA.explode();
            }
        } else if(event.bodyB.label == "enemy" && event.bodyA.label == "boom"){
            if(event.gameObjectA.active){
                if(event.gameObjectB.type == "fly" || event.gameObjectB.type == "skirm"){
                    event.gameObjectB.gib(event.gameObjectA.x, event.gameObjectA.y);
                    //event.gameObjectA.hit(200);
                } else {
                    if(event.gameObjectA.type != 0){
                        event.gameObjectB.hit(200);
                    }
                }
            }
        } else if(event.bodyA.label == "enemy" && event.bodyB.label == "boom"){
            if(event.gameObjectA.active){
                if(event.gameObjectA.type == "fly" || event.gameObjectA.type == "skirm"){
                    event.gameObjectA.gib(event.gameObjectB.x, event.gameObjectB.y);
                    //event.gameObjectA.hit(200);
                } else {
                    if(event.gameObjectB.type != 0){
                        event.gameObjectA.hit(200);
                    }
                }
            }
        } else if(event.bodyB.label == "turn" && event.bodyA.label == "enemy"){
            if(event.gameObjectA.type == "heavy" && event.gameObjectA.action == 0){
                event.gameObjectA.dir *= -1;
            }
        } else if(event.bodyA.label == "turn" && event.bodyB.label == "enemy"){
            if(event.gameObjectB.type == "heavy" && event.gameObjectB.action == 0){
                event.gameObjectB.dir *= -1;
            }
        } else if(event.bodyB.label == "door" && event.bodyA.label == "player"){
            event.gameObjectA.complete = true
        } else if(event.bodyA.label == "door" && event.bodyB.label == "player"){
            event.gameObjectB.complete = true
        } else if(event.bodyB.label == "tile" && event.bodyA.label == "enemy"){
            if(event.gameObjectA.type == "heavy" && event.gameObjectA.action == 1){
                event.gameObjectA.action = 2;
                event.gameObjectA.attack();
            }
        } else if(event.bodyA.label == "tile" && event.bodyB.label == "enemy"){
            if(event.gameObjectB.type == "heavy" && event.gameObjectB.action == 1){
                event.gameObjectB.action = 2;
                event.gameObjectB.attack();
            }
        } else if(event.bodyA.label == "orb" && (event.bodyB.label != "tile" && event.bodyB.label != "enemy")){
            if (event.bodyB.label == "player" && event.gameObjectB.shift){
                event.gameObjectB.hit(60);
                if(event.gameObjectA){
                    this.bullets.remove(event.gameObjectA);
                    event.gameObjectA.destroy();
                }
            }
            
        } else if(event.bodyB.label == "orb" && (event.bodyA.label != "tile" && event.bodyA.label != "enemy")){
            if (event.bodyA.label == "player" && event.gameObjectA.shift){
                event.gameObjectA.hit(60);
                if(event.gameObjectB){
                    this.bullets.remove(event.gameObjectB);
                    event.gameObjectB.destroy();
                }
            }
            
        } else if((event.bodyB.label == "liftvturn" && event.bodyA.label == "liftv") || (event.bodyA.label == "liftvturn" && event.bodyB.label == "liftv")){
            this.liftvspeed *= -1
        }
    }

    restart(){
        this.scene.restart();
    }

    update(){
        this.liftv.y += this.liftvspeed

        this.hud.x = this.cameras.main.scrollX+100;
        this.hud.y = this.cameras.main.scrollY+100;

        this.cross.x = this.cameras.main.scrollX+this.game.input.activePointer.x;
        this.cross.y = this.cameras.main.scrollY+this.game.input.activePointer.y;

        this.res.x = this.cameras.main.scrollX+640;
        this.res.y = this.cameras.main.scrollY+360;

        this.comp.x = this.cameras.main.scrollX+640;
        this.comp.y = this.cameras.main.scrollY+360;

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
            this.res.setAlpha(0);
            if (Phaser.Physics.Matter.Matter.Query.collides(this.player.sensor.body, this.tiles).length > 0){
                this.player.setFriction(0.9);
                this.player.jump = true;
            } else if (Math.abs(Math.floor(this.player.body.velocity.y)) > 1) {
                this.player.setFriction(0.0);
                this.player.jump = false;
            }
        } else {
            this.res.setAlpha(1);
            if(this.cursors.restart.isDown){
                this.restart();
            }
        }

        if(this.player.complete){
            this.comp.setAlpha(1);
            if(this.cursors.restart.isDown){
                this.restart();
            }
        } else {
            this.comp.setAlpha(0);
        }

        this.player.update(this.cursors);

        //explosion test
        
        var debug
        if(this.player.unlocked){
            debug = [
                'AMMO: ' + this.player.ammo,
                'GR:' + this.player.grenade,
                'ENERGY: ' + this.player.energy
            ];
        }else{
            debug = [
                'AMMO: ' + this.player.ammo,
                'ENERGY: ' + this.player.energy
            ];
        }

        this.hud.setText(debug);
    }
}

export default GameScene;
