import React, {Component} from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default class Location extends Component {
  renderTableData() {
    return this.props.locations.map((location, index) => {
      let locationOrders = this.props.orders.filter(order => order.location === location);
      if (locationOrders.length > 0) {
        return (
          <AnalysisData
            user={this.props.user}
            key={index}
            category={location}
            numberOrders={locationOrders.length}
            dollarOrder={this.props.dollarOrder(locationOrders)}
            dollarHour={this.props.dollarHour(locationOrders)}
            averageTime={this.props.averageTime(locationOrders)}
            averageDistance={this.props.averageDistance(locationOrders)}
            dollarMile={this.props.dollarMile(locationOrders)}
          />
        );
      } return false;
    }).sort((x,y) => {
      return y.props.dollarHour - x.props.dollarHour;
    })
  }

  render() {
    return (
      <AnalysisTable
        categoryTitle="Location"
        tableData={this.renderTableData()}
      />
    );
  }
}