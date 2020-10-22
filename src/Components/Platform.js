import React, {Component} from 'react';

export default class Platform extends Component {
  render() {
    let orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();

    return (
      <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text-center">Platform</th>
              <th className="text-center"># of Orders</th>
              <th className="text-center">Average Time</th>
              <th className="text-center">Average Distance</th>
              <th className="text-center">$/Order</th>
              <th className="text-center">$/Hour</th>
              <th className="text-center">$/Mile</th>
            </tr>
          </thead>
          <tbody>
            <AnalysisPlatform
              user={this.props.user}
              platform="All"
              numberOrders={this.props.numberOrders}
              averageTime={this.props.averageTime(orders)}
              averageDistance={this.props.averageDistance(orders)}
              dollarOrder={this.props.dollarOrder(orders)}
              dollarHour={this.props.dollarHour(orders)}
              dollarMile={this.props.dollarMile(orders)}
            />
            {
              platforms.map((platform, index) => {
                let platformOrders = this.props.orders.filter(order => order.platform === platform);

                return (
                  <AnalysisPlatform
                    user={this.props.user}
                    key={index}
                    platform={platform}
                    numberOrders={platformOrders.length}
                    averageTime={this.props.averageTime(platformOrders)}
                    averageDistance={this.props.averageDistance(platformOrders)}
                    dollarOrder={this.props.dollarOrder(platformOrders)}
                    dollarHour={this.props.dollarHour(platformOrders)}
                    dollarMile={this.props.dollarMile(platformOrders)}
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function AnalysisPlatform(props) {
  return (
    <tr>
      <td className="text-center">{props.platform}</td>
      <td className="text-center">{props.numberOrders}</td>
      <td className="text-center">{props.averageTime}</td>
      <td className="text-center">{props.averageDistance}</td>
      <td className="text-center">{props.dollarOrder}</td>
      <td className="text-center">{props.dollarHour}</td>
      <td className="text-center">{props.dollarMile}</td>
    </tr>
  );
}