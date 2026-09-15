import { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import PostServiceTab from "./PostServiceTab";
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
            <PostServiceTab />
          ) : (
            <div className="bh-card text-muted small">
              Post an RFQ form isn't part of this build yet.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default BusinessHub;