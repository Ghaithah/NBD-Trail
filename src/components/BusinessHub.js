import { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import "./BusinessHub.css";

function BusinessHub() {
  const [activeTab, setActiveTab] = useState("service");

  return (
    <div className="bh-app">
      <TopNavbar />
      <div className="bh-body">
        <Sidebar />
        <main className="bh-main">
          <PageHeader activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "service" ? (
            <div className="text-muted p-4 border rounded bg-white">
              "About this service" / Pricing / Availability cards come in the next steps.
            </div>
          ) : (
            <div className="text-muted p-4 border rounded bg-white">
              Post an RFQ form isn't part of this build yet.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default BusinessHub;