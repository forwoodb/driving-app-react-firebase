import React, {Component} from 'react';
// import * as firebase from 'firebase';

export default class AnalysisDoorDash extends Component {
  render() {
    // DoorDash
    let doorDash = this.props.orders.filter(order => order.platform === 'DoorDash');

    let averageTimeDoorDash = doorDash.reduce(function(total, order) {
      return total + parseFloat(order.duration);
    }, 0)/doorDash.length;

    let averageDistanceDoorDash = doorDash.reduce(function(total, order) {
      return total + parseFloat(order.distance);
    }, 0)/doorDash.length;

    let dollarOrder = doorDash.reduce(function(total, order) {
      return total + parseFloat(order.earnings);
    }, 0)/doorDash.length;

    let dollarMinuteDoorDash = doorDash.reduce(function(total, order) {
      return total + parseFloat(order.earnings);
    }, 0)/doorDash.length/averageTimeDoorDash * 60;

    let dollarMileDoorDash = doorDash.reduce(function(total, order) {
      return total + parseFloat(order.earnings);
    }, 0)/doorDash.length/averageDistanceDoorDash;
    return (
      <tr>
        <td className="text-center">DoorDash</td>
        <td className="text-center">{doorDash.length}</td>
        <td className="text-center">{averageTimeDoorDash.toFixed(2)}</td>
        <td className="text-center">{averageDistanceDoorDash.toFixed(2)}</td>
        <td className="text-center">{dollarOrder.toFixed(2)}</td>
        <td className="text-center">{dollarMinuteDoorDash.toFixed(2)}</td>
        <td className="text-center">{dollarMileDoorDash.toFixed(2)}</td>
      </tr>
    );
  }
}