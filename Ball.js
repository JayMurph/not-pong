class Ball {
  constructor(diameter, x_coord, y_coord, x_velocity, y_velocity) {
    this.diameter = diameter;
    this.radius = this.diameter / 2;
    this.position = { x: x_coord, y: y_coord };
    this.velocity = { x: x_velocity, y: y_velocity };
    this.velocity_incrementer = 1.01;
    this.bounce_direction_multiplier = 9;
    this.time_since_last_p_collision = 0;
    this.time_since_last_w_collision = 0;
    this.collision_buffer = 12;
    this.paddle_collision_counter = 0;
    this.current_total_history = 4;
    this.max_history = 30;
    this.history = [];
  }
  show(ball_color, history_color) {
    this.showHistory(history_color);
    fill(ball_color);
    ellipse(this.position.x, this.position.y, this.diameter);
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
        (b / this.history.length) * this.diameter
      );
    }
    pop();
  }
  get p_collision_buffer_over() {
    return this.time_since_last_p_collision > this.collision_buffer;
  }
  get b_collision_buffer_over() {
    return this.time_since_last_w_collision > this.collision_buffer;
  }
  detectCollisionPaddles(paddles) {
    if (this.p_collision_buffer_over) {
      let b_pos = this.position;
      for (let i = 0; i < paddles.length; i++) {
        let p_pos = paddles[i].position;
        let p_dim = paddles[i].dimension;
        //distance along x-axis from center of ball to center of paddle
        let ball_to_p_dist_x = Math.abs(b_pos.x - (p_pos.x + p_dim.width / 2));
        //minimum distance to be a collision along x-axis
        let minimum_dist_x = p_dim.width / 2 + this.radius;
        //distance along y-axis from center of ball to center of paddle
        let ball_to_p_dist_y = Math.abs(b_pos.y - (p_pos.y + p_dim.height / 2));
        //minimum distance to be a collision along y-axis
        let minimum_dist_y = p_dim.height / 2 + this.radius;
        if (
          ball_to_p_dist_x <= minimum_dist_x &&
          ball_to_p_dist_y <= minimum_dist_y
        ) {
          return paddles[i];
        }
      }
    }
    return false;
  }
  detectCollisionTopBottomWall() {
    return (
      (this.position.y > screen_height - this.radius ||
        this.position.y < this.radius) &&
      this.b_collision_buffer_over
    );
  }
  detectCollisionLeftRightWall() {
    return (
      (this.position.x <= this.radius ||
        this.position.x >= screen_width - this.radius) &&
      this.b_collision_buffer_over
    );
  }
  calculatePaddleBounceDirection(p) {
    let p_pos = p.position;
    let p_dim = p.dimension;
    return (
      ((this.position.y - (p_pos.y + p_dim.height / 2)) / p_dim.height) *
      this.bounce_direction_multiplier
    );
  }
  bounceOffTopBottomWall() {
    this.velocity.y = -this.velocity.y;
  }
  bounceOffPaddle(colliding_p) {
    this.velocity.x = -(this.velocity.x * this.velocity_incrementer);
    this.velocity.y = this.calculatePaddleBounceDirection(colliding_p);
  }
  updateHistory(add_history) {
    if (
      add_history &&
      this.current_total_history < this.max_history &&
      this.paddle_collision_counter % 3 == 0
    ) {
      this.current_total_history += 1;
    }
    let vec = createVector(this.position.x, this.position.y);
    this.history[this.history.length] = vec;
    if (this.history.length > this.current_total_history) {
      this.history.shift();
    }
  }
  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  avoidPaddleStick() {
    // jump back from paddle to avoid getting stuck
    this.velocity.x > 0 ? (this.position.x -= 5) : (this.position.x += 5);
  }
  avoidWallStick() {
    // jump back from top and bottom walls to avoid getting stuck
    this.position.y > screen_height - this.radius
      ? (this.position.y = screen_height - this.radius - 2)
      : (this.position.y = this.radius + 2);
  }
  update(p1, p2) {
    let colliding_p = this.detectCollisionPaddles([p1, p2]);
    this.updateHistory(colliding_p);
    if (this.detectCollisionTopBottomWall()) {
      this.avoidWallStick();
      this.bounceOffTopBottomWall();
      this.time_since_last_w_collision = 0;
    } else if (colliding_p) {
      this.avoidPaddleStick();
      this.bounceOffPaddle(colliding_p);
      this.time_since_last_p_collision = 0;
    }
    this.time_since_last_p_collision++;
    this.time_since_last_w_collision++;
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
