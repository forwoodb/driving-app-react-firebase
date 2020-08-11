import React, {Component} from 'react';

// Components
import AnalysisSelect from './AnalysisSelect.js';

class Analysis extends Component {

  render() {
    let orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();

    let locations = orders.map(order => order.location);
    locations = [...new Set(locations)].sort();

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
    ]

    function averageTime(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.duration);
        }, 0)/data.length
      );
    }

    function averageDistance(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.distance);
        }, 0)/data.length
      );
    }

    function dollarOrder(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.earnings);
        }, 0)/data.length
      );
    }

    function dollarHour(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.earnings);
        }, 0)/data.length/averageTime(data) * 60
      );
    }

    function dollarMile(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.earnings);
        }, 0)/data.length/averageDistance(data)
      );
    }

    // console.log(orders);

    return (
      <div>
        <h1>Platform</h1>
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
              numberOrders={orders.length}
              averageTime={averageTime(orders).toFixed(2)}
              averageDistance={averageDistance(orders).toFixed(2)}
              dollarOrder={dollarOrder(orders).toFixed(2)}
              dollarHour={dollarHour(orders).toFixed(2)}
              dollarMile={dollarMile(orders).toFixed(2)}
            />
            {
              platforms.map((platform, index) => {
                let platformOrders = orders.filter(order => order.platform === platform);

                return (
                  <AnalysisPlatform
                    user={this.props.user}
                    key={index}
                    platform={platform}
                    numberOrders={platformOrders.length}
                    averageTime={averageTime(platformOrders).toFixed(2)}
                    averageDistance={averageDistance(platformOrders).toFixed(2)}
                    dollarOrder={dollarOrder(platformOrders).toFixed(2)}
                    dollarHour={dollarHour(platformOrders).toFixed(2)}
                    dollarMile={dollarMile(platformOrders).toFixed(2)}
                  />
                );
              })
            }
          </tbody>
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
          <tbody>
            <AnalysisSelect
              user={this.props.user}
              orders={this.props.orders}
            />
            {
              locations.map((location, index) => {
                let locationOrders = orders.filter(order => order.location === location);
                // let platform = orders.filter(order => order.platform);

                return (
                  <AnalysisLocation
                    user={this.props.user}
                    key={index}
                    location={location}
                    numberOrders={locationOrders.length}
                    averageTime={averageTime(locationOrders).toFixed(2)}
                    averageDistance={averageDistance(locationOrders).toFixed(2)}
                    dollarOrder={dollarOrder(locationOrders).toFixed(2)}
                    dollarHour={dollarHour(locationOrders).toFixed(2)}
                    dollarMile={dollarMile(locationOrders).toFixed(2)}
                  />
                );
              }).sort((x,y) => {
                return y.props.dollarHour - x.props.dollarHour;
              })
            }
          </tbody>
          <thead>
            <tr>
              <th>Time</th>
              <th># of Orders</th>
              <th>Average Time</th>
              <th>Average Distance</th>
              <th>$/Order</th>
              <th>$/Hour</th>
              <th>$/Mile</th>
            </tr>
          </thead>
          <tbody>
            {
              times.map((time, index, times) => {
                let timeOrders = orders.filter((order) => {
                  // console.log(order.startTime >= time && order.startTime < times[index + 1] || order.time >= time && order.time < times[index + 1]);
                  return (order.startTime >= time && order.startTime < times[index + 1]) || (order.time >= time && order.time < times[index + 1]);
                  // return order.startTime >= time && order.startTime < time[index + 1] || order.time >= time && order.time < time[index + 1];
                })
                return (
                  <AnalysisTime
                    user={this.props.user}
                    key={index}
                    time={time}
                    numberOrders={timeOrders.length}
                    averageTime={averageTime(timeOrders).toFixed(2)}
                    averageDistance={averageDistance(timeOrders).toFixed(2)}
                    dollarOrder={dollarOrder(timeOrders).toFixed(2)}
                    dollarHour={dollarHour(timeOrders).toFixed(2)}
                    dollarMile={dollarMile(timeOrders).toFixed(2)}
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

export default Analysis;