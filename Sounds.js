var bounce_sound_1;
var bounce_sound_2;

function playSounds(p1, p2, b) {
  if (b.detectCollisionTopBottomWall() || b.detectCollisionLeftRightWall()) {
    bounce_sound_2.play();
  } else if (b.detectCollisionPaddles([p1, p2])) {
    bounce_sound_1.play();
  }
}
