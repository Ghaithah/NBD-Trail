import { useEffect, useRef, useState } from "react";

const SECTORS = [
  "Construction",
  "Retail",
  "F&B",
  "Logistics",
  "Tech",
  "Hospitality",
  "Manufacturing",
  "Professional Services",
];

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "Fujairah"];

const DESCRIPTION_MAX = 600;

const DOW = ["M", "T", "W", "T", "F", "S", "S"];

// Keys that would let a number input accept negative / exponent values
const BLOCKED_NUMBER_KEYS = ["-", "+", "e", "E"];

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromISODate(v) {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function isSameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDisplay(v) {
  const d = fromISODate(v);
  if (!d) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildMonthGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  // getDay(): 0=Sun..6=Sat -> shift so 0=Mon..6=Sun
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= totalDays; day++) cells.push(new Date(year, month, day));
  return cells;
}

function DateField({ label, required, value, onChange, placeholder, minDate }) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => fromISODate(value) || minDate || new Date());
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedDate = fromISODate(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDisabledDate = (d) => !!minDate && d < minDate;

  const goToMonth = (offset) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const canGoPrevMonth =
    !minDate ||
    viewDate.getFullYear() > minDate.getFullYear() ||
    (viewDate.getFullYear() === minDate.getFullYear() &&
      viewDate.getMonth() > minDate.getMonth());

  const pickDate = (d) => {
    if (isDisabledDate(d)) return;
    onChange(toISODate(d));
    setViewDate(d);
    setOpen(false);
  };

  const handleQuick = (days) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + days);
    pickDate(d);
  };

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bh-datefield" ref={wrapRef}>
      <label className="form-label small fw-semibold">
        {label}
        {required ? " *" : ""}
      </label>
      <button
        type="button"
        className="form-control bh-date-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value ? "" : "text-muted"}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <i className="bi bi-calendar3"></i>
      </button>

      {open && (
        <div className="bh-datepicker-popup">
          <div className="bh-datepicker-header">
            <button
              type="button"
              className="bh-datepicker-nav"
              onClick={() => canGoPrevMonth && goToMonth(-1)}
              disabled={!canGoPrevMonth}
              style={!canGoPrevMonth ? { opacity: 0.35, cursor: "not-allowed" } : undefined}
              aria-label="Previous month"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <span className="fw-semibold small">{monthLabel}</span>
            <button
              type="button"
              className="bh-datepicker-nav"
              onClick={() => goToMonth(1)}
              aria-label="Next month"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          <div className="bh-calendar-dow">
            {DOW.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="bh-calendar-grid">
            {buildMonthGrid(viewDate).map((d, i) =>
              d ? (
                <button
                  type="button"
                  key={i}
                  className={`bh-calendar-day ${
                    isSameDay(d, selectedDate) ? "selected" : ""
                  } ${isSameDay(d, today) ? "today" : ""} ${
                    isDisabledDate(d) ? "disabled" : ""
                  }`}
                  disabled={isDisabledDate(d)}
                  style={isDisabledDate(d) ? { color: "#d1d5db", cursor: "not-allowed" } : undefined}
                  onClick={() => pickDate(d)}
                >
                  {d.getDate()}
                </button>
              ) : (
                <span key={i} className="bh-calendar-day empty"></span>
              )
            )}
          </div>

          <div className="d-flex gap-2 mt-3">
            <button
              type="button"
              className="bh-quick-btn primary"
              onClick={() => handleQuick(0)}
              disabled={isDisabledDate(today)}
              style={isDisabledDate(today) ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            >
              Today
            </button>
            <button type="button" className="bh-quick-btn" onClick={() => handleQuick(7)}>
              +7 days
            </button>
            <button type="button" className="bh-quick-btn" onClick={() => handleQuick(30)}>
              +30 days
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PostRFQForm({
  title,
  setTitle,
  sector,
  setSector,
  description,
  setDescription,
  attachments,
  setAttachments,
  deliveryEmirate,
  setDeliveryEmirate,
  needDeliveryBy,
  setNeedDeliveryBy,
  rfqClosesOn,
  setRfqClosesOn,
  minBudget,
  setMinBudget,
  financing,
  setFinancing,
  verifiedOnly,
  setVerifiedOnly,
}) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []).map((f) => f.name);
    if (files.length) setAttachments([...attachments, ...files]);
    e.target.value = "";
  };

  // Min budget: never allow negative values (typed, pasted, or via spinner)
  const handleMinBudgetKeyDown = (e) => {
    if (BLOCKED_NUMBER_KEYS.includes(e.key)) e.preventDefault();
  };

  const handleMinBudgetChange = (e) => {
    const v = e.target.value;
    if (v === "") {
      setMinBudget("");
      return;
    }
    const n = Number(v);
    if (Number.isNaN(n) || n < 0) return;
    setMinBudget(v);
  };

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="bh-form-col">
      <div className="bh-card mb-4">
        <div className="bh-card-title">
          <span className="bh-card-icon">
            <i className="bi bi-chat-square-quote"></i>
          </span>
          What do you need?
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold">Title *</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Curtain wall glazing — Tower B, 4,200 m²"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold">Sector / category *</label>
          <div className="d-flex gap-2 flex-wrap">
            {SECTORS.map((s) => (
              <button
                key={s}
                type="button"
                className={`bh-pill ${sector === s ? "active" : ""}`}
                onClick={() => setSector(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label small fw-semibold mb-0">
              Description &amp; specifications *
            </label>
            <span className="small text-muted">
              {description.length}/{DESCRIPTION_MAX} characters
            </span>
          </div>
          <textarea
            className="form-control"
            rows={4}
            maxLength={DESCRIPTION_MAX}
            placeholder="Specs, volumes, standards, dimensions — the clearer, the better the quotes."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="form-label small fw-semibold">Attachments (optional)</label>
          <label className="bh-upload-box">
            <i className="bi bi-upload"></i>
            Add drawings, BOM, or spec sheets (PDF · DOCX · XLSX)
            <input
              type="file"
              multiple
              hidden
              onChange={handleFiles}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
          </label>
          {attachments.length > 0 && (
            <ul className="list-unstyled small text-muted mt-2 mb-0">
              {attachments.map((name, i) => (
                <li key={i}>
                  <i className="bi bi-paperclip me-1"></i>
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bh-card mb-4">
        <div className="bh-card-title">
          <span className="bh-card-icon">
            <i className="bi bi-calendar-event"></i>
          </span>
          Delivery &amp; timeline
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold">Delivery emirate *</label>
          <div className="d-flex gap-2 flex-wrap">
            {EMIRATES.map((em) => (
              <button
                key={em}
                type="button"
                className={`bh-pill ${deliveryEmirate === em ? "active" : ""}`}
                onClick={() => setDeliveryEmirate(em)}
              >
                <i className="bi bi-geo-alt me-1"></i>
                {em}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <DateField
              label="Need delivery by"
              required
              value={needDeliveryBy}
              onChange={setNeedDeliveryBy}
              placeholder="Select a date"
              minDate={tomorrow}
            />
          </div>
          <div className="col-md-6">
            <DateField
              label="RFQ closes on"
              required
              value={rfqClosesOn}
              onChange={setRfqClosesOn}
              placeholder="Select a date"
              minDate={tomorrow}
            />
          </div>
        </div>
      </div>

      <div className="bh-card mb-4">
        <div className="bh-card-title">
          <span className="bh-card-icon">
            <i className="bi bi-stars"></i>
          </span>
          Budget range
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold">Min (AED) *</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 50,000"
            min="0"
            inputMode="decimal"
            value={minBudget}
            onKeyDown={handleMinBudgetKeyDown}
            onChange={handleMinBudgetChange}
          />
        </div>

        <div className="bh-outline-box d-flex align-items-start gap-3">
          <label className="bh-switch flex-shrink-0">
            <input
              type="checkbox"
              checked={financing}
              onChange={(e) => setFinancing(e.target.checked)}
            />
            <span className="bh-switch-slider"></span>
          </label>
          <div>
            <div className="fw-semibold small">Enable Supply Chain Financing</div>
            <div className="small text-muted">
              Pre-approved working capital at deal acceptance. Fast disbursement once
              your RFQ is awarded.
            </div>
          </div>
        </div>
      </div>

      <div className="bh-card">
        <div className="bh-card-title">
          <span className="bh-card-icon">
            <i className="bi bi-people"></i>
          </span>
          Who can quote?
        </div>

        <div className="bh-inset-box d-flex align-items-start gap-3">
          <label className="bh-checkbox flex-shrink-0">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
            />
            <span className="bh-checkbox-box">
              <i className="bi bi-check-lg"></i>
            </span>
          </label>
          <div>
            <div className="fw-semibold small">Verified suppliers only</div>
            <div className="small text-muted">
              Only suppliers with Connect+ verification can submit quotes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRFQForm;