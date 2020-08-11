import React, {Component} from 'react';

export default class Location extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
        <tbody>
        {
          this.props.locations.map((location, index) => {
            let locationOrders = this.props.orders.filter(order => order.location === location);
            // let platform = orders.filter(order => order.platform);

            return (
              <AnalysisLocation
                user={this.props.user}
                key={index}
                location={location}
                numberOrders={locationOrders.length}
                averageTime={this.props.averageTime(locationOrders)}
                averageDistance={this.props.averageDistance(locationOrders)}
                dollarOrder={this.props.dollarOrder(locationOrders)}
                dollarHour={this.props.dollarHour(locationOrders)}
                dollarMile={this.props.dollarMile(locationOrders)}
              />
            );
          }).sort((x,y) => {
            return y.props.dollarHour - x.props.dollarHour;
          })
        }
        </tbody>
      </table>
    );
  }
}

export function LocationHeader() {
  return (
    <thead>
      <tr>
        <th>Location</th>
        <th>Platform</th>
        <th># of Orders</th>
        <th>Average Time</th>
        <th>Average Distance</th>
        <th>$/Order</th>
        <th>$/Hour</th>
        <th>$/Mile</th>
      </tr>
    </thead>
  );
}

function AnalysisLocation(props) {
  return (
    <tr>
      <td className="text-center">{props.location}</td>
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