class TimedFunction {
  constructor(wait_time, func) {
    this.wait_time = wait_time;
    //conditional function to be executed when timer is over
    //must return a boolean, which is a signal to reset the timer
    this.function = func; 
    this.time = 0;
    this.last_time = 0;
  }
  timedFunction() {
    this.time = frameCount;
    if (this.last_time == 0) {
      this.last_time = this.time - this.wait_time;
    }
    if (this.time - this.last_time >= this.wait_time) {
      var result = this.function();
      if (result) {
        this.last_time = this.time;
      }
    }
  }
}
