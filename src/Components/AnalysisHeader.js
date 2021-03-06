import React from 'react';

export default function AnalysisHeader(props) {
  return (
    <thead>
      <tr>
        <th className="text-center first-column">{props.categoryTitle}</th>
        <th className="text-center second-column">#Orders</th>
        <th className="text-center">$/Order</th>
        <th className="text-center">$/Hour</th>
        <th className="text-center">AveTime</th>
        <th className="text-center">AveDist</th>
        <th className="text-center">$/Mile</th>
        <th className="text-center">AveWait</th>
      </tr>
    </thead>
  );
}