import React from 'react';

// Components
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

  const averageTime = (data) => total(data, 'duration')

  const averageDistance = (data) => total(data, 'distance')

  const dollarOrder = (data) => total(data, 'earnings')

  const dollarHour = (data) => dollarOrder(data)/averageTime(data) * 60 || 0

  const dollarMile = (data) => dollarOrder(data)/averageDistance(data) || 0

  const minMile = (data) => averageTime(data)/averageDistance(data)

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
        minMile={(data) => minMile(data).toFixed(2)}
        averageDistance={(data) => averageDistance(data).toFixed(2)}
        dollarOrder={(data) => dollarOrder(data).toFixed(2)}
        dollarHour={(data) => dollarHour(data).toFixed(2)}
        dollarMile={(data) => dollarMile(data).toFixed(2)}
      />
    </div>
  );
}

export default Analysis;