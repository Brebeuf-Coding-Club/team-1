var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/background.jpg");
  this.load.image("bomb", "assets/bomb.png");
  this.load.image("wall", "assets/wall.jpg");
  this.load.image("ball", "assets/ball.png");

  // this.load.spritesheet("ball", "assets/ball.png", { frameWidth: 32, frameHeight: 48 });
}

function create() {
  this.add.image(400, 300, "background");
  this.add.image(400, 300, "bomb");

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 588, "wall").setScale(2).refreshBody();
  platforms.create(600, 400, "wall");
  platforms.create(200, 480, "wall");


  player = this.physics.add.sprite(400, 0, "ball").setScale(0.7);
  player.setBounce(0.5);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(300);

  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-400);
  }

}