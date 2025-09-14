// Main class.
class mainScene {

    // Load assets.
    preload() {
        
        this.load.image('player', 'assets/ghost.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.width = 1200;
        this.height = 500;
        this.score = 0;     // To store the score.
        this.score -= 1;
    }

    // Initialize scene.
    create() {

        this.player = this.physics.add.sprite(60, 60, 'player');
        this.coin = this.physics.add.sprite(0, 0, 'coin');
        this.enemy1 = this.physics.add.sprite(Phaser.Math.Between(10, this.width-10), Phaser.Math.Between(10, this.height-10), 'enemy');
        /* this.enemy2 = this.physics.add.sprite(Phaser.Math.Between(10, this.width-10), Phaser.Math.Between(10, this.height-10), 'enemy');
        this.enemy3 = this.physics.add.sprite(Phaser.Math.Between(10, this.width-10), Phaser.Math.Between(10, this.height-10), 'enemy');
        this.enemy4 = this.physics.add.sprite(Phaser.Math.Between(10, this.width-10), Phaser.Math.Between(10, this.height-10), 'enemy'); */
        this.sprites = [this.player, this.coin, this.enemy1/* , this.enemy2, this.enemy3, this.enemy4 */];
        this.player.setScale(0.05);
        this.coin.setScale(0.045);
        this.enemy1.setScale(0.07);
        /* this.enemy2.setScale(0.07);
        this.enemy3.setScale(0.07);
        this.enemy4.setScale(0.07); */

        let style = {font: '20px Arial', fill: '#fff'};
        this.scoreText = this.add.text(20, 20, 'score : ' + this.score, style);

        this.arrow = this.input.keyboard.createCursorKeys();
    }

    // Handle the game logic.
    update() {

        // If the player and the coin overlapping.
        if (this.physics.overlap(this.player, this.coin)){
            this.hit();
        }

        // If the player and an enemy overlapping.
        if (this.physics.overlap(this.player, this.enemy1) /* || (this.physics.overlap(this.player, this.enemy2)) || 
            this.physics.overlap(this.player, this.enemy3) || (this.physics.overlap(this.player, this.enemy4)) */) {
                this.hitEnemy();
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

        this.cross()
    }

    // Handle collisions with the coin.
    hit() {
        
        this.score += 1;
        this.scoreText.setText('score : ' + this.score);
        this.coin.x = Phaser.Math.Between(10, this.width-10);
        this.coin.y = Phaser.Math.Between(10, this.height-10);
        this.tweens.add({
            targets: this.player,
            duration: 100,
            scaleX: 0.09,
            scaleY: 0.09,
            yoyo: true,
        })
    }

    // Handle collisions with an enemy.
    hitEnemy() {

        let style = {font: '50px Arial', fill: '#FF0000'};
        this.gameOverText = this.add.text(50, 50, 'Game Over !', style);
        window.location.reload();
    }

    // Manage the movement of enemies.
    enemiesMovement() {

    }

    // Map limits crossing management.
    cross() {

        if(this.player.x < 0){
            this.player.setX(this.width-10)
        }

        if(this.player.x > this.width){
            this.player.setX(0)
        }

        if(this.player.y < 0){
            this.player.setY(this.height-10)
        }

        if(this.player.y > this.height){
            this.player.setY(0)
        }
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