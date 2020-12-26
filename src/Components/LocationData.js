import React, { Component } from 'react';

export default class LocationData extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="text-center">$/Hour</th>
            <th className="text-center">Average Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{this.props.dollarHour}</td>
            <td className="text-center">{this.props.averageTime}</td>
          </tr>
          <tr>
            <th className="text-center">$/Mile</th>
            <th className="text-center">Average Distance</th>
          </tr>
          <tr>
            <td className="text-center">{this.props.dollarMile}</td>
            <td className="text-center">{this.props.averageDistance}</td>
          </tr>
          <tr>
            <th className="text-center"># of Orders</th>
            <th className="text-center">$/Order</th>
          </tr>
          <tr>
            <td className="text-center">{this.props.numberOrders}</td>
            <td className="text-center">{this.props.dollarOrder}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}