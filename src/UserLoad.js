

function UserLoad(props){

    return (

        <div>
         {props.ud.map((rec)=>(
        <div>
            {rec.name} -- {rec.email}
        </div>
    ))}
  </div>
 
    )
}

export default UserLoad;