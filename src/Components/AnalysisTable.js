import React from 'react';
import AnalysisHeader from './AnalysisHeader';

export default function AnalysisTable(props) {
  const categoryTitle = props.categoryTitle;
  // console.log(props.user);
  return (
    <div className="table-responsive">
      <h4>{categoryTitle}</h4>
      <table className="table table-sm table-striped table-hover table-responsive">
        <AnalysisHeader categoryTitle={categoryTitle}/>
        <tbody>
          {props.tableData}
        </tbody>
      </table>
    </div>
  )
}
