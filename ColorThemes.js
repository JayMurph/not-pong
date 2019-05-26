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

function changeColorTheme_aux(theme_choice, gs) {
  for(let i = 0; i < gs.color_themes_arr.length; i++){
    if(gs.color_themes_arr[i].id == theme_choice){
      gs.current_color_theme = gs.color_themes_arr[i]
    }
  }
}

function changeColorTheme(sel, gs) {
  var selected_theme = sel.options[sel.selectedIndex].value;
  changeColorTheme_aux(selected_theme, gs);
}
