import React from 'react';
import Platform from './Platform.js';
import Day from './Day.js';
import Time from './Time.js';
import Area from './Area.js';
import Location from './Location.js';

export default function Tables(props) {
  const orders = props.orders;
  const table = props.table;

  if (table === 'day') {
    return (
      <Day
        orders={orders}
        averageTime={props.averageTime}
        // averageWait={props.averageWait}
        averageDistance={props.averageDistance}
        dollarOrder={props.dollarOrder}
        dollarHour={props.dollarHour}
        dollarMile={props.dollarMile}
      />
    )
  } else if (table === 'time') {
    return (
      <Time
        orders={orders}
        averageTime={props.averageTime}
        // averageWait={props.averageWait}
        averageDistance={props.averageDistance}
        dollarOrder={props.dollarOrder}
        dollarHour={props.dollarHour}
        dollarMile={props.dollarMile}
      />
    )
  } else if (table === 'area') {
    return (
      <Area
        orders={orders}
        averageTime={props.averageTime}
        // averageWait={props.averageWait}
        averageDistance={props.averageDistance}
        dollarOrder={props.dollarOrder}
        dollarHour={props.dollarHour}
        dollarMile={props.dollarMile}
        areas={props.areas}
      />
    )
  } else if (table === 'location') {
    return (
      <Location
        orders={orders}
        averageTime={props.averageTime}
        // averageWait={props.averageWait}
        averageDistance={props.averageDistance}
        dollarOrder={props.dollarOrder}
        dollarHour={props.dollarHour}
        dollarMile={props.dollarMile}
        locations={props.locations}
      />
    )
  } else {
    return (
      <Platform
        orders={orders}
        numberOrders={orders.length}
        averageTime={props.averageTime}
        // averageWait={props.averageWait}
        averageDistance={props.averageDistance}
        dollarOrder={props.dollarOrder}
        dollarHour={props.dollarHour}
        dollarMile={props.dollarMile}
      />
    )
  }
}