import React, {Component} from 'react';
import AnalysisHeader from './AnalysisHeader';

export default class AnalysisTable extends Component {


  render() {
    const categoryTitle = this.props.categoryTitle;

    return (
      <div className="table-responsive">
        <h4>{categoryTitle}</h4>
        <table className="table table-sm table-striped table-hover table-responsive">
          <AnalysisHeader categoryTitle={categoryTitle}/>
          <tbody>
            {this.props.tableData}
          </tbody>
        </table>
      </div>
    )
  }
}
