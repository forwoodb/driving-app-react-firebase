import React, {Component} from 'react';

export default class AnalysisData extends Component {
  render() {
    return (
      <tr>
        <td className="text-center first-column">{this.props.category}</td>
        <td className="text-center second-column">{this.props.numberOrders}</td>
        <td className="text-center">{this.props.dollarOrder}</td>
        <td className="text-center">{this.props.dollarHour}</td>
        <td className="text-center">{this.props.averageTime}</td>
        <td className="text-center">{this.props.averageDistance}</td>
        <td className="text-center">{this.props.dollarMile}</td>
      </tr>
    );
  }
}