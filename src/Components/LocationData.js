import React from 'react';

const LocationData = (props) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th className="text-center">AveWait</th>
          <th className="text-center">TargetEarnings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">{props.projTime}</td>
          <td className="text-center">{props.tarEarn}</td>
        </tr>
        <tr>
          <th className="text-center">$/Hour</th>
          <th className="text-center">AveTime</th>
        </tr>
        <tr>
          <td className="text-center">{props.dollarHour}</td>
          <td className="text-center">{props.averageTime}</td>
        </tr>
        <tr>
          <th className="text-center">$/Mile</th>
          <th className="text-center">AveDistance</th>
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