import React, {Component} from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default class Time extends Component {
  renderTableData() {
    let times = [
      "00:00:00",
      "01:00:00",
      "02:00:00",
      "03:00:00",
      "04:00:00",
      "05:00:00",
      "06:00:00",
      "07:00:00",
      "08:00:00",
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "20:00:00",
      "21:00:00",
      "22:00:00",
      "23:00:00",
      "24:00:00",
    ]


    return times.map((time, index, times) => {
      let timeOrders = this.props.orders.filter(order => order.startTime >= time && order.startTime < times[index + 1])

      if (timeOrders.length > 0) {
        return (
          <AnalysisData
            user={this.props.user}
            key={index}
            category={time}
            numberOrders={timeOrders.length}
            dollarOrder={this.props.dollarOrder(timeOrders)}
            dollarHour={this.props.dollarHour(timeOrders)}
            averageTime={this.props.averageTime(timeOrders)}
            averageDistance={this.props.averageDistance(timeOrders)}
            dollarMile={this.props.dollarMile(timeOrders)}
          />
        );
      }
    })
  }

  render() {

    return (
      <AnalysisTable
        categoryTitle="Time"
        tableData={this.renderTableData()}
      />
    );
  }
}