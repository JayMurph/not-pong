class Ball {
  constructor(d, x, y, x_velocity, y_velocity) {
    this.d = d;
    this.r = this.d / 2;
    this.x = x;
    this.y = y;
    this.x_velocity = x_velocity; //8;
    this.y_velocity = y_velocity; //3;
    this.vel_inc = 1.01;
    this.bounce_direction_multiplier = 9;
    this.time_since_last_p_collision = 0;
    this.time_since_last_b_collision = 0;
    this.collision_buffer = 12;
    this.paddle_collision_counter = 0;
    this.current_total_history = 4;
    this.max_history = 30;
    this.history = [];
  }
  show(ball_color, history_color) {
    this.showHistory(history_color);
    fill(ball_color);
    ellipse(this.x, this.y, this.d);
  }
  showHistory(history_color) {
    push();
    for (let b = 0; b < this.history.length; b++) {
      let temp_color = history_color;
      temp_color.setAlpha(map(b, 0, this.current_total_history, 0, 200));
      fill(temp_color);
      ellipse(
        this.history[b].x,
        this.history[b].y,
        (b / this.history.length) * this.d
      );
    }
    pop();
  }
  get p_collision_buffer_over (){
    return (this.time_since_last_p_collision > this.collision_buffer);
  }
  get b_collision_buffer_over (){
    return (this.time_since_last_b_collision > this.collision_buffer);
  }
  detectCollisionPaddles(p1, p2) {
    if (
      Math.abs(this.x - (p1.x + p1.width / 2)) <= p1.width / 2 + this.r &&
      Math.abs(this.y - (p1.y + p1.height / 2)) <= p1.height / 2 + this.r &&
      this.p_collision_buffer_over
    ) {
      return p1;
    } else if (
      Math.abs(this.x - (p2.x + p2.width / 2)) <= p2.width / 2 + this.r &&
      Math.abs(this.y - (p2.y + p2.height / 2)) <= p2.height / 2 + this.r &&
      this.p_collision_buffer_over
    ) {
      return p2;
    }
    return false;
  }
  detectCollisionTopBottomWall() {
    return ((this.y > screen_height - this.r || this.y < this.r) &&
        this.b_collision_buffer_over)
  }
  detectCollisionLeftRightWall() {
    return ((this.x <= this.r || this.x >= screen_width - this.r) &&
        this.b_collision_buffer_over);
  }
  calculatePaddleBounceDirection(p) {
    return (
      ((this.y - (p.y + p.height / 2)) / p.height) *
      this.bounce_direction_multiplier
    );
  }
  bounceOffTopBottomWall(){
      this.y_velocity = -this.y_velocity;
  }
  bounceOffPaddle(colliding_p){
      this.x_velocity = -(this.x_velocity * this.vel_inc);
      this.y_velocity = this.calculatePaddleBounceDirection(colliding_p);
  }
  updateHistory(add_history) {
    if (
      add_history &&
      this.current_total_history < this.max_history &&
      this.paddle_collision_counter % 3 == 0
    ) {
      this.current_total_history += 1;
    }
    let vec = createVector(this.x, this.y);
    this.history[this.history.length] = vec;
    if (this.history.length > this.current_total_history) {
      this.history.shift();
    }
  }
  updatePosition() {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  }
  avoidPaddleStick() {
    // jump back from paddle to avoid getting stuck
    this.x_velocity > 0 ? 
    this.x -=5 : 
    this.x += 5;
  }
  avoidWallStick() {
    // jump back from top and bottom walls to avoid getting stuck
    (this.y > screen_height - this.r) ? 
    this.y = screen_height - this.r - 2 :
    this.y = this.r + 2;
  }
  update(p1, p2) {
    let colliding_p = this.detectCollisionPaddles(p1, p2);
    this.updateHistory(colliding_p);
    if (this.detectCollisionTopBottomWall()) {
      this.avoidWallStick();
      this.bounceOffTopBottomWall();
      this.time_since_last_b_collision = 0;
    } else if (colliding_p) {
      this.avoidPaddleStick();
      this.bounceOffPaddle(colliding_p);
      this.time_since_last_p_collision = 0;
    }
    this.time_since_last_p_collision++;
    this.time_since_last_b_collision++;
    this.updatePosition();
  }
}

function randomDirection(n) {
  let x = floor(random(0, 2));
  if (x == 1) {
    return -n;
  } else {
    return n;
  }
}
