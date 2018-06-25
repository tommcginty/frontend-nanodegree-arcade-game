const playerStart_x = 200,
      playerStart_y = 400,
      collisionArea = 50;

// Generates a speed value between 100 & 200;
function generateSpeed(){
  let speed = Math.floor(Math.random() * 100) + 100;
  return speed;
}

// Checks to see if the player is colliding with an ememy
function checkCollisions(){
  for (const item in allEnemies){
    if (player.x - allEnemies[item].x < collisionArea &&
        player.y - allEnemies[item].y < collisionArea &&
        allEnemies[item].x - player.x < collisionArea &&
        allEnemies[item].y - player.x < collisionArea)

        return true;
      }
}

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
  this.speed = generateSpeed();
  }
  // Update the enemy's position
  // Parameter: dt, a time delta between ticks
  update (dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -202;
      this.speed = generateSpeed();
    }
    // Movement is multiplied by the dt parameter will ensure
    // the game runs at the same speed for all computers.
    //checkCollisions();
  }
}


class Player extends Character {
    constructor (x, y, sprite = 'images/char-boy.png') {
      super(x, y, sprite);
    }

    update(){
      if(checkCollisions()){
        this.x = playerStart_x;
        this.y = playerStart_y;
      }

      else if (this.y < 0){
        setTimeout(function () {
          this.x = playerStart_x;
          this.y = playerStart_y;
          alert('You Win!')
        }, 5);
      }
    }

    handleInput(evt){
      switch (evt) {
        case 'left':
          if (this.x > 0)
            this.x -= 100;
          break;

        case 'up':
          if (this.y > 0)
            this.y -= 85;
          break;

        case 'right':
          if (this.x < 400)
          this.x += 100;
          break;

        case 'down':
          if (this.y < 400)
            this.y += 85;
          break;
        update();
      }
    }
}


// Now instantiate your objects.
// Place the player object in a variable called player
const player = new Player (playerStart_x, playerStart_y);

// Place all enemy objects in an array called allEnemies
const bug1 = new Enemy (-100, 60),
      bug2 = new Enemy (-200, 145),
      bug3 = new Enemy (-300, 230);
      bug4 = new Enemy (-400, 60),
      bug5 = new Enemy (-500, 145),
      bug6 = new Enemy (-600, 230);
const allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];

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
