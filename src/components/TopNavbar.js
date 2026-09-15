function TopNavbar() {
  return (
    <header className="bh-topbar">
      <div className="d-flex align-items-center justify-content-between px-4 py-2">
        <div className="d-flex align-items-center">
          <i className="bi bi-hexagon-fill text-primary fs-4 me-2"></i>
          <div className="lh-1">
            <div className="fw-bold">Business Hub</div>
            <div className="small text-muted">by Emirates NBD</div>
          </div>
        </div>

        <div className="flex-grow-1 mx-4" style={{ maxWidth: 480 }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search RFQs, suppliers, tools..."
            />
          </div>
        </div>

        <div className="d-flex align-items-center">
          <button className="btn btn-light position-relative me-3">
            <i className="bi bi-bell"></i>
            <span className="bh-notif-dot"></span>
          </button>
          <div className="d-flex align-items-center border rounded-pill px-3 py-1">
            <span className="bh-org-avatar me-2">AF</span>
            <div className="lh-1 me-2">
              <div className="small fw-semibold">Al Falah Construction</div>
              <div className="small text-success">
                <i className="bi bi-patch-check-fill me-1"></i>Verified
              </div>
            </div>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;