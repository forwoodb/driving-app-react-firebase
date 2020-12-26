import React, {Component} from 'react';

export default class Area extends Component {
  render() {
    return (
      <div>
        <h1>Area</h1>
        <table className="table-sm table-striped table-hover table-responsive">
          <AreaHeader/>
          <tbody>
          {
            this.props.areas.map((area, index) => {
              let areaOrders = this.props.orders.filter(order => order.area === area);
              // let platform = orders.filter(order => order.platform);
              if (areaOrders.length > 0) {
                return (
                  <AnalysisArea
                    user={this.props.user}
                    key={index}
                    area={area}
                    platform={this.props.platform}
                    day={this.props.day}
                    numberOrders={areaOrders.length}
                    averageTime={this.props.averageTime(areaOrders)}
                    averageDistance={this.props.averageDistance(areaOrders)}
                    dollarOrder={this.props.dollarOrder(areaOrders)}
                    dollarHour={this.props.dollarHour(areaOrders)}
                    dollarMile={this.props.dollarMile(areaOrders)}
                  />
                );
              }
            }).sort((x,y) => {
              return y.props.dollarHour - x.props.dollarHour;
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export function AreaHeader() {
  return (
    <thead>
      <tr>
        <th className="text-center">Area</th>
        <th className="text-center">Platform</th>
        <th className="text-center">Day</th>
        <th className="text-center"># of Orders</th>
        <th className="text-center">Average Time</th>
        <th className="text-center">Average Distance</th>
        <th className="text-center">$/Order</th>
        <th className="text-center">$/Hour</th>
        <th className="text-center">$/Mile</th>
      </tr>
    </thead>
  );
}

function AnalysisArea(props) {
  return (
    <tr>
      <td className="text-center">{props.area}</td>
      <td className="text-center">{props.platform}</td>
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