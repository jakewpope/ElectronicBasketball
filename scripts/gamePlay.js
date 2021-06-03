MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input) {
    'use strict';

    let score;
    let level;
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let finishedLevel = true;

    let myKeyboard = input.Keyboard();

    let myBackground = objects.Background({
      imageSrc: 'assets/background.png',
      center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
      size: { width: graphics.canvas.width, height: graphics.canvas.height }
    });


    let myText = objects.Text({
      text: "Fuel: 60.000",
      font: '16pt Arial',
      fillStyle: 'rgba(255, 0, 0, 1)',
      strokeStyle: 'rgba(0, 0, 0, 1)',
      position: { x: 50, y: 100 }
    });


    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }


    function update(elapsedTime) {

    }


    // Reference: https://stackoverflow.com/questions/37224912/circle-line-segment-collision
    function lineCircleIntersection(pt1, pt2, circle) {
      let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
      let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
      let b = -2 * (v1.x * v2.x + v1.y * v2.y);
      let c =  2 * (v1.x * v1.x + v1.y * v1.y);
      let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
      if (isNaN(d)) { // no intercept
          return false;
      }
      // These represent the unit distance of point one and two on the line
      let u1 = (b - d) / c;
      let u2 = (b + d) / c;
      if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
          return true;
      }
      if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
          return true;
      }
    return false;
    }



    function render() {
        graphics.clear();
        renderer.Background.render(myBackground);
    }

    function gameLoop(time) {
        console.log("in loop");
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {

        myKeyboard.register('Escape', function() {
            console.log("escape pressed");
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

        let canvas = document.getElementById('id-canvas');

    }

    function run() {

      //
      // // check if controls are saved
      // if (window.localStorage.getItem("controls") === null) {
      //   let cItem = {
      //     left: 'ArrowLeft',
      //     right: 'ArrowRight',
      //     thrust: " ",
      //   };
      //   let temp = JSON.stringify(cItem);
      //   window.localStorage.setItem("controls", temp);
      //   myKeyboard.register(cItem.left, myLander.rotateLeft);
      //   myKeyboard.register(cItem.right, myLander.rotateRight);
      //   myKeyboard.register(cItem.thrust, myLander.thrust);
      // } else {
      //   // and set them if they are
      //   var cItem = JSON.parse(window.localStorage.getItem("controls"));
      //   myKeyboard.register(cItem.left, myLander.rotateLeft);
      //   myKeyboard.register(cItem.right, myLander.rotateRight);
      //   myKeyboard.register(cItem.thrust, myLander.thrust);
      // }

      cancelNextRequest = false;
      lastTimeStamp = performance.now();
      requestAnimationFrame(gameLoop);

    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input));
