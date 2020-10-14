export default class Helper {
  static rewardPointCalculator = (totalPurchase) => {
    let rewardPoints = 0;
    let purchase = parseInt(totalPurchase);
    if (purchase > 100) {
      rewardPoints = (purchase.toFixed(0) - 100) * 2;
      rewardPoints += 50;
    } else if (50 < purchase < 100 ) {
      rewardPoints = (purchase.toFixed(0) - 50);
    }
  return rewardPoints;
  }

  static monthIdentifier = (date) => {
    const month = date.toString().slice(0,3);
    let numericMonth = 0;
    switch(month) {
      case 'Jan':
        numericMonth = 1;
        break;
      case 'Feb':
        numericMonth = 2;
        break;
      case 'Mar':
        numericMonth = 3;
        break;
      default:
        return numericMonth;
    }
  return numericMonth;
  }
}