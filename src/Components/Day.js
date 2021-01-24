import React, {Component} from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default class Day extends Component {
  renderTableData() {
    const orders = this.props.orders;

    let days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]


    return days.map((day, index) => {
      let dayOrders = this.props.orders.filter(order => order.date.includes(day));

      return (
        <AnalysisData
          user={this.props.user}
          key={index}
          category={day}
          numberOrders={dayOrders.length}
          dollarOrder={this.props.dollarOrder(dayOrders)}
          dollarHour={this.props.dollarHour(dayOrders)}
          averageTime={this.props.averageTime(dayOrders)}
          averageDistance={this.props.averageDistance(dayOrders)}
          dollarMile={this.props.dollarMile(dayOrders)}
        />
      );
    })
  }

  render() {

    return (
      <AnalysisTable
        categoryTitle="Day"
        tableData={this.renderTableData()}
      />
    );
  }
}