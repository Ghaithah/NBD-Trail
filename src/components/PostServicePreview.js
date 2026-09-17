function PostServicePreview({
  name,
  category,
  description,
  quoteOnly,
  minPrice,
  maxPrice,
  unit,
  leadTime,
  status,
  buyNow,
}) {
  const priceLabel = quoteOnly
    ? "By quote"
    : minPrice
    ? `AED ${minPrice}${maxPrice ? `–${maxPrice}` : ""} ${unit}`
    : `AED — ${unit}`;

  const tagLabel =
    quoteOnly || !minPrice ? "BY QUOTE" : buyNow ? "BUY NOW" : "REQUEST QUOTE";

  return (
    <div className="bh-preview-col">
      <div className="bh-card mb-4">
        <div className="bh-card-title small text-uppercase">
          <span className="bh-card-icon bh-card-icon-sm">
            <i className="bi bi-lightning-charge-fill"></i>
          </span>
          Live storefront preview
        </div>

        <div className="bh-preview-thumb mb-3">
          <i className="bi bi-image"></i>
        </div>

        <div className="d-flex gap-2 mb-2">
          <button type="button" className="badge bh-badge-soft bh-badge-btn">
            {tagLabel}
          </button>
          <button type="button" className="badge bh-badge-soft bh-badge-btn">
            {category.toUpperCase()}
          </button>
        </div>

        <div className="fw-bold mb-1 bh-clamp-2">{name || "Your service name"}</div>
        <p className="small text-muted mb-3 bh-clamp-2">
          {description || "Description will appear here as you type."}
        </p>

        <div className="fw-semibold mb-3 bh-clamp-2">{priceLabel}</div>

        <div className="d-flex gap-2 small">
          <div className="bh-stat-box">
            <div className="text-muted text-uppercase" style={{ fontSize: "0.65rem" }}>
              Lead time
            </div>
            <div className="text-truncate">{leadTime || "—"}</div>
          </div>
          <div className="bh-stat-box">
            <div className="text-muted text-uppercase" style={{ fontSize: "0.65rem" }}>
              Status
            </div>
            <div className="text-truncate">{status}</div>
          </div>
        </div>
      </div>

      <div className="bh-card mb-4">
        <div className="bh-card-title small text-uppercase">
          <span className="bh-card-icon bh-card-icon-sm bh-card-icon-warning">
            <i className="bi bi-lightbulb-fill"></i>
          </span>
          Tips for high-converting listings
        </div>
        <ul className="list-unstyled small mb-0">
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>
            Include certifications, sizing range, and references in the description.
          </li>
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>
            Buy-now SKUs convert 3.6x faster.
          </li>
          <li>
            <i className="bi bi-check2-circle text-success me-2"></i>
            Realistic lead times build trust and reduce back-and-forth.
          </li>
        </ul>
      </div>

      <div className="bh-card">
        <div className="bh-card-title small text-uppercase">
          <span className="bh-card-icon bh-card-icon-sm">
            <i className="bi bi-diagram-3-fill"></i>
          </span>
          What happens after publishing
        </div>
        <ol className="bh-steps small mb-0">
          <li>Your listing appears on your verified storefront.</li>
          <li>SME Connect AI surfaces it on matching buyer RFQs.</li>
          <li>Buyers request quotes or purchase directly.</li>
          <li>Embedded financing kicks in at deal acceptance.</li>
        </ol>
      </div>
    </div>
  );
}

export default PostServicePreview;