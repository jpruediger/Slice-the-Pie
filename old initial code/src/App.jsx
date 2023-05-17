
import React, { useRef, useEffect } from 'react';
import MyD3Component from "./MyD3Component.jsx";
import Data from "./data.jsx"
import './App.css';

// Data now appears right here and can be useable anywhere
console.log(Data)


/* App */
function App() {
    return (
        <div>
          <p>A bar chart! </p>
        
          <div  className="barChart">
            <MyD3Component data={[1,5,6,3]}/>
        </div>
        </div>
    )
}


/* add stuff for app here */


export default App;