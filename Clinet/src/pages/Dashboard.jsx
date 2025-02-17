import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashSettings from '../components/DashSettings';
import DashHome from '../components/DashHome';
import DashInventory from '../components/DashInventory';
import DashGallery from '../components/DashGallery';
import DashAi from '../components/DashAi';
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('home');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6 ">
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {tab === 'home' && <DashHome />}
      {tab === 'profile' && <DashProfile />}
      {tab === 'settings' && <DashSettings />}
      {tab === 'gallery' && <DashGallery />}
      {tab === 'inventory' && <DashInventory />}
      {tab === 'ai' && <DashAi />}
      
    </div>
  );
}