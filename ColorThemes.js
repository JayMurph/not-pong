class ColorTheme {
  constructor(id, text, bc, bhc, pc, ttc, bgc, mlc, sc) {
    this.id = id;
    this.text = text;
    this.ball_color = bc;
    this.ball_history_color = bhc;
    this.paddle_color = pc;
    this.transition_text_color = ttc;
    this.background_color = bgc;
    this.middle_line_color = mlc;
    this.score_color = sc;
  }
}

function changeColorTheme_aux(theme_choice) {
  for(let i = 0; i < color_themes_arr.length; i++){
    if(color_themes_arr[i].id == theme_choice){
      game_state.current_color_theme = color_themes_arr[i]
    }
  }
}

function changeColorTheme(sel) {
  var selected_theme = sel.options[sel.selectedIndex].value;
  changeColorTheme_aux(selected_theme);
}

var color_themes_arr = [];