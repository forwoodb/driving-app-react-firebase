import React, {Component} from 'react';

export default class Day extends Component {
  render() {
    let days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]
    return (
      <div>
        <h4>Day</h4>
        <table className="table-sm table-striped table-hover table-responsive">
          <thead>
            <tr>
              <th className="text-center">Day</th>
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
              days.map((day, index) => {
                let dayOrders = this.props.orders.filter(order => order.date.includes(day));

                if (dayOrders.length > 0) {
                  return (
                    <AnalysisDay
                      user={this.props.user}
                      key={index}
                      day={day}
                      numberOrders={dayOrders.length}
                      averageTime={this.props.averageTime(dayOrders)}
                      averageDistance={this.props.averageDistance(dayOrders)}
                      dollarOrder={this.props.dollarOrder(dayOrders)}
                      dollarHour={this.props.dollarHour(dayOrders)}
                      dollarMile={this.props.dollarMile(dayOrders)}
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

function AnalysisDay(props) {
  return (
    <tr>
      <td className="text-center">{props.day}</td>
      <td className="text-center">{props.numberOrders}</td>
      <td className="text-center">{props.averageTime}</td>
      <td className="text-center">{props.averageDistance}</td>
      <td className="text-center">{props.dollarOrder}</td>
      <td className="text-center">{props.dollarHour}</td>
      <td className="text-center">{props.dollarMile}</td>
    </tr>
  );
}