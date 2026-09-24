const SECTOR_BASE_COUNTS = {
  Construction: 31,
  Retail: 22,
  "F&B": 18,
  Logistics: 26,
  Tech: 20,
  Hospitality: 17,
  Manufacturing: 29,
  "Professional Services": 15,
};

const EMIRATE_FACTOR = {
  Dubai: 1,
  "Abu Dhabi": 0.8,
  Sharjah: 0.6,
  Ajman: 0.4,
  RAK: 0.35,
  Fujairah: 0.3,
};

function PostRFQPreview({ sector, deliveryEmirate }) {
  const base = SECTOR_BASE_COUNTS[sector] || 20;
  const factor = EMIRATE_FACTOR[deliveryEmirate] ?? 0.5;
  const estimate = Math.max(3, Math.round(base * factor));

  return (
    <div className="bh-preview-col">
      <div className="bh-card bh-card-glow mb-4">
        <div className="bh-card-title small text-uppercase">
          <span className="bh-card-icon bh-card-icon-sm">
            <i className="bi bi-lightning-charge-fill"></i>
          </span>
          AI Match Preview
        </div>

        <div className="bh-match-number">~{estimate}</div>
        <p className="small text-muted mb-3">
          verified suppliers fit this brief in {deliveryEmirate}.
        </p>

        <ul className="list-unstyled small mb-0">
          <li className="mb-2">
            <i className="bi bi-patch-check-fill text-primary me-2"></i>
            Verified · Connect+ network
          </li>
          <li className="mb-2">
            <i className="bi bi-bar-chart-fill text-primary me-2"></i>
            {sector} specialists ranked by fit
          </li>
          <li>
            <i className="bi bi-clock-history text-primary me-2"></i>
            Most quotes arrive within 48 hrs
          </li>
        </ul>
      </div>

      <div className="bh-card">
        <div className="bh-card-title small text-uppercase">
          <span className="bh-card-icon bh-card-icon-sm bh-card-icon-warning">
            <i className="bi bi-lightbulb-fill"></i>
          </span>
          Tips for stronger quotes
        </div>
        <ul className="list-unstyled small mb-0">
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>
            Include exact specs, volumes, and delivery window.
          </li>
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>
            Attach BOM or drawings whenever possible.
          </li>
          <li>
            <i className="bi bi-check2-circle text-success me-2"></i>
            Set a realistic close date — 5–7 days yields best response.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PostRFQPreview;