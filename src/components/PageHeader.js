const HEADER_COPY = {
  service: {
    title: "Add to your storefront. Get found by UAE buyers.",
    subtitle:
      "Your storefront is visible to verified UAE businesses on SME Connect. Add a service or product — buyers can request a quote or buy now if you make it standardized.",
  },
  rfq: {
    title: "Source it once. Get ranked quotes in minutes.",
    subtitle:
      "Post your requirement and SME Connect AI ranks up to 50 verified UAE suppliers by fit. Free for all UAE SMEs. Embedded financing available at acceptance.",
  },
};

function PageHeader({ activeTab, onTabChange }) {
  const copy = HEADER_COPY[activeTab] || HEADER_COPY.service;

  return (
    <div className="mb-4">
      <nav className="small text-muted mb-2">
        <span>Home</span> <i className="bi bi-chevron-right mx-1"></i>{" "}
        <span>New post</span>
      </nav>

      <h2 className="fw-bold mb-1">{copy.title}</h2>
      <p className="text-muted mb-4" style={{ maxWidth: 720 }}>
        {copy.subtitle}
      </p>

      <div className="d-flex gap-3 flex-wrap">
        <button
          type="button"
          className={`btn bh-tab-btn ${activeTab === "service" ? "active" : ""}`}
          onClick={() => onTabChange("service")}
        >
          <i className="bi bi-tag me-2"></i>
          <span className="text-start">
            <span className="d-block fw-semibold">Post a Service</span>
            <span className="d-block small">Promote to buyers</span>
          </span>
        </button>

        <button
          type="button"
          className={`btn bh-tab-btn ${activeTab === "rfq" ? "active" : ""}`}
          onClick={() => onTabChange("rfq")}
        >
          <i className="bi bi-file-earmark-text me-2"></i>
          <span className="text-start">
            <span className="d-block fw-semibold">Post an RFQ</span>
            <span className="d-block small">Get quotes from suppliers</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default PageHeader;