import React, {useState} from 'react';
import './App.css';
import ReactToolTip from 'react-tooltip'



const style_text_untouched = {color: "grey"}
const style_text_touched = {color: "white"}

const style_border_untouched = {border: "1px solid grey"}
const style_border_touched = {border: "1px solid white"}

// a box containing some controls 
function EntryBox (props) {

  let data = [...props.data]
  let tooltips = [...props.tooltipdata]


  // filter out empty portion, do not want
  let new_data = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].name !== '$empty') {
      new_data.push(data[i])
    }
  }

  let text = new_data.map(d => d.name)
  let colors = new_data.map(d => d.color)
  let current_values = new_data.map(d => d.value)

  // send data here, and also repack data properly to callback



  // build value arr object
  const [values, setValue] = useState(current_values)

  let total = values.reduce(sumArray)


  // report state back to parent with this function
  const callback = props.callback;


  
  // Build a list of DOM elements to paste onto the page
  // note: you can only attach an onClick function to a DOM element, not a React component
  let itemElems = [];
  let inputs = [];


  // helper code for array summation https://www.w3schools.com/jsref/jsref_reduce.asp
  function sumArray(total, num) {
    return parseInt(total) + parseInt(num);
  }

  // code for number input
  function adjustInput(event) {

    let index = parseInt(event.target.name)


    // get new number, letters are not accepted
    let new_number = parseInt(event.target.value)


    if (Number.isNaN(new_number) || new_number < 0) {
      new_number = 0
      event.target.value = new_number
    }


    // copy values for summation
    let temp_values = values
    
    // zero out previous number at current index to check
    // only new entry
    temp_values[index] = 0


    let current_sum = temp_values.reduce(sumArray)



    if (current_sum + new_number > 100) {
      new_number = 100 - current_sum
      event.target.value = new_number

    }
    
    // copy state, edit, and replace
    let new_state = values
    new_state[index] = new_number

    setValue(new_state)

    // calculate new total
    total = values.reduce(sumArray)
    // set its read only value in its element

    // TODO: RE-PACK DATA AND PASS
    packCallBack(new_state)
  }

  function packCallBack(new_state) {
    
    for (var i = 0; i < new_state.length; i++) {
      data[i].value = new_state[i]
    }

    callback(data)
  }

  function chooseTextStyle(num) {
    if (num === 0) {
      return style_text_untouched
    }
    else {
      return style_text_touched
    }
  }

  function chooseBorderStyle(num) {
    if (num === 0) {
      return style_border_untouched
    }
    else {
      return style_border_touched
    }
  }




  // code to build component
  // TODO: ADD OBJECT/CSS FOR TOOLTIP WITHIN THE DIV OR ON CSS
  for (let i=0; i<colors.length; i++) {
    itemElems.push(
      <li key={i}> 
      <div className = "buttonhold">
        <div className="colorbutton"  
          style={{backgroundColor: colors[i],
          }}

          onClick={function () {
            callback(colors[i]);
          }}>
        </div>
      </div>

      <div className="entrytext"> 
        {text[i]} 
        <div className="tooltip" data-tip={tooltips[i]}>
          ?
          <ReactToolTip/>
        </div>
      </div >
        
      </li>)


    // // need svg line below now..
    inputs.push(
      <li key={i}>
      <div className = "entryhold" style={chooseTextStyle(current_values[i])}>
        <div className="container">
          <input type="number" id="percentval" name={i} placeholder={current_values[i]} onChange={adjustInput}/>
          %
      </div>
        <div className="underline">
          <hr style={chooseBorderStyle(current_values[i])}></hr>
        </div>
        </div>
      </li>
    )
   }

  return(

    <div id="entryBoxes">
      <div id="funcandpercent">
      <div>
        Function
        </div>
        <div>
        Percentage (%)
        </div>
      </div>
      <div id="elementList">
        <ul className="pickColor"> {itemElems} </ul>
        <ul className="inputs"> {inputs} </ul>
      </div>
      <div className = "totalhold">
      <div className = "totalentryhold">
      <div className= "total">Total %</div>
        <div className = "totalentry">
        <div style={chooseTextStyle(total)}> 
          {total} %
        </div>
        
        <div className="underlineTotal">
          <hr style={chooseBorderStyle(total)}></hr>
        </div>
        </div>
        </div>
        </div>
    </div>
  )

}

// removed         <ul className="textInfo"> {textElems} </ul> from middle

// Value doesnt change, might be from this
// https://stackoverflow.com/questions/41736213/why-cant-i-change-my-input-value-in-react-even-with-the-onchange-listener



export default EntryBox;
