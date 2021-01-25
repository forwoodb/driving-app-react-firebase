import React, {Component} from 'react';

export default class AnalysisTimeInput extends Component {
  render() {
    return (
      <div className="col input-group-sm">
        <label htmlFor="timeFrom">{this.props.title}</label>
        <select
          className="form-control"
          value={this.props.value}
          onChange={this.props.onChange}
        >
          <option>All</option>
          <option>00:00:00</option>
          <option>01:00:00</option>
          <option>02:00:00</option>
          <option>03:00:00</option>
          <option>04:00:00</option>
          <option>05:00:00</option>
          <option>06:00:00</option>
          <option>07:00:00</option>
          <option>08:00:00</option>
          <option>09:00:00</option>
          <option>10:00:00</option>
          <option>11:00:00</option>
          <option>12:00:00</option>
          <option>13:00:00</option>
          <option>14:00:00</option>
          <option>15:00:00</option>
          <option>16:00:00</option>
          <option>17:00:00</option>
          <option>18:00:00</option>
          <option>19:00:00</option>
          <option>20:00:00</option>
          <option>21:00:00</option>
          <option>22:00:00</option>
          <option>23:00:00</option>
          <option>23:59:59</option>
        </select>
      </div>
    );
  }
}