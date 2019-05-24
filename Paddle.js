class Paddle {
  constructor(x, y, w, h, score) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.score = score;
  }
  show(color) {
    noStroke();
    fill(color);
    rect(this.x, this.y, this.width, this.height);
  }
  updatePosition(x, y) {
    if (y > screen_height - this.height) {
      y = screen_height - this.height;
    } else if (y < 0) {
      y = 0;
    }
    this.y = y;
    if(x > screen_width - this.width){
      x = screen_width - this.width
    } else if (x < 0){
      x = 0;
    }
    this.x = x;
  }
}