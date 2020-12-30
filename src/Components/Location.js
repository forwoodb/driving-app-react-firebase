import React, {Component} from 'react';

export default class Location extends Component {
  render() {
    return (
      <div>
        <h3>Location</h3>
        <table className="table-sm table-striped table-hover table-responsive">
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
                    dollarOrder={this.props.dollarOrder(locationOrders)}
                    dollarHour={this.props.dollarHour(locationOrders)}
                    averageTime={this.props.averageTime(locationOrders)}
                    averageDistance={this.props.averageDistance(locationOrders)}
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
        <th className="text-center">#Orders</th>
        <th className="text-center">$/Order</th>
        <th className="text-center">$/Hour</th>
        <th className="text-center">AveTime</th>
        <th className="text-center">AveDist</th>
        <th className="text-center">$/Mile</th>
      </tr>
    </thead>
  );
}

function AnalysisLocation(props) {
  return (
    <tr>
      <td className="text-center">{props.location}</td>
      <td className="text-center">{props.numberOrders}</td>
      <td className="text-center">{props.dollarOrder}</td>
      <td className="text-center">{props.dollarHour}</td>
      <td className="text-center">{props.averageTime}</td>
      <td className="text-center">{props.averageDistance}</td>
      <td className="text-center">{props.dollarMile}</td>
    </tr>
  );
}