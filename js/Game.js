var _GAME_WIDTH = 800;
var _GAME_HEIGHT = 500;
var _ball_init_x_vel = 8;
var _ball_init_y_vel = 3;
var _paddle_width = 15;
var _paddle_height = 100;
var _paddle_dist_from_wall = 60;
var _paddle_1_default_x = _paddle_dist_from_wall;
var _paddle_2_default_x = _GAME_WIDTH - _paddle_width - _paddle_dist_from_wall;
var _ball_diameter = 20;
var _ball_default_x = _GAME_WIDTH / 2 - _ball_diameter / 2;
var _ball_default_y = _GAME_HEIGHT / 2 - _ball_diameter / 2;
var _game_font;
var _bounce_sound_1;
var _bounce_sound_2;

class State {
  constructor(
    game_width,
    game_height,
    bounce_sound_1,
    bounce_sound_2,
    game_font
  ) {
    this.game_width = game_width;
    this.game_height = game_height;
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
    this.AI_button_arr;
    this.AI_choice;
    this.Paddle_AI;
    this.bounce_sound_1 = bounce_sound_1;
    this.bounce_sound_2 = bounce_sound_2;
    this.color_themes_arr;
    this.game_font = game_font;
    this.youWinTransition;
    this.youLoseTransition;
    this.newRoundTransition;
    this.newGameTransition;
    this.pauseTransition;
    this.pauseToggleTimedObj;
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
  getTTC() {
    return this.current_color_theme.transition_text_color;
  }
  getBGC() {
    return this.current_color_theme.background_color;
  }
  getMLC() {
    return this.current_color_theme.middle_line_color;
  }
  getSC() {
    return this.current_color_theme.score_color;
  }
  newBall() {
    return new Ball(
      _ball_diameter,
      _ball_default_x,
      _ball_default_y,
      randomDirection(_ball_init_x_vel),
      randomDirection(_ball_init_y_vel)
    );
  }
  newPaddle1(prev_score) {
    return new Paddle(
      _paddle_1_default_x,
      mouseY,
      _paddle_width,
      _paddle_height,
      prev_score
    );
  }
  newPaddle2(prev_score) {
    return new Paddle(
      _paddle_2_default_x,
      mouseY,
      _paddle_width,
      _paddle_height,
      prev_score
    );
  }
  setNewRoundState() {
    this.ball = this.newBall();
    let prev_p1_score = this.paddle_1.score;
    let prev_p2_score = this.paddle_2.score;
    this.paddle_1 = this.newPaddle1(prev_p1_score);
    this.paddle_2 = this.newPaddle2(prev_p2_score);
    this.paddle_AI = new PaddleAI(this.AI_choice);
    this.new_round_flag = 0;
  }
  setNewGameState() {
    this.ball = this.newBall();
    this.paddle_1 = this.newPaddle1(0);
    this.paddle_2 = this.newPaddle2(0);
    this.paddle_AI = new PaddleAI(this.AI_choice);
    this.new_game_flag = 0;
    this.you_win_flag = 0;
    this.you_lose_flag = 0;
    this.pause_flag = 0;
  }
  scoreEvent() {
    let b_x = this.ball.position.x;
    if (b_x >= this.game_width) {
      this.paddle_1.score += 1;
      this.new_round_flag = 1;
    } else if (b_x <= 0) {
      this.paddle_2.score += 1;
      this.new_round_flag = 1;
    }
    if (this.paddle_1.score >= this.winning_score) {
      this.you_win_flag = 1;
      this.new_round_flag = 0;
    }
    if (this.paddle_2.score >= this.winning_score) {
      this.you_lose_flag = 1;
      this.new_round_flag = 0;
    }
  }
  play() {
    this.paddle_1.update(
      _paddle_1_default_x,
      mouseY - this.paddle_1.dimension.height / 2
    );
    this.paddle_2.update(
      _paddle_2_default_x,
      game_state.paddle_AI.generateRandomY(
        this.ball.position.y,
        this.paddle_2.dimension.height
      )
    );
    this.ball.update(
      this.paddle_1,
      this.paddle_2,
      this.game_width,
      this.game_height
    );
    this.scoreEvent();
  }
  showMiddleLine() {
    push();
    fill(this.getMLC());
    stroke(this.getMLC());
    strokeWeight(5);
    var count = 20;
    for (var i = 1; i <= count; i += 2) {
      line(
        this.game_width / 2,
        (this.game_height / (count + 1)) * i,
        this.game_width / 2,
        (this.game_height / (count + 1)) * (i + 1)
      );
    }
    pop();
  }
  scoreShow() {
    fill(game_state.getSC());
    textSize(40);
    text(this.paddle_1.score, this.game_width / 4, this.game_height / 10);
    text(this.paddle_2.score, (this.game_width / 4) * 3, this.game_height / 10);
  }
  show() {
    background(game_state.getBGC());
    this.showMiddleLine();
    this.paddle_1.show(game_state.getPC());
    this.paddle_2.show(game_state.getPC());
    this.ball.show(game_state.getBC(), game_state.getBHC());
    this.scoreShow();
  }
  playSounds() {
    if (
      this.ball.detectCollisionTopBottomWall(this.game_height) ||
      this.ball.detectCollisionLeftRightWall(this.game_width)
    ) {
      this.bounce_sound_2.play();
    } else if (
      this.ball.detectCollisionPaddles([this.paddle_1, this.paddle_2])
    ) {
      this.bounce_sound_1.play();
    }
  }
  game() {
    if (this.new_game_flag) {
      this.newGameTransition.transition();
    } else if (this.new_round_flag) {
      this.show();
      this.newRoundTransition.transition();
    } else if (this.pause_flag) {
      this.show();
      this.pauseTransition.transition();
    } else if (this.you_win_flag) {
      this.show();
      this.youWinTransition.transition();
    } else if (this.you_lose_flag) {
      this.show();
      this.youLoseTransition.transition();
    } else {
      this.show();
      this.play();
      this.playSounds();
    }
  }
  clickEvents() {
    if (this.you_win_flag) {
      this.new_game_flag = 1;
      this.youWinTransition.resetTime();
    } else if (this.you_lose_flag) {
      this.new_game_flag = 1;
      this.youLoseTransition.resetTime();
    } else if (!this.new_game_flag) {
      this.pauseToggleTimedObj.timedFunction();
    }
  }
}
