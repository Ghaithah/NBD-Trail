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

const DESCRIPTION_MAX = 600;

function PostServiceForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Civil works");
  const [description, setDescription] = useState("");

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

      <div className="bh-card mb-4 text-muted small">
        Pricing card comes in the next step.
      </div>

      <div className="bh-card text-muted small">
        Availability &amp; terms card comes in the next step.
      </div>
    </div>
  );
}

export default PostServiceForm;