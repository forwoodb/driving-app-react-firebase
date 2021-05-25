import React from 'react';

import AnalysisSelect from './AnalysisSelect.js';

const Analysis = (props) => {

  const total = (data, category) => {
    return (
      data.reduce(function(total, order) {
        if (isNaN(order[category])) {
          return order[category] = 0;
        }
        return total + (parseFloat(order[category]) || 0);
      }, 0)/data.length
    );
  }

  // const waitTime = (data) => {
  //   console.log(data);
  //   return (
  //     data.filter((order) => {
  //       if (order.waitTime) {
  //         return true
  //       } return false;
  //     }).map((order) => {
  //       return Number(order.waitTime);
  //     })
  //   );
  // }

  const averageTime = (data) => total(data, 'duration')
  const averageDistance = (data) => total(data, 'distance')
  // const averageWait = (data) => total(data, 'waitTime')
  const dollarOrder = (data) => total(data, 'earnings')
  const dollarHour = (data) => dollarOrder(data)/averageTime(data) * 60 || 0
  const dollarMile = (data) => dollarOrder(data)/averageDistance(data) || 0
  // const averageWait = (data) => {
  //   let waitTime = data.filter((order) => {
  //     if (order.waitTime) {
  //       return true
  //     } return false;
  //   }).map((order) => {
  //     return Number(order.waitTime);
  //   })
  //   return (
  //     waitTime.reduce(function(total, order) {
  //       return total + Number(order);
  //     }, 0)/waitTime.length
  //   );
  // }

  // console.log(averageDistance(7));
  
  let orders = props.orders;

  let days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]

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
    "24:00:00",
  ]
  // console.log(props.user);
  return (
    <div>
      <AnalysisSelect
        user={props.user}
        orders={orders}
        locations={props.locations}
        areas={props.areas}
        days={days}
        times={times}
        averageTime={(data) => averageTime(data).toFixed(2)}
        // averageWait={(data) => averageWait(data).toFixed(2)}
        averageDistance={(data) => averageDistance(data).toFixed(2)}
        dollarOrder={(data) => dollarOrder(data).toFixed(2)}
        dollarHour={(data) => dollarHour(data).toFixed(2)}
        dollarMile={(data) => dollarMile(data).toFixed(2)}
      />
    </div>
  );
}

export default Analysis;