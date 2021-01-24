import React, {Component} from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default class Platform extends Component {

  renderTableData() {
    const orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();


    return platforms.map((platform, index) => {
      let platformOrders = this.props.orders.filter(order => order.platform === platform);

      return (
        <AnalysisData
          user={this.props.user}
          key={index}
          category={platform}
          numberOrders={platformOrders.length}
          averageTime={this.props.averageTime(platformOrders)}
          averageDistance={this.props.averageDistance(platformOrders)}
          dollarOrder={this.props.dollarOrder(platformOrders)}
          dollarHour={this.props.dollarHour(platformOrders)}
          dollarMile={this.props.dollarMile(platformOrders)}
        />
      )
    })
  }

  render() {
    return (
      <AnalysisTable
        categoryTitle="Platform"
        tableData={this.renderTableData()}
      />
    );
  }
}