import { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import PostServiceTab from "./PostServiceTab";
import PostRFQTab from "./PostRFQTab";
import MobileBottomNav from "./MobileBottomNav";
import "./BusinessHub.css";

function BusinessHub() {
  const [activeTab, setActiveTab] = useState("service");
  const [activeNav, setActiveNav] = useState("marketplace");

  return (
    <div className="bh-app bh-app--mnav">
      <TopNavbar />
      <div className="bh-body">
        <Sidebar />
        <main className="bh-main">
          <PageHeader activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "service" ? <PostServiceTab /> : <PostRFQTab />}
        </main>
      </div>

      {/* Phones only (<= 768px): bottom tab bar + "More" sheet */}
      <MobileBottomNav active={activeNav} onNavigate={setActiveNav} />
    </div>
  );
}
      
export default BusinessHub;