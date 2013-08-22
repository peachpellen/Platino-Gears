// require Platino
var platino = require("co.lanica.platino");

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// Create a new window and make the app landscape
var gameWindow = Ti.UI.createWindow();

// create game view
var game = platino.createGameView();

// create a game scene
var scene = platino.createScene();

// add your scene to game view
game.pushScene(scene);

// enable enterframe events
game.enableOnDrawFrameEvent = true

/////////////////////////////
// Background
var bg = platino.createSprite({image:"graphics/paper.png"});
scene.add(bg);

// Add two gears
var gear1 = platino.createSprite({image:"graphics/paperGear.png", x:80, y:100});
scene.add(gear1);
var gear2 = platino.createSprite({image:"graphics/paperGear.png", x:135, y:210});
scene.add(gear2);

// Direction
var reverse = false;
// Moving
var moving = true;
// Speed
var speed = 1;

// Array to hold touch objects
var touchable = [];

// Buttons
var btn1 = platino.createSpriteSheet({image:"graphics/startSprite.png", width:74, height:30, x:4, y:430, name:"stop"});
scene.add(btn1); touchable.push(btn1);
var btn2 = platino.createSprite({image:"graphics/faster.png", x:84, y:430, name:"faster"});
scene.add(btn2); touchable.push(btn2);
var btn3 = platino.createSprite({image:"graphics/slower.png", x:164, y:430, name:"slower"});
scene.add(btn3); touchable.push(btn3);
var btn4 = platino.createSprite({image:"graphics/reverse.png", x:244, y:430, name:"reverse"});
scene.add(btn4); touchable.push(btn4);

// Logic and listener for buttons (touch end)
game.addEventListener("touchend", function(e){
	for (var i = 0; i < touchable.length; i++) {
		if (touchable[i].contains(e.x, e.y)){
			if (touchable[i].name==="stop"&&moving===true){
				moving = false;
				btn1.frame = 1;
			}
			else if (touchable[i].name==="stop"&&moving===false){
				moving = true;
				btn1.frame = 0;
			}
			else if (touchable[i].name==="faster"){
				speed = speed + 1;
			}
			else if (touchable[i].name==="slower"&&speed>1){
				speed = speed - 1;
			}
			else if (touchable[i].name==="reverse"){
				if (reverse===true){
					reverse = false;
				}
				else if (reverse===false){
					reverse = true;
				}
			}
			touchable[i].alpha=1;
		}
	}
});

// Listener for buttons (touch start)
game.addEventListener("touchstart", function(e){
	for (var i = 0; i < touchable.length; i++) {
		if (touchable[i].contains(e.x, e.y)){
			touchable[i].alpha = 0.5;
		}
	}
});

// Function to move the gears
var moveGears = function(e){
    if (moving===true){
        if (reverse===false){
            gear1.rotate(gear1.angle+(speed * Math.PI / 180)*25);
            gear2.rotate(gear2.angle-(speed * Math.PI / 180)*25);
        }
        else if (reverse===true){
            gear1.rotate(gear1.angle-(speed * Math.PI / 180)*25);
            gear2.rotate(gear2.angle+(speed * Math.PI / 180)*25);
        }
    }
};
// Event to update the gears
game.addEventListener("enterframe", moveGears)

// Onload function
game.addEventListener("onload", function(e) {
	// Set target screen size
    game.TARGET_SCREEN = {width:320, height:480};
		// set screen size for your game (TARGET_SCREEN size)
        var screenScale = game.size.width / game.TARGET_SCREEN.width;
        game.screen = {width:game.size.width / screenScale, height:game.size.height / screenScale};
        game.touchScaleX = game.screen.width  / game.size.width;
        game.touchScaleY = game.screen.height / game.size.height;
    // Start the game
    game.start();
});

// Add objects and open game window
gameWindow.add(game);
gameWindow.open({fullscreen:true, navBarHidden:true});