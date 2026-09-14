import { useDispatch, useSelector } from "react-redux";

function DataView(){
  const appCount = useSelector((state) => state.ac.productQuantity);

  return (
    <div>
      <p>The Current Quantity is : {appCount}</p>
    </div>
  );
}

export default DataView;