class ColorTheme {
  constructor(bc, bhc, pc, ttc, bgc, mlc, sc) {
    this.ball_color = bc;
    this.ball_history_color = bhc;
    this.paddle_color = pc;
    this.transition_text_color = ttc;
    this.background_color = bgc;
    this.middle_line_color = mlc;
    this.score_color = sc;
  }
}

var defaultColorTheme;
var neonColorTheme;
var evilColorItem;

function changeColorTheme_aux(theme_choice) {
  if (theme_choice == "neon") {
    game_state.current_color_theme = neonColorTheme;
  } else if (theme_choice == "default") {
    game_state.current_color_theme = defaultColorTheme;
  } else if (theme_choice == "evil") {
    game_state.current_color_theme = evilColorTheme;
  }
}

function changeColorTheme2(sel) {
  var selected_theme = sel.options[sel.selectedIndex].value;
  changeColorTheme_aux(selected_theme);
}
