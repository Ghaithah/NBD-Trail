import { useState } from "react";

const CATEGORIES = [
  "Civil works",
  "Glazing",
  "MEP",
  "Concrete",
  "Joinery",
  "Project management",
  "Service",
  "Custom",
];

const UNITS = ["/project", "/unit", "/tonne", "/m²", "/hour", "/day", "/month"];

const DESCRIPTION_MAX = 600;

function PostServiceForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Civil works");
  const [description, setDescription] = useState("");

  const [quoteOnly, setQuoteOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [unit, setUnit] = useState("/project");

  return (
    <div className="bh-form-col">
      <div className="bh-card mb-4">
        <div className="bh-card-title">
          <i className="bi bi-tag"></i>
          About this service
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold">Name *</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Curtain wall glazing — unitised systems"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold">Category *</label>
          <div className="d-flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`bh-pill ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label small fw-semibold mb-0">Description *</label>
            <span className="small text-muted">
              {description.length}/{DESCRIPTION_MAX}
            </span>
          </div>
          <textarea
            className="form-control"
            rows={4}
            maxLength={DESCRIPTION_MAX}
            placeholder="What's included, scope, certifications, typical project size. Buyers see this on your storefront."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="bh-card mb-4">
        <div className="bh-card-title">
          <i className="bi bi-currency-exchange"></i>
          Pricing
        </div>

        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <div className="fw-semibold small">Quote-only listing</div>
            <div className="small text-muted">
              Hide pricing — buyers must request a quote. Best for services with high
              scope variance.
            </div>
          </div>
          <label className="bh-switch">
            <input
              type="checkbox"
              checked={quoteOnly}
              onChange={(e) => setQuoteOnly(e.target.checked)}
            />
            <span className="bh-switch-slider"></span>
          </label>
        </div>

        {!quoteOnly && (
          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label small fw-semibold">Min price (AED) *</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 2,400"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">Max price (AED)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 2,800"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        )}

        <div>
          <label className="form-label small fw-semibold">Unit</label>
          <div className="d-flex gap-2 flex-wrap">
            {UNITS.map((u) => (
              <button
                key={u}
                type="button"
                className={`bh-pill ${unit === u ? "active" : ""}`}
                onClick={() => setUnit(u)}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bh-card text-muted small">
        Availability &amp; terms card comes in the next step.
      </div>
    </div>
  );
}

export default PostServiceForm;