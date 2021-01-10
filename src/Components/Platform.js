import React, {Component} from 'react';

export default class Platform extends Component {
  render() {
    let orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();

    return (
      <div className="table-responsive">
        <h4>Platform</h4>
        <table className="table table-sm table-striped table-hover table-responsive">
          <thead>
            <tr>
              <th className="text-center first-column">Platform</th>
              <th className="text-center second-column">#Orders</th>
              <th className="text-center">$/Order</th>
              <th className="text-center">$/Hour</th>
              <th className="text-center">AveTime</th>
              <th className="text-center">AveDist</th>
              <th className="text-center">$/Mile</th>
            </tr>
          </thead>
          <tbody>
            <AnalysisPlatform
              user={this.props.user}
              platform="All"
              numberOrders={this.props.numberOrders}
              dollarOrder={this.props.dollarOrder(orders)}
              dollarHour={this.props.dollarHour(orders)}
              averageTime={this.props.averageTime(orders)}
              averageDistance={this.props.averageDistance(orders)}
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
      <td className="text-center first-column">{props.platform}</td>
      <td className="text-center second-column">{props.numberOrders}</td>
      <td className="text-center">{props.dollarOrder}</td>
      <td className="text-center">{props.dollarHour}</td>
      <td className="text-center">{props.averageTime}</td>
      <td className="text-center">{props.averageDistance}</td>
      <td className="text-center">{props.dollarMile}</td>
    </tr>
  );
}