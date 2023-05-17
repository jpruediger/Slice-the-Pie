import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
  }



  // color is #71A8FF
  checkExpensesCircle() {
    let style
    if (this.props.current_step >= 1) {
      style = {backgroundColor: "#71A8FF"}
    }
    else {
      style = {backgroundColor: "#999"}
    }
    return style
  }

   checkCompareCircle() {
    let style
    if (this.props.current_step >= 2) {
      style = {backgroundColor: "#71A8FF"}
    }
    else {
      style = {backgroundColor: "#999"}
    }
    return style
  }

  lineFill() {
    let style
    switch(this.props.current_step){
      case 0:
        style = {width: "0%"}
        break;
      case 1:
        style = {width: "50%"}
        break;
      case 2:
        style = {width: "90%"}
        break;
      case 3:
        style = {width: "90%"}
        break;
      default:
        style = {width: "0%"}
    }

    return style
  }
  

  render() {
    return (
      <div className = "progress-bar">

        <div className = "progressBarHeader">
          <div className = "progHeader"> REVENUES </div>
          <div className = "progHeader"> EXPENSES</div>
          <div className = "progHeader"> COMPARE </div>
        </div>
      
        <div className = "progress-container">
         <div className = "progress-fill" style={this.lineFill()}> </div>
          <div className = "circle"  style={{backgroundColor:"#71A8FF"}}> <i className = "revenueCircle"> </i></div>

          <div className = "circle" style={this.checkExpensesCircle()}><i className = "expensesCircle"> </i></div>

          <div className = "circle" style={this.checkCompareCircle()}><i className = "compareCircle"> </i></div>        
        </div>
      </div>
    )
  }  
}

export default ProgressBar;

