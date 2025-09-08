// Main class.
class mainScene {

    // Load assets.
    preload() {

        this.load.image('player', 'assets/ghost.png');
        this.load.image('coin', 'assets/coin.png');
    }

    // Initialize scene.
    create() {

        this.player = this.physics.add.sprite(60, 60, 'player');
        this.coin = this.physics.add.sprite(0, 0, 'coin');
        this.player.setScale(0.05)
        this.coin.setScale(0.045)

        this.score = 0 // To store the score.
        let style = {font: '20px Arial', fill: '#fff'}
        this.scoreText = this.add.text(20, 20, 'score : ' + this.score, style)

        this.arrow = this.input.keyboard.createCursorKeys()
    }

    // Handle the game logic.
    update() {

        // If player and coin overlapping.
        if (this.physics.overlap(this.player, this.coin)){
            this.hit();
        }

        // Handle horizontal movements.
        if (this.arrow.right.isDown) {
            this.player.x += 3;
        }
        else if (this.arrow.left.isDown) {
            this.player.x -= 3;
        }

        // Handle vertical movements.
        if (this.arrow.down.isDown) {
            this.player.y += 3;
        }
        else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        }
    }

    // Handle collisions.
    hit() {

        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);
        this.score += 1;
        this.scoreText.setText('score : ' + this.score);
        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 0.09,
            scaleY: 0.09,
            yoyo: true,
        })
    }
}

// Phaser config.
new Phaser.Game({
    width: 1200,                    // Width in pixels
    height: 500,                   // Height in pixels
    backgroundColor: '#90EE90',    // the background color (blue)
    scene: mainScene,              // The main scene
    physics : {default: 'arcade'}, // The physics engine
    parent : 'game',               
});