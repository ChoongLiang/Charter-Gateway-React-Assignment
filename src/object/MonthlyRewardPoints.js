export default class MonthlyRewardPoints {
  constructor (Jan, Feb, Mar) {
    this.Jan = Jan;
    this.Feb = Feb;
    this.Mar = Mar;
  }

  getTotal() {
    return this.Jan + this.Feb + this.Mar;
  }
}