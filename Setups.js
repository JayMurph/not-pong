function setupAI() {
  AI_button_arr = [
    new AI_Button("easy_btn", 0.002),
    new AI_Button("med_btn", 0.0005),
    new AI_Button("hard_btn", 0.0002)
  ];
  game_state.AI_choice = AI_button_arr[0].value;
}

function setupSketchHolder() {
  document.getElementById("sketch_holder").onpointerleave = function() {
    if (!game_state.you_lose_flag && !game_state.you_win_flag) {
      game_state.pause_flag = 1;
      game_state.mouse_off_canvas = 1;
    }
  };
  document.getElementById("sketch_holder").onpointerenter = function() {
    if (!game_state.you_lose_flag && !game_state.you_win_flag) {
      game_state.mouse_off_canvas = 0;
    }
  };
}

function setupSlider() {
  document.getElementById("volume").oninput = function() {
    bounce_sound_1.setVolume(this.value / 100);
    bounce_sound_2.setVolume(this.value / 100);
  };
}

function setupColorThemes() {
  defaultColorTheme = new ColorTheme(
    color(255),
    color(255, 255, 255),
    color(255),
    color(0, 0, 0),
    color(220),
    color(255),
    color(0)
  );
  neonColorTheme = new ColorTheme(
    color("#00cc00"),
    color("#00cc00"),
    color("#00b300"),
    color("#1aff1a"),
    color(0),
    color("#00b300"),
    color("#1aff1a")
  );
  evilColorTheme = new ColorTheme(
    color("#e60000"),
    color("#e6e600"),
    color("#cc0000"),
    color("#cc0000"),
    color("#000000"),
    color("#e6e600"),
    color("#e60000")
  );
  game_state.current_color_theme = defaultColorTheme;
}
