class PaddleAI {
  constructor(ai_choice) {
    this.yoff = 0.0;
    this.yinc = 0.009;
    this.accuracy = 1.1;
    this.accuracy_dec = ai_choice;
  }
  generateRandomY(b, p) {
    let noise_val = noise(this.yoff) - 0.5;
    let Y = noise_val * (p.height * this.accuracy) + (b.y - p.height / 2);
    this.yoff += this.yinc;
    this.accuracy += this.accuracy_dec;
    return Y;
  }
}