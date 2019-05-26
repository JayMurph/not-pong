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

function setupSlider(gs) {
  document.getElementById("volume").oninput = function() {
    gs.bounce_sound_1.setVolume(this.value / 100);
    gs.bounce_sound_2.setVolume(this.value / 100);
  };
}

function setupAI(gs) {
  gs.AI_button_arr = [
    new AI_Button("easy_btn", 0.002),
    new AI_Button("med_btn", 0.0005),
    new AI_Button("hard_btn", 0.0002)
  ];
  gs.AI_choice = gs.AI_button_arr[0].value;
}

function setupColorThemes(gs) {
  //add new color themes by defining a new ColorTheme object within this
  //push function
  gs.color_themes_arr = [];
  gs.color_themes_arr.push(
    new ColorTheme(
      "default",
      "Default",
      color(255),
      color(255, 255, 255),
      color(255),
      color(0, 0, 0),
      color(220),
      color(255),
      color(0)
    ),
    new ColorTheme(
      "neon",
      "Neon",
      color("#00cc00"),
      color("#00cc00"),
      color("#00b300"),
      color("#1aff1a"),
      color(0),
      color("#00b300"),
      color("#1aff1a")
    ),
    new ColorTheme(
      "evil",
      "Evil",
      color("#e60000"),
      color("#e6e600"),
      color("#cc0000"),
      color("#cc0000"),
      color("#000000"),
      color("#e6e600"),
      color("#e60000")
    )
  );
  gs.current_color_theme = gs.color_themes_arr[0];

  //creates drop-down-menu option elements from the color theme array
  let select = document.getElementById("color_theme_dropdown");
  for (let i = 0; i < gs.color_themes_arr.length; i++) {
    let opt = document.createElement("option");
    opt.value = game_state.color_themes_arr[i].id;
    opt.innerHTML = game_state.color_themes_arr[i].text;
    select.appendChild(opt);
  }
}

function setupTransitions(gs) {
  gs.newGameTransition = new Transition(function() {
    if (this.getTime() == 10) {
      game_state.bounce_sound_1.play();
    }
    background(game_state.getBGC());
    textSize(66);
    if (_GAME_WIDTH / 4 + this.time * 2 < _GAME_WIDTH / 2) {
      fill(game_state.getTTC());
      text("P O N G", _GAME_WIDTH / 4 + this.time * 2, _GAME_HEIGHT / 2);
    } else {
      fill(game_state.getTTC());
      text("P O N G", _GAME_WIDTH / 2, _GAME_HEIGHT / 2);
    }
    if (this.getTime() >= 210) {
      this.resetTime();
      game_state.new_game_flag = 0;
      game_state.setNewGameState();
    }
  });
  gs.youWinTransition = new Transition(function() {
    textSize(48);
    fill(game_state.getTTC());
    text("You Win!", _GAME_WIDTH / 2, (_GAME_HEIGHT / 5) * 2);
    if (this.getTime() >= 100) {
      text("Play Again?", _GAME_WIDTH / 2, (_GAME_HEIGHT / 5) * 3);
    }
  });
  gs.youLoseTransition = new Transition(function() {
    textSize(48);
    fill(game_state.getTTC());
    text("You Lose!", _GAME_WIDTH / 2, (_GAME_HEIGHT / 5) * 2);
    if (this.getTime() >= 100) {
      text("Play Again?", _GAME_WIDTH / 2, (_GAME_HEIGHT / 5) * 3);
    }
  });
  gs.newRoundTransition = new Transition(function() {
    if (this.getTime() > 60) {
      textSize(48);
      fill(game_state.getTTC());
      text("New Round", _GAME_WIDTH / 2, _GAME_HEIGHT / 2);
    }
    if (this.getTime() >= 180) {
      this.resetTime();
      game_state.setNewRoundState();
    }
  });
  gs.pauseTransition = new Transition(function() {
    if (this.getTime() <= 30) {
      textSize(40);
      fill(game_state.getTTC());
      text(
        "Pause",
        _GAME_WIDTH / 2,
        map(this.getTime(), 0, 30, 0, _GAME_HEIGHT / 8)
      );
    } else {
      textSize(40);
      fill(game_state.getTTC());
      text("Pause", _GAME_WIDTH / 2, _GAME_HEIGHT / 8);
    }
  });
}

function setupPauseToggleObj(gs){
  gs.pauseToggleTimedObj = new TimedFunction(30, function() {
    if (!gs.mouse_off_canvas && !gs.new_round_flag) {
      if (gs.pause_flag == 0) {
        gs.pause_flag = 1;
      } else if (gs.pause_flag == 1) {
        gs.pause_flag = 0;
        gs.pauseTransition.resetTime();
      }
      return true;
    }
    return false;
  });
}