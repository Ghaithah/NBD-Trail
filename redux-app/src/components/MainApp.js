import { useEffect } from "react";
import DataAction from "./DataAction";
import DataView from "./Dataview";
import { useDispatch } from "react-redux";
import { loadUsers } from "../redux/counterSlice";

function MainApp() {
  const dispatch=useDispatch()
 
  useEffect(()=>{
    dispatch(loadUsers())
  },[])
  return (
    <div>
      <DataView />
      <hr />
      <DataAction />
    </div>
  );
}

export default MainApp;