import React, { Component } from 'react';

import './Main.css';
import OrderList from '../../dummy-data/Order-List.json';
import MonthlyRewardPoints from '../../object/MonthlyRewardPoints';
import Helper from '../../Helper/Helper';

class Main extends Component {

  handleClick = (e) => {
    const name = JSON.parse(e.currentTarget.getAttribute('data-item')).name;
    this.props.history.push({
      pathname: '/customerDetails/' + name,
      state: { detail: JSON.parse(e.currentTarget.getAttribute('data-item')) }
    });
  }

  render() {
    const customer = [];
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    for(const [index, value] of OrderList.entries()) {
      let monthlyRewardPoints = new MonthlyRewardPoints(0, 0, 0); 
      let totalPurchase = 0;
      if(value.orders !== null) {
        for(let i = 0; i < value.orders.length; i++) {
          totalPurchase += parseFloat(value.orders[i].Price);
          switch(Helper.monthIdentifier(value.orders[i].timeStamp)) {
            case 1:
              monthlyRewardPoints.Jan += Helper.rewardPointCalculator(value.orders[i].Price);
              break;
            case 2:
              monthlyRewardPoints.Feb += Helper.rewardPointCalculator(value.orders[i].Price);
              break;
            case 3:
              monthlyRewardPoints.Mar += Helper.rewardPointCalculator(value.orders[i].Price);
              break;
            default:
              break;
          }
        }
      }
      value['monthlyRewardPoints'] = monthlyRewardPoints;
      customer.push(<tr key={index} onClick={this.handleClick} data-item={JSON.stringify(value)}>
                      <th scope="row">{index + 1}</th>
                      <td>{value.name}</td>
                      <td>{formatter.format(totalPurchase)}</td>
                      <td>{value.emailAddress}</td>
                      <td className="text-center">{monthlyRewardPoints.Jan}</td>
                      <td className="text-center">{monthlyRewardPoints.Feb}</td>
                      <td className="text-center">{monthlyRewardPoints.Mar}</td>
                      <td className="text-center">{monthlyRewardPoints.getTotal()}</td>
                    </tr>
                    )
    }

    return (
      <div className="wh">
        <h1 className="text-center pt-3">Charter Gateway Rewards Program</h1>
        <table id="table-custom-width" className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Total Purchases</th>
              <th scope="col">Email Address</th>
              <th scope="col">January Rewards</th>
              <th scope="col">Febuary Rewards</th>
              <th scope="col">March Rewards</th>
              <th scope="col">Total Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {customer}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;