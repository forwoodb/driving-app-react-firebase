import React, {Component} from 'react';


export default class Platform extends Component {
  render() {
    return (
      <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Platform</th>
              <th># of Orders</th>
              <th>Average Time</th>
              <th>Average Distance</th>
              <th>$/Order</th>
              <th>$/Hour</th>
              <th>$/Mile</th>
            </tr>
          </thead>
          <tbody>
            <AnalysisPlatform
              user={this.props.user}
              platform="All"
              numberOrders={this.props.numberOrders}
              averageTime={this.props.averageTime(this.props.orders)}
              averageDistance={this.props.averageDistance(this.props.orders)}
              dollarOrder={this.props.dollarOrder(this.props.orders)}
              dollarHour={this.props.dollarHour(this.props.orders)}
              dollarMile={this.props.dollarMile(this.props.orders)}
            />
            {
              this.props.platforms.map((platform, index) => {
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