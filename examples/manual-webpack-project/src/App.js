import React, {useState} from "react"; // we need this now also in component files
import './index.css'

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return(
    <div className="container">
      Hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
    </div>
  )
}

export default App