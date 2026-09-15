function Sidebar() {
    return (
        <aside className="bh-sidebar">
            <nav>
                <ul className="list-unstyled mb-4">
                    <li className="bh-nav-item active">
                        <i className="bi bi-house me-2"></i> Home
                    </li>
                    <li className="bh-nav-item">
                        <i className="bi bi-diagram-3 me-2"></i> My Network
                        <span className="badge bg-light text-dark">12</span>
                    </li>
                    <li className="bh-nav-item">
                        <i className="bi bi-shop me-2"></i> Marketplace
                    </li>
                    <li className="bh-nav-item">
                        <i className="bi bi-tools me-2"></i> Tools
                        <span className="badge bg-success">NEW</span>
                    </li>
                    <li className="bh-nav-item">
                        <i className="bi bi-mortarboard me-2"></i> Mentorship Corner
                    </li>
                    <li className="bh-nav-item">
                        <i className="bi bi-stars me-2"></i> SME Connect AI
                        <span className="badge bg-primary">AI</span>
                    </li>
                    <li className="bh-nav-item">
                        <i className="bi bi-graph-up me-2"></i> Insights
                    </li>
                    <li className="bh-nav-item">
                        <i className="bi bi-chat-dots me-2"></i> Messages
                        <span className="badge bg-danger">3</span>
                    </li>
                </ul>
            </nav>

            <div className="card bh-strength-card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-semibold small">Profile strength</span>
                        <span className="fw-bold small">72%</span>
                    </div>
                    <div className="progress mb-3" style={{ height: 6 }}>
                        <div className="progress-bar bg-primary" style={{ width: "72%" }}></div>
                    </div>
                    <ul className="list-unstyled small mb-3">
                        <li className="text-success mb-1">
                            <i className="bi bi-check-circle-fill me-2"></i>Business verified
                        </li>
                        <li className="d-flex justify-content-between mb-1">
                            <span><i className="bi bi-circle me-2"></i>Add trade licence</span>
                            <span className="text-success">+15%</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span><i className="bi bi-circle me-2"></i>Connect bank account</span>
                            <span className="text-success">+13%</span>
                        </li>
                    </ul>
                    <button className="btn btn-primary w-100 btn-sm">Finish setup →</button>
                </div>
            </div>

            <div className="card bh-promo-card text-white border-0">
                <div className="card-body">
                    <div className="small text-uppercase mb-2">Powering</div>
                    <div className="fw-bold mb-2">UAE businesses</div>
                    <p className="small mb-3">Together we build stronger tomorrows</p>
                    <button type="button" className="btn btn-link p-0 small text-white text-decoration-underline">Learn more →</button>        </div>
            </div>
        </aside>
    );
}

export default Sidebar;