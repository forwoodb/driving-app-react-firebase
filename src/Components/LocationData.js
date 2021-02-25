import React from 'react';

const LocationData = (props) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th className="text-center">Min/Mile</th>
          <th className="text-center">Projected Time</th>
          <th className="text-center">Target Earnings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">{props.minMile}</td>
          <td className="text-center">{props.projTime}</td>
          <td className="text-center">{props.tarEarn}</td>
        </tr>
        <tr>
          <th className="text-center">$/Hour</th>
          <th className="text-center">Average Time</th>
        </tr>
        <tr>
          <td className="text-center">{props.dollarHour}</td>
          <td className="text-center">{props.averageTime}</td>
        </tr>
        <tr>
          <th className="text-center">$/Mile</th>
          <th className="text-center">Average Distance</th>
        </tr>
        <tr>
          <td className="text-center">{props.dollarMile}</td>
          <td className="text-center">{props.averageDistance}</td>
        </tr>
        <tr>
          <th className="text-center"># of Orders</th>
          <th className="text-center">$/Order</th>
        </tr>
        <tr>
          <td className="text-center">{props.numberOrders}</td>
          <td className="text-center">{props.dollarOrder}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default LocationData;