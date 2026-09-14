function UserForm({ fd, hc, au }) {
  return (
    <form onSubmit={au}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
          value={fd.uname}
          onChange={hc}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={fd.email}
          onChange={hc}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter City"
          name="city"
          value={fd.city}
          onChange={hc}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={fd.password}
          onChange={hc}
          className="form-control"
        />
      </div>
      <button className="btn btn-suceess">
        <i className="bi bi-person-plus me-2"></i>
      </button>
    </form>
  );
}

export default UserForm;