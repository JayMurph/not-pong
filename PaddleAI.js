class PaddleAI {
  constructor(ai_choice) {
    this.y_offset = 0.0;
    this.y_increment = 0.009;
    this.accuracy = 1.1;
    // the difference between the different paddle AI's is how high
    // their accuracy_dec_rate is
    this.accuracy_dec_rate = ai_choice;
  }
  generateRandomY(b_y, p_height) {
    //generate a noise value between -0.5 and 0.5
    let noise_val = noise(this.y_offset) - 0.5;
    //map that noise value to a range of accuracy, centered over the paddle
    let Y =
      noise_val * (p_height * this.accuracy) +
      (b_y - p_height / 2);
    // increase the y_offset for the noise value
    this.y_offset += this.y_increment;
    // decrease the paddle accuracy
    this.accuracy += this.accuracy_dec_rate;
    return Y;
  }
}
