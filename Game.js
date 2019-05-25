class State {
  constructor() {
    this.new_game_flag = 1;
    this.new_round_flag = 0;
    this.you_win_flag = 0;
    this.you_lose_flag = 0;
    this.pause_flag = 0;
    this.mouse_off_canvas = 0;
    this.winning_score = 10;
    this.current_color_theme;
    this.ball;
    this.paddle_1;
    this.paddle_2;
    this.AI_choice;
    this.Paddle_AI;
  }
  getBC() {
    return this.current_color_theme.ball_color;
  }
  getBHC() {
    return this.current_color_theme.ball_history_color;
  }
  getPC() {
    return this.current_color_theme.paddle_color;
  }
  getTTC(){
    return this.current_color_theme.transition_text_color;
  }
  getBGC(){
    return this.current_color_theme.background_color;
  }
  getMLC(){
    return this.current_color_theme.middle_line_color;
  }
  getSC(){
    return this.current_color_theme.score_color;
  }
}

function scoreEvent(p1, p2, b_x) {
  if (b_x >= screen_width) {
    p1.score += 1;
    game_state.new_round_flag = 1;
  } else if (b_x <= 0) {
    p2.score += 1;
    game_state.new_round_flag = 1;
  }
  if (p1.score >= game_state.winning_score) {
    game_state.you_win_flag = 1;
    game_state.new_round_flag = 0;
  }
  if (p2.score >= game_state.winning_score) {
    game_state.you_lose_flag = 1;
    game_state.new_round_flag = 0;
  }
}

function scoreShow(p1, p2) {
  fill(game_state.getSC());
  textSize(40);
  text(p1.score, screen_width / 4, screen_height / 10);
  text(p2.score, (screen_width / 4) * 3, screen_height / 10);
}

function togglePauseFlag() {
  if (typeof this.time == "undefined") {
    this.time = frameCount;
    this.wait_time = 30;
    this.last_time = this.time - this.wait_time;
  }
  if (
    !game_state.mouse_off_canvas &&
    !game_state.new_round_flag &&
    this.time - this.last_time >= this.wait_time
  ) {
    if (game_state.pause_flag == 0) {
      game_state.pause_flag = 1;
    } else if (game_state.pause_flag == 1) {
      game_state.pause_flag = 0;
      pauseText.resetTime();
    }
    this.last_time = this.time;
  }
  this.time = frameCount;
}

function clickEvents() {
  if (game_state.you_win_flag) {
    game_state.new_game_flag = 1;
    youWinTransition.resetTime();
  } else if (game_state.you_lose_flag) {
    game_state.new_game_flag = 1;
    youLoseTransition.resetTime();
  } else if (!game_state.new_game_flag) {
    togglePauseFlag();
  }
}

function setNewRoundState() {
  game_state.ball = newBall();
  let prev_p1_score = game_state.paddle_1.score;
  let prev_p2_score = game_state.paddle_2.score;
  game_state.paddle_1 = newPaddle1(prev_p1_score);
  game_state.paddle_2 = newPaddle2(prev_p2_score);
  game_state.paddle_AI = new PaddleAI(game_state.AI_choice);
  game_state.new_round_flag = 0;
}

function setNewGameState() {
  game_state.ball = newBall();
  game_state.paddle_1 = newPaddle1(0);
  game_state.paddle_2 = newPaddle2(0);
  game_state.paddle_AI = new PaddleAI(game_state.AI_choice);
  game_state.new_game_flag = 0;
  game_state.you_win_flag = 0;
  game_state.you_lose_flag = 0;
  game_state.pause_flag = 0;
}

function newBall() {
  return new Ball(
    _ball_diameter,
    _ball_default_x,
    _ball_default_y,
    randomDirection(_ball_init_x_vel),
    randomDirection(_ball_init_y_vel),
  );
}

function newPaddle1(prev_score) {
  return new Paddle(
    _paddle_1_default_x,
    mouseY,
    _paddle_width,
    _paddle_height,
    prev_score
  );
}

function newPaddle2(prev_score) {
  return new Paddle(
    _paddle_2_default_x,
    mouseY,
    _paddle_width,
    _paddle_height,
    prev_score
  );
}

function showMiddleLine() {
  push();
  fill(game_state.getMLC());
  stroke(game_state.getMLC());
  strokeWeight(5);
  var count = 20;
  for (var i = 1; i <= count; i += 2) {
    line(
      screen_width / 2,
      (screen_height / (count + 1)) * i,
      screen_width / 2,
      (screen_height / (count + 1)) * (i + 1)
    );
  }
  pop();
}

var game_state = new State();
let _ball_init_x_vel = 8;
let _ball_init_y_vel = 3;
let _paddle_width = 15;
let _paddle_height = 100;
let _paddle_dist_from_wall = 60;
let _paddle_1_default_x = _paddle_dist_from_wall;
let _paddle_2_default_x = screen_width - _paddle_width - _paddle_dist_from_wall;
let _ball_diameter = 20;
let _ball_default_x = screen_width / 2 - _ball_diameter / 2;
let _ball_default_y = screen_height / 2 - _ball_diameter / 2;
