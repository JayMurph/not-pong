class Transition {
  constructor(func) {
    this.time = 0;
    this.func = func;
  }
  transition() {
    this.func();
    this.time += 1;
  }
  getTime(){
    return this.time;
  }
  resetTime() {
    this.time = 0;
  }
}

var youWinTransition = new Transition(
  function () {
    textSize(48);
    fill(game_state.getTTC());
    text("You Win!", screen_width / 2, (screen_height / 5) * 2);
    if (this.getTime() >= 100) {
      text("Play Again?", screen_width / 2, (screen_height / 5) * 3);
    }
  }
)

var youLoseTransition = new Transition(
  function () {
    textSize(48);
    fill(game_state.getTTC());
    text("You Lose!", screen_width / 2, (screen_height / 5) * 2);
    if (this.getTime() >= 100) {
      text("Play Again?", screen_width / 2, (screen_height / 5) * 3);
    }
  }
)

var newRoundTransition = new Transition(
  function () {
    if (this.getTime() > 60) {
      textSize(48);
      fill(game_state.getTTC());
      text("New Round", screen_width / 2, screen_height / 2);
    }
    if (this.getTime() >= 180) {
      this.resetTime();
      setNewRoundState();
    }
  }
)

var newGameTransition = new Transition(
  function () {
    if (this.getTime() == 10) {
      bounce_sound_1.play();
    }
    background(game_state.getBGC());
    textSize(66);
    if (screen_width / 4 + this.time * 2 < screen_width / 2) {
      fill(game_state.getTTC());
      text(
        "P O N G",
        screen_width / 4 + this.time * 2,
        screen_height / 2
      );
    } else {
      fill(game_state.getTTC());
      text("P O N G", screen_width / 2, screen_height / 2);
    }
    if (this.getTime() >= 210) {
      this.resetTime();
      game_state.new_game_flag = 0;
      setNewGameState();
    }
  }
)

var pauseText = new Transition(
  function () {
    if (this.getTime() <= 30) {
      textSize(40);
      fill(game_state.getTTC());
      text(
        "Pause",
        screen_width / 2,
        map(this.getTime(), 0, 30, 0, screen_height / 8)
      );
    } else {
      textSize(40);
      fill(game_state.getTTC());
      text("Pause", screen_width / 2, screen_height / 8);
    }
  }
)