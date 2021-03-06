import React from 'react';

const AnalysisData = (props) => {
  return (
    <tr>
      <td className="text-center first-column">{props.category}</td>
      <td className="text-center second-column">{props.numberOrders}</td>
      <td className="text-center">{props.dollarOrder}</td>
      <td className="text-center">{props.dollarHour}</td>
      <td className="text-center">{props.averageTime}</td>
      <td className="text-center">{props.averageWait}</td>
      <td className="text-center">{props.averageDistance}</td>
      <td className="text-center">{props.dollarMile}</td>
    </tr>
  );
}

export default AnalysisData;

