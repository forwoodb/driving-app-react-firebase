import React, {Component} from 'react';

import TableSelect from './TableSelect.js';
import {SelectHeader} from './Location.js';
import Platform from './Platform.js';
import Time from './Time.js';
import Location from './Location.js';
import Area from './Area.js';
import Day from './Day.js';
import LocationInput from './LocationInput.js';
import AreaInput from './AreaInput.js';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';
import AnalysisTimeInput from './AnalysisTimeInput';

export default class AnalysisSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: this.props.orders,
      locations: [],
      areas: [],
      location: '',
      area: '',
      days: [],
      day: '',
      times: this.props.times,
      timeFrom: '',
      timeTo: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleTimeFromChange = this.handleTimeFromChange.bind(this);
    this.handleTimeToChange = this.handleTimeToChange.bind(this);

  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value,
    })
  }

  handleAreaChange(e) {
    this.setState({
      area: e.target.value,
    })
  }

  handlePlatformChange(e) {
    this.setState({
      platform: e.target.value,
    })
  }

  handleDayChange(e) {
    this.setState({
      day: e.target.value,
    })
  }

  handleTimeFromChange(e) {
    this.setState({
      timeFrom: e.target.value,
    })
  }

  handleTimeToChange(e) {
    this.setState({
      timeTo: e.target.value,
    })
  }

  render() {

    let orders = this.props.orders;
    let location = this.state.location;
    let area = this.state.area;
    let platform = this.state.platform;
    let day = this.state.day;
    let timeFrom = this.state.timeFrom;
    // let locations = orders.map(order => order.location);
    // locations = [...new Set(locations)].sort();

    if (location) {
      orders = orders.filter(order => order.location === location);
      console.log(orders);
    }

    if (area) {
      orders = orders.filter(order => order.area === area);
    }

    if (platform === 'All') {
      orders = this.props.orders;
    } else if (platform) {
      orders = orders.filter(order => order.platform === platform);
    }

    if (day === 'All') {
      orders = this.props.orders;
    } else if (day) {
      orders = orders.filter(order => order.date.includes(day));
    }

    if (timeFrom === 'All') {
      orders = this.props.orders;
    } else if (timeFrom >= "00:00:00" && timeFrom < "10:00:00") {
      orders = orders.filter((order) => order.startTime >= timeFrom && order.startTime < (this.state.timeTo || '0' + (parseInt(timeFrom) + 1) + ':00:00'));
    } else if (timeFrom >= "10:00:00") {
      orders = orders.filter(order => order.startTime >= timeFrom && order.startTime < (this.state.timeTo || parseInt(timeFrom) + 1 + ':00:00'));
    }

    return (
      <div>
        <h2>Select</h2>
        <form className="row mb-3">
          <div className="col-12 input-group-sm">
            <label htmlFor="location">Location</label>
            <LocationInput
              location={this.state.location}
              locations={this.props.locations}
              onChange={this.handleLocationChange}
            />
          </div>
          <div className="col-6 input-group-sm">
            <label htmlFor="area">Area</label>
            <AreaInput
              area={this.state.area}
              areas={this.props.areas}
              onChange={this.handleAreaChange}
            />
          </div>
          <div className="col-6 input-group-sm">
            <label htmlFor="platform">Platform</label>
            <select
              className="form-control"
              value={this.state.platform}
              onChange={this.handlePlatformChange}
            >
              <option>All</option>
              <option>DoorDash</option>
              <option>GrubHub</option>
              <option>UberEats</option>
            </select>
          </div>
          <div className="col input-group-sm">
            <label htmlFor="day">Day</label>
            <select
              className="form-control"
              value={this.state.day}
              onChange={this.handleDayChange}
            >
              <option>All</option>
              <option>Mon</option>
              <option>Tue</option>
              <option>Wed</option>
              <option>Thu</option>
              <option>Fri</option>
              <option>Sat</option>
              <option>Sun</option>
            </select>
          </div>
          <AnalysisTimeInput
            title="Start Time"
            value={this.state.timeFrom}
            onChange={this.handleTimeFromChange}
          />
          <AnalysisTimeInput
            title="End Time"
            value={this.state.timeTo}
            onChange={this.handleTimeToChange}
          />
        </form>
        <AnalysisTable
          tableData={
            <AnalysisData
              user={this.props.user}
              numberOrders={orders.length}
              averageTime={this.props.averageTime(orders)}
              averageDistance={this.props.averageDistance(orders)}
              dollarOrder={this.props.dollarOrder(orders)}
              dollarHour={this.props.dollarHour(orders)}
              dollarMile={this.props.dollarMile(orders)}
            />
          }
        />
        <TableSelect
          orders={orders}
          averageTime={this.props.averageTime}
          averageDistance={this.props.averageDistance}
          dollarOrder={this.props.dollarOrder}
          dollarHour={this.props.dollarHour}
          dollarMile={this.props.dollarMile}
          areas={this.props.areas}
          locations={this.props.locations}
        />
      </div>
    );
  }
}

