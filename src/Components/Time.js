import React from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default function Time(props) {
  const renderTableData = () => {
    let times = []

    const addTimes = (num, range) => {
      for (var i = 0; i < range; i++) {
        // const time = `0${i}:00:00`
        times.push(`${num}${i}:00:00`)
      }
    }

    addTimes(0, 10)
    addTimes(1, 10)
    addTimes(2, 5)

    return (
      times.map((time, index, times) => {
        let timeOrders = props.orders.filter(order => order.startTime >= time && order.startTime < times[index + 1])

        if (timeOrders.length > 0) {
          return (
            <AnalysisData
              user={props.user}
              key={index}
              category={time}
              numberOrders={timeOrders.length}
              dollarOrder={props.dollarOrder(timeOrders)}
              dollarHour={props.dollarHour(timeOrders)}
              averageTime={props.averageTime(timeOrders)}
              averageDistance={props.averageDistance(timeOrders)}
              dollarMile={props.dollarMile(timeOrders)}
              // averageWait={props.averageWait(timeOrders)}
            />
          );
        } else {
          return false;
        }
      })
    )
  }

  return (
    <AnalysisTable
      categoryTitle="Time"
      tableData={renderTableData()}
    />
  );
}