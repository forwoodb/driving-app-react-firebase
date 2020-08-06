import React, {Component} from 'react';
// import * as firebase from 'firebase';

export default class AnalysisAll extends Component {
  render() {
    return (
      <tr>
        <td className="text-center">All</td>
        <td className="text-center">{this.props.numberOrders}</td>
        <td className="text-center">{this.props.averageTime}</td>
        <td className="text-center">{this.props.averageDistance}</td>
        <td className="text-center">{this.props.dollarOrder}</td>
        <td className="text-center">{this.props.dollarHour}</td>
        <td className="text-center">{this.props.dollarMile}</td>
      </tr>
    );
  }
}