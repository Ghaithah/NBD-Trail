import { useState } from "react";
import PostRFQForm from "./PostRFQForm";
import PostRFQPreview from "./PostRFQPreview";

function PostRFQTab() {
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState("Construction");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);

  const [deliveryEmirate, setDeliveryEmirate] = useState("Dubai");
  const [needDeliveryBy, setNeedDeliveryBy] = useState("");
  const [rfqClosesOn, setRfqClosesOn] = useState("");

  const [minBudget, setMinBudget] = useState("");
  const [financing, setFinancing] = useState(false);

  const [verifiedOnly, setVerifiedOnly] = useState(true);

  const [posted, setPosted] = useState(false);

  const isValid =
    title.trim() !== "" &&
    sector.trim() !== "" &&
    description.trim() !== "" &&
    deliveryEmirate.trim() !== "" &&
    needDeliveryBy.trim() !== "" &&
    rfqClosesOn.trim() !== "" &&
    minBudget.toString().trim() !== "";

  const wrap = (setter) => (v) => {
    setter(v);
    setPosted(false);
  };

  const handlePost = () => {
    if (!isValid) return;
    setPosted(true);
  };

  return (
    <div className="bh-content-row">
      <div className="bh-form-stack">
        <PostRFQForm
          title={title}
          setTitle={wrap(setTitle)}
          sector={sector}
          setSector={wrap(setSector)}
          description={description}
          setDescription={wrap(setDescription)}
          attachments={attachments}
          setAttachments={wrap(setAttachments)}
          deliveryEmirate={deliveryEmirate}
          setDeliveryEmirate={wrap(setDeliveryEmirate)}
          needDeliveryBy={needDeliveryBy}
          setNeedDeliveryBy={wrap(setNeedDeliveryBy)}
          rfqClosesOn={rfqClosesOn}
          setRfqClosesOn={wrap(setRfqClosesOn)}
          minBudget={minBudget}
          setMinBudget={wrap(setMinBudget)}
          financing={financing}
          setFinancing={wrap(setFinancing)}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={wrap(setVerifiedOnly)}
        />

        <div className="bh-publish-bar">
          {posted ? (
            <div className="small fw-semibold text-success">
              <i className="bi bi-check-circle-fill me-2"></i>
              RFQ posted. Matching suppliers will be notified.
            </div>
          ) : (
            <div className="small text-muted">
              By posting, you agree to SME Connect's Marketplace terms.
            </div>
          )}
          <button
            type="button"
            className="btn bh-publish-btn"
            disabled={!isValid}
            onClick={handlePost}
          >
            Post RFQ
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>

      <PostRFQPreview sector={sector} deliveryEmirate={deliveryEmirate} />
    </div>
  );
}

export default PostRFQTab;