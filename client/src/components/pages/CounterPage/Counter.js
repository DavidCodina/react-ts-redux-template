import React           from "react";
import { useSelector } from 'react-redux';
import { useActions }  from '../../../redux'; 


/* =============================================================================

============================================================================= */


export const Counter = (props) => {
  const { increment, decrement, reset  } = useActions();
  const counter = useSelector(state => state.counter);
  

  return (
    <div className="text-center">
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-outline-gray" onClick={() => decrement(10)}>Decrement</button>
        <button type="button" className="btn btn-outline-gray" onClick={() => reset()}>Reset</button>
        <button type="button" className="btn btn-outline-gray" onClick={() => increment(10)}>Increment</button>
      </div>

      <div className="text-center text-gray" style={{ fontSize: 32 }}>{counter.value}</div>
    </div>
  );
};