import { useState } from "react";
import PostServiceForm from "./PostServiceForm";
import PostServicePreview from "./PostServicePreview";

function PostServiceTab() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Civil works");
  const [description, setDescription] = useState("");

  const [quoteOnly, setQuoteOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [unit, setUnit] = useState("/project");

  const [status, setStatus] = useState("Made to order");
  const [leadTime, setLeadTime] = useState("");
  const [moq, setMoq] = useState("");
  const [buyNow, setBuyNow] = useState(true);

  const [published, setPublished] = useState(false);

  const isValid =
    name.trim() !== "" &&
    description.trim() !== "" &&
    (quoteOnly || minPrice.trim() !== "") &&
    leadTime.trim() !== "";

  const handlePublish = () => {
    if (!isValid) return;
    setPublished(true);
  };

  return (
    <>
      <div className="bh-content-row">
        <PostServiceForm
          name={name}
          setName={(v) => {
            setName(v);
            setPublished(false);
          }}
          category={category}
          setCategory={(v) => {
            setCategory(v);
            setPublished(false);
          }}
          description={description}
          setDescription={(v) => {
            setDescription(v);
            setPublished(false);
          }}
          quoteOnly={quoteOnly}
          setQuoteOnly={(v) => {
            setQuoteOnly(v);
            setPublished(false);
          }}
          minPrice={minPrice}
          setMinPrice={(v) => {
            setMinPrice(v);
            setPublished(false);
          }}
          maxPrice={maxPrice}
          setMaxPrice={(v) => {
            setMaxPrice(v);
            setPublished(false);
          }}
          unit={unit}
          setUnit={(v) => {
            setUnit(v);
            setPublished(false);
          }}
          status={status}
          setStatus={(v) => {
            setStatus(v);
            setPublished(false);
          }}
          leadTime={leadTime}
          setLeadTime={(v) => {
            setLeadTime(v);
            setPublished(false);
          }}
          moq={moq}
          setMoq={(v) => {
            setMoq(v);
            setPublished(false);
          }}
          buyNow={buyNow}
          setBuyNow={(v) => {
            setBuyNow(v);
            setPublished(false);
          }}
        />
        <PostServicePreview
          name={name}
          category={category}
          description={description}
          quoteOnly={quoteOnly}
          minPrice={minPrice}
          maxPrice={maxPrice}
          unit={unit}
          leadTime={leadTime}
          status={status}
          buyNow={buyNow}
        />
      </div>

      <div className="bh-publish-bar">
        {published ? (
          <div className="small fw-semibold text-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            Published to your storefront.
          </div>
        ) : (
          <div className="small text-muted">
            Listings appear on your verified storefront immediately.
          </div>
        )}
        <button
          type="button"
          className="btn bh-publish-btn"
          disabled={!isValid}
          onClick={handlePublish}
        >
          <i className="bi bi-cloud-upload me-2"></i>
          Publish to storefront
        </button>
      </div>
    </>
  );
}

export default PostServiceTab;