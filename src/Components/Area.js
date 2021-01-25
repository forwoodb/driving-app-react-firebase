import React, {Component} from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default class Area extends Component {
  renderTableData() {
    return this.props.areas.map((area, index) => {
      let areaOrders = this.props.orders.filter(order => order.area === area);
      if (areaOrders.length > 0) {
        return (
          <AnalysisData
            user={this.props.user}
            key={index}
            category={area}
            numberOrders={areaOrders.length}
            dollarOrder={this.props.dollarOrder(areaOrders)}
            dollarHour={this.props.dollarHour(areaOrders)}
            averageTime={this.props.averageTime(areaOrders)}
            averageDistance={this.props.averageDistance(areaOrders)}
            dollarMile={this.props.dollarMile(areaOrders)}
          />
        );
      }
    }).sort((x,y) => {
      return y.props.dollarHour - x.props.dollarHour;
    })
  }

  render() {
    return (
      <AnalysisTable
        categoryTitle="Area"
        tableData={this.renderTableData()}
      />
    );
  }
}