import React, {Component} from 'react';
// import * as firebase from 'firebase';

export default class AnalysisUberEats extends Component {

  render() {
    // UberEats
    let uberEats = this.props.orders.filter(order => order.platform === 'UberEats');

    let averageTime = uberEats.reduce(function(total, order) {
      return total + Number(order.duration);
    }, 0)/uberEats.length;

    let averageDistance = uberEats.reduce(function(total, order) {
      return total + Number(order.distance);
    }, 0)/uberEats.length;

    let dollarOrder = uberEats.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/uberEats.length;

    let dollarHour = uberEats.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/uberEats.length/averageTime * 60;

    let dollarMile = uberEats.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/uberEats.length/averageDistance;

    return (
      <tr>
        <td className="text-center">UberEats</td>
        <td className="text-center">{uberEats.length}</td>
        <td className="text-center">{averageTime.toFixed(2)}</td>
        <td className="text-center">{averageDistance.toFixed(2)}</td>
        <td className="text-center">{dollarOrder.toFixed(2)}</td>
        <td className="text-center">{dollarHour.toFixed(2)}</td>
        <td className="text-center">{dollarMile.toFixed(2)}</td>
      </tr>
    );
  }
}