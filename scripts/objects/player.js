MyGame.objects.Player = function(spec) {
    'use strict';

    let rotation = 0;
    let moveRate = 175;
    let posX = 0;
    let posY = 0;
    let row = 0;
    let col = 0;
    let lastMove = 0;

    let imageReady = true;
    let image = spec.imageAsset;

    function setRotation(angle) {
        rotation = angle;
    }

    function moveLeft(elapsedTime){
      if (atEdge() === 2) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }


      spec.center.x -= spec.squareSize;
      lastMove = 0;
      return true;
    }

    function moveRight(elapsedTime){
      if (atEdge() === 1) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }


      spec.center.x += spec.squareSize;
      lastMove = 0;
      return true;
    }


    function moveUp(elapsedTime){
      if (atEdge() === 4) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }


      spec.center.y -= spec.squareSize;
      lastMove = 0;
      return true;
    }


    function moveDown(elapsedTime){
      if (atEdge() === 3) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }

      spec.center.y += spec.squareSize;
      lastMove = 0;
      return true;
    }


    // TODO: make this code in a reusable way
    function atEdge(){

    }


    function setPosition(x, y){
      spec.center.x = x;
      spec.center.y = y;
      setRotation(0);
    }




    let api = {
        setRotation: setRotation,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveUp: moveUp,
        moveDown: moveDown,
        setPosition: setPosition,
        get imageReady() { return imageReady; },
        get rotation() { return (rotation * (Math.PI / 180)); },
        get position() { return spec.position; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image() { return image; },
    };

    return api;
}
