class mainScene {
    preload() {

    }

    create() {

    }

    update() {

    }
}

new Phaser.Game({
    width: 700,                    // Width in pixels
    height: 400,                   // Height in pixels
    backgroundColor: '#32CD32',    // the background color (blue)
    scene: mainScene,              // The main scene
    physics : {default: 'arcade'}, // The physics engine
    parent : 'game',               
});