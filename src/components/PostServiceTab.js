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

  return (
    <div className="bh-content-row">
      <PostServiceForm
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        quoteOnly={quoteOnly}
        setQuoteOnly={setQuoteOnly}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        unit={unit}
        setUnit={setUnit}
        status={status}
        setStatus={setStatus}
        leadTime={leadTime}
        setLeadTime={setLeadTime}
        moq={moq}
        setMoq={setMoq}
        buyNow={buyNow}
        setBuyNow={setBuyNow}
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
      />
    </div>
  );
}

export default PostServiceTab;