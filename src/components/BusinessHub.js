import { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import PostServiceTab from "./PostServiceTab";
import PostRFQTab from "./PostRFQTab";
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

          {activeTab === "service" ? <PostServiceTab /> : <PostRFQTab />}
        </main>
      </div>
    </div>
  );
}

export default BusinessHub;