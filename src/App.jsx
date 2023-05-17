import React, { useRef, useEffect, useState } from 'react';
import PieChartRevenue from "./PieChartRevenue.jsx"
import PieChartExpenditure from "./PieChartExpenditure.jsx";
import ProgressBar from "./progressBar.jsx";
import Data from "./data.jsx"
import './App.css';






// Data now appears right here and can be useable anywhere
//console.log(Data)

let blank_rev_data = Data.blankRevenueData
let rev_data = Data.revenueData
let rev_tip = Data.revenueDescriptions

let blank_exp_data = Data.blankExpenditureData
let exp_data = Data.expenditureData
let exp_tip = Data.expenditureDescriptions



/* App */
function App() {


  // Setup state for conditional rendering
  const [state, changeState] = useState(0)

  
  function nextStep() { 
    if (state == 3) {
      // restart.. set state to zero
      changeState(0)
    }
    else {
      // add one
      changeState(state+1)
    }

  }

  // go back one, no error checking needed
  function previousStep() {
    changeState(state-1)

  }

  // Setup states for current entered revenue and expense data
  const [entered_rev_data, changeRevData] = useState(blank_rev_data)
  const [entered_exp_data, changeExpData] = useState(blank_exp_data)

  function replaceEnteredRev(new_data) {

    if (state === 0) {
      changeRevData(new_data)
    }
  }

  function replaceEnteredExp(new_data) {

    if (state === 1) {
      changeExpData(new_data)
    }
  }


  function renderBasedOnState(state) {

    // Enter Revenues Step
 
    if (state === 0) { 
      return (
        <div>
          <PieChartRevenue data={entered_rev_data} c_state={state} 
            callback={replaceEnteredRev} title={"UC Davis Revenues"}
            tooltipdesc={rev_tip} id={"pieChart"}/>
        
          <div style={{ marginTop: '20px' }}>  
            <button onClick={nextStep}> Next </button>  
          </div>   
        </div>
      )
    }

    // Enter Expenses Step
    else if (state === 1) {
      // this will render as all black for now
      return (
        <div>
          <PieChartExpenditure data={entered_exp_data} c_state={state} 
            callback={replaceEnteredExp} title={"UC Davis Expenditures"}
            tooltipdesc={exp_tip} id={"pieChart"}/>

          <div style={{ marginTop: '20px' }}>  
            <button id= "compareButton" onClick={nextStep}> Compare </button>  
          </div>   

          <div style={{ marginTop: '20px' }}>  
            <button id= "prevButton" onClick={previousStep}> Previous </button>  
          </div> 
        </div>
      )
    }

    // Compare Revenues Step
    else if (state === 2) {
      return (
        <div>
          <div className = "titlehold">
            RESULTS
          </div>
          <PieChartRevenue data={entered_rev_data} c_state={state} 
            callback={replaceEnteredRev} title={"Your Revenue Guess"}
            id={"pieChart1"}/>
          <PieChartRevenue data={rev_data} c_state={state} 
            callback={null} title={"Actual Revenue"} 
            id={"pieChart2"}/>      
        
        <div style={{ marginTop: '20px' }}>  
                <button onClick={nextStep}> Next </button>  
             </div>  
        </div>
      )
    }

    // Compare Expenses Step
    else if (state === 3) {
      return (
        <div>
        <div className = "titlehold">
          RESULTS
          </div>
          <PieChartExpenditure data={entered_exp_data} c_state={state}
            callback={replaceEnteredExp} title={"Your Expenses Guess"}
            id={"pieChart1"} />
          <PieChartExpenditure data={exp_data} c_state={state} 
            callback={replaceEnteredExp} title={"Actual Expenses"}
            id={"pieChart2"}/>

          <div style={{ marginTop: '20px' }}>  
                  <button onClick={nextStep}> Restart </button>  
          </div>  
        </div>
      )
    }

    // default case
    else {
      return (
        <div>
        </div>
      )
    }

  }

  return (
    
    <div>
      <h2>Slice the Pie</h2>
      <div id = "texthold">
      <div>
      Say you got to run the University. How much would you allocate to the different sections? Learn about your funding sources with a guessing game.
      </div>
      <div>
      You make your choices by inputting percentages of each section of a pie chart. See how well your choices match the ones the real Provost made.
      </div>
      </div>

    
      <ProgressBar current_step={state}/>
      
      {renderBasedOnState(state)}


      
    </div>
  )
}


export default App;