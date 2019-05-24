class AI_Button {
  constructor(btn_id, value) {
    this.id = btn_id;
    this.value = value;
  }
}

function toggleAIbuttonColors(id) {
  for (let i = 0; i < AI_button_arr.length; i++) {
    let col = "#000000";
    if (AI_button_arr[i].id == id) {
      col = "#ff0000";
    }
    document.getElementById(AI_button_arr[i].id).style.color = col;
  }
}

function setActiveAI(AI_button_obj) {
  if (!game_state.new_game_flag) {
    game_state.AI_choice = AI_button_obj.value;
    game_state.new_game_flag = 1;
    game_state.new_round_flag = 0;
    toggleAIbuttonColors(AI_button_obj.id);
  }
}