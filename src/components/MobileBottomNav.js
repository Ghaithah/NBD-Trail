import { useCallback, useEffect, useRef, useState } from "react";
import "./MobileBottomNav.css";

/*
 * Mobile-only bottom navigation + "More" bottom sheet.
 * Visible at <= 768px; hidden on larger screens (see MobileBottomNav.css).
 *
 * Props (all optional):
 *   active      key of the highlighted tab (default "marketplace")
 *   onNavigate  (key) => void   called for every tab / More-tile tap
 *   onSignOut   () => void      called when "Sign out" is tapped
 */

const TABS = [
  { key: "home", label: "Home", icon: "bi-house" },
  { key: "network", label: "Network", icon: "bi-people" },
  { key: "ai", label: "AI", icon: "bi-stars", primary: true },
  { key: "marketplace", label: "Marketplace", icon: "bi-shop" },
];

const MORE_ITEMS = [
  { key: "insights", label: "Insights", icon: "bi-graph-up" },
  { key: "tools", label: "Tools", icon: "bi-tools" },
  { key: "saved", label: "Saved", icon: "bi-bookmark" },
  { key: "messages", label: "Messages", icon: "bi-chat-square" },
  { key: "mentorship", label: "Mentorship", icon: "bi-mortarboard" },
];

const DESKTOP_QUERY = "(min-width: 769px)";
const DISMISS_DISTANCE = 90; // px the sheet must be dragged down to close

function MobileBottomNav({ active = "marketplace", onNavigate, onSignOut }) {
  const [moreOpen, setMoreOpen] = useState(false);

  const moreBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const sheetRef = useRef(null);
  const wasOpen = useRef(false);
  const drag = useRef({ active: false, startY: 0, dy: 0 });

  const closeMore = useCallback(() => setMoreOpen(false), []);

  /* Escape closes, background scroll is locked while the sheet is open */
  useEffect(() => {
    if (!moreOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [moreOpen]);

  /* Focus: into the sheet on open, back to the More button on close */
  useEffect(() => {
    if (moreOpen) {
      wasOpen.current = true;
      const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      moreBtnRef.current?.focus();
    }
    return undefined;
  }, [moreOpen]);

  /* If the viewport grows past the mobile breakpoint, drop the sheet */
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => {
      if (e.matches) setMoreOpen(false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  /* Drag the grabber down to dismiss */
  const onDragStart = (e) => {
    drag.current = { active: true, startY: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    if (sheetRef.current) sheetRef.current.style.transition = "none";
  };

  const onDragMove = (e) => {
    if (!drag.current.active || !sheetRef.current) return;
    const dy = Math.max(0, e.clientY - drag.current.startY);
    drag.current.dy = dy;
    sheetRef.current.style.transform = `translateY(${dy}px)`;
  };

  const onDragEnd = () => {
    if (!drag.current.active) return;
    const { dy } = drag.current;
    drag.current = { active: false, startY: 0, dy: 0 };
    if (sheetRef.current) {
      sheetRef.current.style.transition = "";
      sheetRef.current.style.transform = "";
    }
    if (dy > DISMISS_DISTANCE) closeMore();
  };

  const navigate = (key) => {
    if (onNavigate) onNavigate(key);
  };

  const handleMoreItem = (key) => {
    navigate(key);
    closeMore();
  };

  const handleSignOut = () => {
    if (onSignOut) onSignOut();
    closeMore();
  };

  const moreActive = MORE_ITEMS.some((item) => item.key === active);

  return (
    <>
      <nav className="bh-mnav" aria-label="Primary">
        <ul className="bh-mnav-list">
          {TABS.map((tab) => {
            const isActive = tab.key === active;
            return (
              <li key={tab.key} className="bh-mnav-cell">
                <button
                  type="button"
                  className={
                    "bh-mnav-item" +
                    (tab.primary ? " bh-mnav-item--primary" : "") +
                    (isActive ? " active" : "")
                  }
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => navigate(tab.key)}
                >
                  {tab.primary ? (
                    <span className="bh-mnav-ai">
                      <i className={`bi ${tab.icon}`} aria-hidden="true"></i>
                    </span>
                  ) : (
                    <i className={`bi ${tab.icon} bh-mnav-icon`} aria-hidden="true"></i>
                  )}
                  <span className="bh-mnav-label">{tab.label}</span>
                </button>
              </li>
            );
          })}

          <li className="bh-mnav-cell">
            <button
              type="button"
              ref={moreBtnRef}
              className={"bh-mnav-item" + (moreActive ? " active" : "")}
              aria-haspopup="dialog"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(true)}
            >
              <i className="bi bi-list bh-mnav-icon" aria-hidden="true"></i>
              <span className="bh-mnav-label">More</span>
            </button>
          </li>
        </ul>
      </nav>

      <div
        className={"bh-more-backdrop" + (moreOpen ? " open" : "")}
        onClick={closeMore}
        aria-hidden="true"
      ></div>

      <div
        ref={sheetRef}
        className={"bh-more-sheet" + (moreOpen ? " open" : "")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bh-more-title"
        aria-hidden={!moreOpen}
      >
        <div
          className="bh-more-drag"
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <span className="bh-more-grabber"></span>
        </div>

        <div className="bh-more-head">
          <h2 id="bh-more-title" className="bh-more-title">
            More
          </h2>
          <button
            type="button"
            ref={closeBtnRef}
            className="bh-more-close"
            aria-label="Close menu"
            onClick={closeMore}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        <div className="bh-more-grid">
          {MORE_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={"bh-more-tile" + (item.key === active ? " active" : "")}
              onClick={() => handleMoreItem(item.key)}
            >
              <span className="bh-more-tile-icon">
                <i className={`bi ${item.icon}`} aria-hidden="true"></i>
              </span>
              <span className="bh-more-tile-label">{item.label}</span>
            </button>
          ))}
        </div>

        <button type="button" className="bh-more-signout" onClick={handleSignOut}>
          <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
          Sign out
        </button>
      </div>
    </>
  );
}

export default MobileBottomNav;