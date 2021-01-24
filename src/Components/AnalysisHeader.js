import React, {Component} from 'react';

export default class AnalysisHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th className="text-center first-column">{this.props.categoryTitle}</th>
          <th className="text-center second-column">#Orders</th>
          <th className="text-center">$/Order</th>
          <th className="text-center">$/Hour</th>
          <th className="text-center">AveTime</th>
          <th className="text-center">AveDist</th>
          <th className="text-center">$/Mile</th>
        </tr>
      </thead>
    );
  }
}