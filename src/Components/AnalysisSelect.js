import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays'

import TableSelect from './TableSelect.js';
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
      startDate: '',
      endDate: '',
      times: this.props.times,
      timeFrom: '',
      timeTo: '',
    }
  }

  handleLocationChange = (e) => {
    this.setState({
      location: e.target.value,
    })
  }

  handleAreaChange = (e) => {
    this.setState({
      area: e.target.value,
    })
  }

  handlePlatformChange = (e) => {
    this.setState({
      platform: e.target.value,
    })
  }

  handleDayChange = (e) => {
    this.setState({
      day: e.target.value,
    })
  }

  handleTimeFromChange = (e) => {
    this.setState({
      timeFrom: e.target.value,
    })
  }

  handleTimeToChange = (e) => {
    this.setState({
      timeTo: e.target.value,
    })
  }

  handleChangeStartDate = (startDate) => {
    this.setState({
      startDate: startDate,
    })
  }

  handleChangeEndDate = (endDate) => {
    this.setState({
      endDate: endDate,
    })
  }

  render() {

    let orders = this.props.orders;
    let location = this.state.location;
    let area = this.state.area;
    let platform = this.state.platform;
    let day = this.state.day;
    let timeFrom = this.state.timeFrom;
    // let startDate = this.state.startDate;
    // let startDate = this.state.startDate.getDate();
    let startDate = new Date(this.state.startDate).toDateString();
    let endDate = new Date(this.state.endDate).toDateString();

    if (location) {
      orders = orders.filter(order => order.location === location);
    }

    if (area) {
      orders = orders.filter(order => order.area === area);
    }

    if (
        platform === 'DoorDash' ||
        platform === 'GrubHub' ||
        platform === 'UberEats'
      ) {
      orders = orders.filter(order => order.platform === platform);
    }

    if (
        day === 'Mon' ||
        day === 'Tue' ||
        day === 'Wed' ||
        day === 'Thu' ||
        day === 'Fri' ||
        day === 'Sat' ||
        day === 'Sun'
      ) {
      orders = orders.filter(order => order.date.includes(day));
    }

    if (timeFrom >= "00:00:00" && timeFrom < "10:00:00") {
      orders = orders.filter((order) => order.startTime >= timeFrom && order.startTime < (this.state.timeTo || '0' + (parseInt(timeFrom) + 1) + ':00:00'));
    } else if (timeFrom >= "10:00:00" && timeFrom <= "23:59:59") {
      orders = orders.filter(order => order.startTime >= timeFrom && order.startTime < (this.state.timeTo || parseInt(timeFrom) + 1 + ':00:00'));
    }

    if (startDate === 'Invalid Date' || startDate === 'Wed Dec 31 1969' || startDate === 'undefined') {
      orders = orders;
    } else if (startDate) {
      orders = orders.filter((order) => new Date(order.date) >= new Date(startDate))
    }

    if (endDate === 'Invalid Date' || endDate === 'Wed Dec 31 1969' || endDate === 'undefined') {
      orders = orders;
    } else if (endDate) {
      orders = orders.filter((order) => new Date(order.date) <= new Date(endDate))
    }


    console.log(orders.map((order) => {
      if (order.date >= order.date.includes(startDate)) {
        return order;
      }
    }));

    console.log(endDate);


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
          <div className="col input-group-sm">
            <label>Start Date</label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChangeStartDate}
            />
          </div>
          <div className="col input-group-sm">
            <label>End Date</label>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleChangeEndDate}
            />
          </div>
        </form>
        <AnalysisTable
          tableData={
            <AnalysisData
              user={this.props.user}
              numberOrders={orders.length}
              averageTime={this.props.averageTime(orders)}
              // averageWait={this.props.averageWait(orders)}
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
          // averageWait={this.props.averageWait}
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

