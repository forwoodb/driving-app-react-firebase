import React, {Component} from 'react';
// import * as firebase from 'firebase';

export default class AnalysisGrubHub extends Component {

  render() {
    // GrubHub
    let grubHub = this.props.orders.filter(order => order.platform === 'GrubHub');

    let averageTimeGrubHub = grubHub.reduce(function(total, order) {
      return total + Number(order.duration);
    }, 0)/grubHub.length;

    let averageDistanceGrubHub = grubHub.reduce(function(total, order) {
      return total + Number(order.distance);
    }, 0)/grubHub.length;

    let dollarOrder = grubHub.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/grubHub.length;

    let dollarMinuteGrubHub = grubHub.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/grubHub.length/averageTimeGrubHub * 60;

    let dollarMileGrubHub = grubHub.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/grubHub.length/averageDistanceGrubHub;

    return (
      <tr>
        <td className="text-center">GrubHub</td>
        <td className="text-center">{grubHub.length}</td>
        <td className="text-center">{averageTimeGrubHub.toFixed(2)}</td>
        <td className="text-center">{averageDistanceGrubHub.toFixed(2)}</td>
        <td className="text-center">{dollarOrder.toFixed(2)}</td>
        <td className="text-center">{dollarMinuteGrubHub.toFixed(2)}</td>
        <td className="text-center">{dollarMileGrubHub.toFixed(2)}</td>
      </tr>
    );
  }
}