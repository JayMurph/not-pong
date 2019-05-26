class Transition {
  constructor(func) {
    this.time = 0;
    //a function containing conditional which defines execution over a given amount of time
    this.func = func;
  }
  transition() {
    this.func();
    this.time += 1;
  }
  getTime() {
    return this.time;
  }
  resetTime() {
    this.time = 0;
  }
}
