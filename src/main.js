import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
//import TitleScene from './scenes/TitleScene';

var config = {
    type: Phaser.AUTO,
    width: 1280,
	height: 720,
    backgroundColor: "#363636",
    parent: 'game',
	scene: [
        BootScene,
        //TitleScene,
        GameScene
    ],
    plugins: {
		scene: [
			{
				plugin: PhaserMatterCollisionPlugin, // The plugin class
				key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
				mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
			}
		]
	},
    physics: {
        default: "matter",
        matter: {
            debug: true
        }
    }
};

const game = new Phaser.Game(config);

$(function() {
    window.addEventListener("resize", resize, false);
    $('canvas').bind('contextmenu', function(e) {
        return false;
    });
});