import React from 'react';

export default function AreaInput(props) {
  return (
    <div className="input-group-sm">
      <input
        className="form-control"
        type="text" placeholder="Area"
        name="area"
        value={props.area} onChange={props.onChange}
        list="areas"
      />
      <datalist id="areas">
        {props.areas.sort().map((area, index) => {
          return <option key={index} value={area}/>
        })}
      </datalist>
    </div>
  );
}