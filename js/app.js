const playerStart_x = 200,
      playerStart_y = 400,
      collision = 50;
let score = 0;

// parent class for player & enemies
class Character {
  constructor (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  // Draw the Character on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}


// Enemies our player must avoid
class Enemy extends Character {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, sprite = 'images/enemy-bug.png') {
  super(x, y, sprite);
  this.speed = 50;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update (dt) {
    this.x += speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }
}

class Player extends Character {
    constructor (x, y, sprite = 'images/char-boy.png') {
      super(x, y, sprite);
    }
    update(){

    }
    handleInput(){

    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
// Place the player object in a variable called player
const player = new Player (playerStart_x, playerStart_y);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
