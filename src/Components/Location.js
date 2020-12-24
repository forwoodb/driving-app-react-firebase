import React, {Component} from 'react';

export default class Location extends Component {
  render() {
    return (
      <div>
        <h1>Location</h1>
        <table className="table table-striped table-hover">
          <LocationHeader/>
          <tbody>
          {
            this.props.locations.map((location, index) => {
              let locationOrders = this.props.orders.filter(order => order.location === location);
              // let platform = orders.filter(order => order.platform);
              if (locationOrders.length > 0) {
                return (
                  <AnalysisLocation
                    user={this.props.user}
                    key={index}
                    location={location}
                    area={this.props.area}
                    platform={this.props.platform}
                    day={this.props.day}
                    numberOrders={locationOrders.length}
                    averageTime={this.props.averageTime(locationOrders)}
                    averageDistance={this.props.averageDistance(locationOrders)}
                    dollarOrder={this.props.dollarOrder(locationOrders)}
                    dollarHour={this.props.dollarHour(locationOrders)}
                    dollarMile={this.props.dollarMile(locationOrders)}
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

export function LocationHeader() {
  return (
    <thead>
      <tr>
        <th className="text-center">Location</th>
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

function AnalysisLocation(props) {
  return (
    <tr>
      <td className="text-center">{props.location}</td>
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