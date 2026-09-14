import { useEffect, useState } from "react";
import axios from "axios";
import UserLoad from "./UserLoad";
const URL = "https://jsonplaceholder.typicode.com/users";
function LoadData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => res.data)
      .then((data) => {
        setData(data)
      });
  }, []);

  return (
  <div>

    <UserLoad ud={data}/>

 </div>
  );
}
export default LoadData