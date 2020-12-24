import React, {Component} from 'react';

export default class Time extends Component {
  render() {
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
    return (
      <div>
        <h1>Time</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text-center">Time</th>
              <th className="text-center"># of Orders</th>
              <th className="text-center">Average Time</th>
              <th className="text-center">Average Distance</th>
              <th className="text-center">$/Order</th>
              <th className="text-center">$/Hour</th>
              <th className="text-center">$/Mile</th>
            </tr>
          </thead>
          <tbody>
            {
              times.map((time, index, times) => {
                let timeOrders = this.props.orders.filter((order) => {
                  return (
                    (order.startTime >= time && order.startTime < times[index + 1])
                    ||
                    (order.time >= time && order.time < times[index + 1])
                  );
                })
                if (timeOrders.length > 0) {
                  return (
                    <AnalysisTime
                      user={this.props.user}
                      key={index}
                      time={time}
                      numberOrders={timeOrders.length}
                      averageTime={this.props.averageTime(timeOrders)}
                      averageDistance={this.props.averageDistance(timeOrders)}
                      dollarOrder={this.props.dollarOrder(timeOrders)}
                      dollarHour={this.props.dollarHour(timeOrders)}
                      dollarMile={this.props.dollarMile(timeOrders)}
                    />
                  );

                }
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function AnalysisTime(props) {
  return (
    <tr>
      <td className="text-center">{props.time}</td>
      <td className="text-center">{props.numberOrders}</td>
      <td className="text-center">{props.averageTime}</td>
      <td className="text-center">{props.averageDistance}</td>
      <td className="text-center">{props.dollarOrder}</td>
      <td className="text-center">{props.dollarHour}</td>
      <td className="text-center">{props.dollarMile}</td>
    </tr>
  );
}