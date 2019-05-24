let screen_width = 800;
let screen_height = 500;
var game_font;
var AI_button_arr;

function preload() {
  bounce_sound_1 = loadSound("bounce1.wav", loaded);
  bounce_sound_2 = loadSound("bounce2.wav", loaded);
  bounce_sound_1.setVolume(1);
  bounce_sound_2.setVolume(1);
  game_font = loadFont("AtariClassic-Regular.ttf");
}

function loaded() {}

function setup() {
  frameRate(60);
  setupColorThemes();
  setupSlider();
  setupAI();
  var canvas = createCanvas(screen_width, screen_height);
  setupSketchHolder();
  canvas.parent("sketch_holder");
  textFont(game_font);
  textAlign(CENTER, CENTER);
}

function draw() {
  let p1 = game_state.paddle_1;
  let p2 = game_state.paddle_2;
  let b = game_state.ball;
  game(p1, p2, b);
}

function play(p1, p2, b) {
  p1.updatePosition(
    _paddle_1_default_x,
    mouseY - p1.height / 2
  );
  p2.updatePosition(
    _paddle_2_default_x,
    game_state.paddle_AI.generateRandomY(b, p2)
  );
  b.update(p1, p2);
  scoreEvent(p1, p2, b);
}

function show(p1, p2, b) {
  background(game_state.getBGC());
  showMiddleLine();
  p1.show(game_state.getPC());
  p2.show(game_state.getPC());
  b.show(game_state.getBC(), game_state.getBHC());
  scoreShow(p1, p2);
}

function game(p1, p2, b) {
  if (game_state.new_game_flag) {
    newGameTransition.transition();
  } else if (game_state.new_round_flag) {
    show(p1, p2, b);
    newRoundTransition.transition();
  } else if (game_state.pause_flag) {
    show(p1, p2, b);
    pauseText.transition();
  } else if (game_state.you_win_flag) {
    show(p1, p2, b);
    youWinTransition.transition();
  } else if (game_state.you_lose_flag) {
    show(p1, p2, b);
    youLoseTransition.transition();
  } else {
    show(p1, p2, b);
    play(p1, p2, b);
    playSounds(p1, p2, b);
  }
}

function mouseClicked() {
  clickEvents();
}
