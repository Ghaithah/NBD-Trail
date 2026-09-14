function Users({ udata, du }) {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {udata.map((data, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{data.uname}</td>
              <td>{data.email}</td>
              <td>{data.city}</td>
              <td>
                {" "}
                <button
                  onClick={() => du(data.uname)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;