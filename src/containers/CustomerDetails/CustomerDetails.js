import React, { Component } from 'react';
import './CustomerDetails.css';
import Helper from '../../Helper/Helper';

class CustomerDetails extends Component {
  
  rewardPointsSum = (rp) => {
    return rp.Jan + rp.Feb + rp.Mar;
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    let purchases = {
      jan: [],
      feb: [],
      mar: []
    }
    const detail = this.props.location.state.detail;
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    for(let i = 0; i < detail.orders.length; i++) {
      const item = (
        <div key={i}>
          <p>Order id: {detail.orders[i].orderId}</p>
          <p>Price: {formatter.format(detail.orders[i].Price)}</p>
          <p>Item: {detail.orders[i].item}</p>
          <p>Quantity: {detail.orders[i].quantity}</p>
          <p>Date: {detail.orders[i].timeStamp}</p>
          <p>Reward Points: {Helper.rewardPointCalculator(detail.orders[i].Price)}</p>
          <hr/>
        </div>
      );
      switch(Helper.monthIdentifier(detail.orders[i].timeStamp)) {
        case 1:
          purchases.jan.push(item);
          break;
        case 2:
          purchases.feb.push(item);
          break;
        case 3:
          purchases.mar.push(item);
          break;
        default:
          break;
      }
    }
    return (
      <div className="wh"> 
        <div className="pt-3">
          <div className="m-auto" style= {{width: 75 + "%"}}>
            <button type="button pb-3" className="btn btn-primary" onClick={this.goBack}>Back</button>
          </div>
          <div className="card m-auto" style= {{width: 75 + "%"}}>
            <div className="card-header">
              <h5 className="card-title">{detail.name}</h5>
                <p>Email Address: {detail.emailAddress}</p>
                <p>Address: {detail.address}</p>
                <p>Phone Number: {detail.phoneNumber}</p>
                <p>Total Redeemable Reward Points: {this.rewardPointsSum(detail.monthlyRewardPoints)}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h4 className="pb-3">January Purchases</h4>
                {purchases.jan}
                <h6>Reward Points earned this month: {detail.monthlyRewardPoints.Jan}</h6>
              </li>
              <li className="list-group-item">
                <h4 className="pb-3">Febuary Purchases</h4>
                {purchases.feb}
                <h6>Monthly Total: {detail.monthlyRewardPoints.Feb}</h6>
              </li>
              <li className="list-group-item">
                <h4 className="pb-3">March Purchases</h4>
                {purchases.mar}
                <h6>Monthly Total: {detail.monthlyRewardPoints.Mar}</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDetails;