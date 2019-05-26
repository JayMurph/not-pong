class AI_Button {
  constructor(btn_id, value) {
    this.id = btn_id;
    this.value = value;
  }
}

function toggleAIbuttonColors(id, gs) {
  for (let i = 0; i < gs.AI_button_arr.length; i++) {
    let col = "#000000";
    if (gs.AI_button_arr[i].id == id) {
      col = "#ff0000";
    }
    document.getElementById(gs.AI_button_arr[i].id).style.color = col;
  }
}

function setActiveAI(sel, gs) {
  if (!gs.new_game_flag) {
    gs.AI_choice = gs.AI_button_arr[sel].value;
    gs.new_game_flag = 1;
    gs.new_round_flag = 0;
    toggleAIbuttonColors(gs.AI_button_arr[sel].id, gs);
  }
}