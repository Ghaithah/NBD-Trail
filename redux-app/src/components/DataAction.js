import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementBy2 } from "../redux/counterSlice";
function DataAction() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>INC</button>
      <button onClick={() => dispatch(decrement())}>DEC</button>
        <button onClick={() => dispatch(incrementBy2())}>INCBy2</button>
    </div>
  );
}

export default DataAction;
