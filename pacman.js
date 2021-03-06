// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Binky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghost = [inky, blinky, pinky, clyde]

// replace this comment with your four ghosts setup as objects
//


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('Power-Pellets: ' + powerPellets);
}


function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets >= 0) {
    console.log('(p) Eat Power-Pellet');
  }
  console.log('(1) Eat Inky');
  console.log('(2) Eat Blinky');
  console.log('(3) Eat Pinky');
  console.log('(4) Eat Clyde');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function gameOver() {
  if(lives === 0){
    process.exit();
  }
}
function eatGhost(ghost) {
  if (ghost.edible === false) {

    console.log('You were eaten by' + ghost.colour + ghost.name)
    lives --
  } else if (ghost.edible === true) {
    console.log ('You ate' + ghost.colour + ghost.name);
    score += 200
    lives ++
    ghost.edible = false
  }
}

function eatPowerPellet() {
  ghost.forEach(function(element){
    element.edible = true
  })
  console.log(score += 50)
  powerPellets --
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program

    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
      if (powerPellets > 0){
        console.log('\n Pellet en route!');
      } else if (powerPellets === 0){
        console.log('No More Pellets:(');
      }
      break;
    case '1':
      eatGhost(inky);
      console.log(gameOver())
      break;
    case '2':
      eatGhost(blinky);
      console.log(gameOver())
      break;
    case '3':
      eatGhost(pinky);
      console.log(gameOver())
    case '4':
      eatGhost(clyde);
      console.log(gameOver())
      break
    case 'q':
      process.exit();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}



//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
