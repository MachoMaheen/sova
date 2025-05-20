import * as React from 'react';
import { FaBell, FaChevronRight, FaUserCircle, FaHome, FaCalendarAlt, FaMobileAlt, FaUser, FaCog } from 'react-icons/fa';
import SideNav from './SideNav';

// Subscription types
type SubscriptionType = 'FREE' | 'LITE' | 'PRO' | 'PREMIUM';

const mockDevices = [
  { name: 'Device 1', email: 'device1@mail.com' },
  { name: 'Device 2', email: 'device2@mail.com' },
  { name: 'Device 3', email: 'device3@mail.com' },
];

const mockStorage = [
  { label: 'Images', color: 'bg-blue-600', icon: <FaUserCircle />, value: 20 },
  { label: 'Audio', color: 'bg-green-500', icon: <FaUserCircle />, value: 10 },
  { label: 'Documents', color: 'bg-yellow-400', icon: <FaUserCircle />, value: 30 },
  { label: 'Videos', color: 'bg-gray-600', icon: <FaUserCircle />, value: 15 },
  { label: 'Others', color: 'bg-lime-500', icon: <FaUserCircle />, value: 5 },
  { label: 'Free', color: 'bg-black', icon: <FaUserCircle />, value: 20 },
];

const mockScheduledDeletes = [
  { type: 'Documents', formats: '.png, .jpg, .pdf', date: '25th September at 5:00 PM' },
];

const storagePalette = [
  { label: 'Images', color: '#2859FE' },
  { label: 'Audio', color: '#30D158' },
  { label: 'Documents', color: '#FFA411' },
  { label: 'Others', color: '#585959' },
  { label: 'Videos', color: '#F8D512' },
  { label: 'Free', color: '#000002' },
];

const storageBarSegments = [
  { color: '#2859FE', width: 266 }, // Images
  { color: '#FFA411', width: 45 }, // Documents
  { color: '#F8D512', width: 65 }, // Videos
  { color: '#30D158', width: 85 }, // Audio
  { color: '#585959', width: 143 }, // Others
  { color: '#000002', width: 61 }, // Free
];

const STORAGE_BAR_TOTAL = 665;

const HomeScreen: React.FC = () => {
  const [subscription, setSubscription] = React.useState<SubscriptionType>('PREMIUM');
  const isEmpty = subscription === 'PREMIUM' && false; // Set to true to show empty state
  const [activeNav, setActiveNav] = React.useState('Home');

  // Plan-specific feature toggles
  const showQuickActions = subscription !== 'FREE';
  const showDevices = subscription !== 'FREE';
  const showScheduledDeletes = subscription === 'PRO' || subscription === 'PREMIUM';
  const showUpgradeCTA = subscription === 'LITE';
  const showConfigureCTA = subscription === 'PRO';
  const showEditSetupCTA = subscription === 'PREMIUM';

  // Top bar (Figma: horizontal group, notification icon, avatar, name)
  const renderTopBar = () => (
    <div className="w-full max-w-3xl flex items-center justify-between mb-8 pt-8 px-2">
      <div className="flex items-center gap-4">
        <img src="/assets/avatars/avatar-premium.svg" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-[#CAD1E6]" />
        <div className="text-white font-bold text-lg">Ashish Sharma</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <img src="/assets/home/icon-notification.svg" alt="Notifications" className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );

  // Welcome message
  const renderWelcome = () => (
    <div className="w-full max-w-3xl text-left mb-4">
      <div className="text-white/80 text-lg">Welcome Back,</div>
      <div className="text-white text-2xl font-bold">Ashish Sharma</div>
    </div>
  );

  // Storage section
  const renderStorageSection = () => (
    <div className="flex flex-row justify-between items-start w-[811px] h-[72px] gap-8 mb-8">
      {/* Storage label */}
      <div className="flex items-center" style={{ width: 110, height: 50 }}>
        <span
          className="font-bold text-white"
          style={{ fontFamily: 'Nunito Sans', fontSize: 30, lineHeight: '50px' }}
        >
          Storage
        </span>
      </div>
      {/* Storage bar and palette */}
      <div className="flex flex-col items-start gap-4" style={{ width: 665 }}>
        {/* Storage bar */}
        <div className="relative w-[665px] h-[34px] rounded-[10px] overflow-hidden" style={{ background: '#2859FE' }}>
          {/* Segments */}
          {storageBarSegments.map((seg, idx) => {
            // Calculate left offset
            const left = storageBarSegments.slice(0, idx).reduce((acc, s) => acc + s.width, 0);
            const borderRadius = idx === 0 ? '10px 0 0 10px' : idx === storageBarSegments.length - 1 ? '0 10px 10px 0' : '0';
            return (
              <div
                key={seg.color}
                className="absolute top-0 h-[34px]"
                style={{
                  left,
                  width: seg.width,
                  background: seg.color,
                  borderRadius,
                }}
              />
            );
          })}
        </div>
        {/* Palette legend */}
        <div className="flex flex-row items-center gap-4 w-full">
          {storagePalette.map((item) => (
            <div key={item.label} className="flex flex-row items-center gap-1" style={{ minWidth: 44 }}>
              <span
                className="inline-block rounded-full"
                style={{ width: 10, height: 10, background: item.color }}
              />
              <span
                className="text-white/80 storage-legend-label"
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Devices
  const renderDevices = () => (
    <div className="bg-[#101C43] rounded-lg p-4 mb-4 shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="text-white text-lg font-bold">Devices</div>
        <button className="text-xs text-[#CAD1E6] font-bold px-2 py-1 rounded hover:bg-[#CAD1E6]/10 transition">Manage Devices</button>
      </div>
      <div className="space-y-2">
        {mockDevices.map((device, idx) => (
          <div key={idx} className="flex items-center justify-between bg-[#050D28] rounded-md px-4 py-2">
            <div>
              <div className="text-white font-semibold">{device.name}</div>
              <div className="text-xs text-white/80">{device.email}</div>
            </div>
            <FaChevronRight className="text-[#CAD1E6] text-lg" />
          </div>
        ))}
      </div>
    </div>
  );

  // Quick actions
  const renderQuickActions = () => (
    <div className="flex gap-4 mb-4">
      <button className="flex-1 bg-gradient-to-r from-green-400 to-green-700 text-white font-bold py-4 rounded-lg shadow hover:from-green-500 transition">Delete Now</button>
      <button className="flex-1 bg-[#E9F5FF] text-[#07102E] font-bold py-4 rounded-lg shadow hover:bg-white transition">Schedule Delete</button>
    </div>
  );

  // Scheduled deletes
  const renderScheduledDeletes = () => (
    <div className="bg-[#101C43] rounded-lg p-4 mb-4 shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="text-white text-lg font-bold">Your Next Scheduled Delete</div>
        <button className="text-xs text-[#CAD1E6] font-bold px-2 py-1 rounded hover:bg-[#CAD1E6]/10 transition">Manage Scheduled Deletes</button>
      </div>
      {mockScheduledDeletes.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1 mb-2">
          <div className="text-white font-semibold">{item.type}</div>
          <div className="text-xs text-white/50">{item.formats}</div>
          <div className="text-xs text-white/80">{item.date}</div>
        </div>
      ))}
    </div>
  );

  // CTAs
  const renderUpgradeCTA = () => (
    <div className="w-full max-w-3xl flex justify-center mb-4">
      <button className="bg-gradient-to-r from-blue-600 to-green-400 text-white font-bold px-8 py-3 rounded-lg shadow hover:from-blue-700 transition">Upgrade to PRO</button>
    </div>
  );
  const renderConfigureCTA = () => (
    <div className="w-full max-w-3xl flex justify-center mb-4">
      <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-8 py-3 rounded-lg shadow hover:from-pink-600 transition">Configure LMN8</button>
    </div>
  );
  const renderEditSetupCTA = () => (
    <div className="w-full max-w-3xl flex justify-center mb-4">
      <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow hover:from-yellow-500 transition">Edit LMN8 Set Up</button>
    </div>
  );

  // Empty states
  const renderEmptyStates = () => (
    <div className="space-y-6">
      <div className="bg-[#101C43] rounded-lg p-6 flex flex-col items-center shadow">
        {/* Placeholder for illustration */}
        <div className="w-20 h-20 bg-[#CAD1E6] rounded-full mb-4 flex items-center justify-center text-4xl text-[#101C43]">📱</div>
        <div className="text-white text-xl font-bold mb-2">No Devices Added</div>
        <div className="text-white/80 text-center mb-4">You haven't added any devices yet. Tap below to securely connect and manage your devices from one place.</div>
        <button className="bg-[#CAD1E6] text-[#101C43] font-bold py-2 px-6 rounded hover:bg-white transition">Add Your First Device</button>
      </div>
      <div className="bg-[#101C43] rounded-lg p-6 flex flex-col items-center shadow">
        {/* Placeholder for illustration */}
        <div className="w-20 h-20 bg-[#CAD1E6] rounded-full mb-4 flex items-center justify-center text-4xl text-[#101C43]">🗑️</div>
        <div className="text-white text-xl font-bold mb-2">No Scheduled Deletes</div>
        <div className="text-white/80 text-center mb-4">You haven't scheduled any files or folders for deletion yet. Tap below to set up your first scheduled delete and keep your data secure.</div>
        <button className="bg-[#CAD1E6] text-[#101C43] font-bold py-2 px-6 rounded hover:bg-white transition">Schedule a Delete</button>
      </div>
    </div>
  );

  // Plan badge
  const renderPlanBadge = () => (
    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-green-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
      {subscription}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#07102E] to-[#101C43]">
      <SideNav active={activeNav} onNavClick={setActiveNav} />
      <main className="flex-1 ml-24 flex flex-col items-center py-8 px-4 relative">
        <div className="w-full max-w-4xl bg-[#07102E] rounded-2xl p-8 flex flex-col items-center">
          {/* Plan switcher for demo */}
          <div className="mb-6 flex gap-2">
            {(['FREE', 'LITE', 'PRO', 'PREMIUM'] as SubscriptionType[]).map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded ${subscription === type ? 'bg-green-500 text-white' : 'bg-[#101C43] text-white/60'} font-bold`}
                onClick={() => setSubscription(type)}
              >
                {type}
              </button>
            ))}
          </div>
          {renderPlanBadge()}
          {renderTopBar()}
          {/* Storage section (Figma accurate) */}
          {renderStorageSection()}
          <div className="w-full max-w-3xl bg-[#050D28] rounded-xl p-6 mb-4 shadow flex flex-col items-center">
            <div className="w-full">
              {subscription === 'FREE' && (
                <div className="text-white text-center py-12">FREE plan: Basic features only. Upgrade to unlock more.</div>
              )}
              {showQuickActions && renderQuickActions()}
              {showDevices && renderDevices()}
              {showScheduledDeletes && renderScheduledDeletes()}
              {showUpgradeCTA && renderUpgradeCTA()}
              {showConfigureCTA && renderConfigureCTA()}
              {showEditSetupCTA && renderEditSetupCTA()}
              {subscription === 'PREMIUM' && isEmpty && renderEmptyStates()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen; 