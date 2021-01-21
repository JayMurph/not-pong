function preload() {
  _bounce_sound_1 = loadSound("bounce1.wav", loaded);
  _bounce_sound_2 = loadSound("bounce2.wav", loaded);
  _bounce_sound_1.setVolume(1);
  _bounce_sound_2.setVolume(1);
  _game_font = loadFont("AtariClassic-Regular.ttf");
}

function loaded() {}

function setup() {
  frameRate(60);
  game_state = new State(_GAME_WIDTH, _GAME_HEIGHT, _bounce_sound_1, _bounce_sound_2, _game_font);
  setupPauseToggleObj(game_state);
  setupColorThemes(game_state);
  setupSlider(game_state);
  setupAI(game_state);
  setupTransitions(game_state);
  var canvas = createCanvas(game_state.game_width, game_state.game_height);
  setupSketchHolder();
  canvas.parent("sketch_holder");
  textFont(game_state.game_font);
  textAlign(CENTER, CENTER);
}

function draw() {
  game_state.game();
}

function mouseClicked() {
  game_state.clickEvents();
}
