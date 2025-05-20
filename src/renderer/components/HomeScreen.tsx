import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Button from './Button';
import Card from './Card';
import StorageBar from './StorageBar';

// Define subscription types
export type SubscriptionType = 'FREE' | 'LITE' | 'PRO' | 'PREMIUM';

// Device type
interface Device {
  id: string;
  name: string;
  email: string;
  type: string;
}

// Scheduled delete type
interface ScheduledDelete {
  id: string;
  type: string;
  formats: string;
  date: string;
  paths: string[];
}

// Define storage segments for visualization
const storageSegments = [
  { label: 'Images', color: '#2859FE', percentage: 40 },
  { label: 'Documents', color: '#FFA411', percentage: 7 },
  { label: 'Videos', color: '#F8D512', percentage: 10 },
  { label: 'Audio', color: '#30D158', percentage: 13 },
  { label: 'Others', color: '#585959', percentage: 21 },
  { label: 'Free', color: '#000002', percentage: 9 },
];

/**
 * Empty states component matching Figma design
 */
const EmptyStates: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* No Devices Added */}
      <div className="bg-[#101C43] rounded-lg p-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-[#CAD1E6] rounded-full mb-4 flex items-center justify-center text-4xl text-[#101C43]">
          📱
        </div>
        <div className="text-white text-xl font-bold mb-2">
          No Devices Added
        </div>
        <div className="text-white/80 text-center mb-4">
          You haven't added any devices yet. Tap below to securely connect and manage your devices from one place.
        </div>
        <Button variant="outline" size="lg">
          Add Your First Device
        </Button>
      </div>

      {/* No Scheduled Deletes */}
      <div className="bg-[#101C43] rounded-lg p-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-[#CAD1E6] rounded-full mb-4 flex items-center justify-center text-4xl text-[#101C43]">
          🗑️
        </div>
        <div className="text-white text-xl font-bold mb-2">
          No Scheduled Deletes
        </div>
        <div className="text-white/80 text-center mb-4">
          You haven't scheduled any files or folders for deletion yet. Tap below to set up your first scheduled delete and keep your data secure.
        </div>
        <Button variant="outline" size="lg">
          Schedule a Delete
        </Button>
      </div>
    </div>
  );
};

/**
 * HomeScreen Component
 */
const HomeScreen: React.FC = () => {
  // State for subscription, devices, and scheduled deletes
  const [subscription, setSubscription] = useState<SubscriptionType>('PREMIUM');
  const [devices, setDevices] = useState<Device[]>([]);
  const [scheduledDeletes, setScheduledDeletes] = useState<ScheduledDelete[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  const [isLoading, setIsLoading] = useState(true);

  // Get subscription gradient based on type
  const getSubscriptionGradient = (type: SubscriptionType): string => {
    switch (type) {
      case 'PREMIUM':
        return 'from-[#093DCE] to-[#07102E]';
      case 'PRO':
        return 'from-[#00D36C] via-[#01B662] via-[#036F4C] via-[#053B3B] via-[#061C31] to-[#07102E]';
      case 'LITE':
        return 'from-[#173998] to-[#07102E]';
      case 'FREE':
      default:
        return 'from-[#0E477A] to-[#07102E]';
    }
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls to your Django backend
        // For now, simulate loading with a timeout and use mock data
        setTimeout(() => {
          // Mock devices
          const mockDevices: Device[] = [
            { id: '1', name: 'Device 1', email: 'device1@mail.com', type: 'desktop' },
            { id: '2', name: 'Device 2', email: 'device2@mail.com', type: 'mobile' },
            { id: '3', name: 'Device 3', email: 'device3@mail.com', type: 'desktop' },
          ];
          
          // Mock scheduled deletes
          const mockScheduledDeletes: ScheduledDelete[] = [
            {
              id: '1',
              type: 'Documents',
              formats: '.png, .jpg, .pdf',
              date: '25th September at 5:00 PM',
              paths: ['/path/to/file1.png', '/path/to/file2.jpg'],
            },
          ];
          
          setDevices(mockDevices);
          setScheduledDeletes(mockScheduledDeletes);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Feature availability based on subscription
  const canAccessMultipleDevices = subscription !== 'FREE';
  const canScheduleDelete = subscription === 'PRO' || subscription === 'PREMIUM';
  const canRemoteDelete = subscription === 'PREMIUM';

  // Top bar with notification icon and avatar
  const renderTopBar = () => (
    <div className="w-full max-w-3xl flex items-center justify-between mb-8 pt-8 px-2">
      <div className="flex items-center gap-4">
        <img
          src="/assets/avatar-premium.svg"
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-[#CAD1E6]"
        />
        <div className="text-white font-bold text-lg">Ashish Sharma</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <img
            src="/assets/notification-icon.svg"
            alt="Notifications"
            className="w-7 h-7"
          />
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

  // Storage section with bar and palette
  const renderStorageSection = () => (
    <div className="flex flex-row justify-between items-start w-full max-w-3xl gap-8 mb-8">
      {/* Storage label */}
      <div className="flex items-center">
        <span className="font-bold text-white text-3xl">
          Storage
        </span>
      </div>
      {/* Storage bar and palette */}
      <div className="flex-1">
        <StorageBar segments={storageSegments} />
      </div>
    </div>
  );

  // Devices section
  const renderDevices = () => (
    <Card 
      title="Devices" 
      actionText="Manage Devices" 
      onAction={() => console.log('Manage devices clicked')}
      className="mb-4"
    >
      <div className="space-y-2">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between bg-[#050D28] rounded-md px-4 py-2"
          >
            <div>
              <div className="text-white font-semibold">{device.name}</div>
              <div className="text-xs text-white/80">{device.email}</div>
            </div>
            <img
              src="/assets/chevron-right.svg"
              alt="Chevron"
              className="text-[#CAD1E6] w-5 h-5"
            />
          </div>
        ))}
      </div>
    </Card>
  );

  // Quick actions section
  const renderQuickActions = () => (
    <div className="flex gap-4 mb-4">
      <Button 
        variant="primary" 
        size="lg" 
        fullWidth 
        icon={<img src="/assets/delete-icon.svg" alt="Delete" className="w-5 h-5" />}
      >
        Delete Now
      </Button>
      {canScheduleDelete && (
        <Button 
          variant="secondary" 
          size="lg" 
          fullWidth 
          icon={<img src="/assets/schedule-icon.svg" alt="Schedule" className="w-5 h-5" />}
        >
          Schedule Delete
        </Button>
      )}
    </div>
  );

  // Scheduled deletes section
  const renderScheduledDeletes = () => (
    <Card 
      title="Your Next Scheduled Delete" 
      actionText="Manage Scheduled Deletes" 
      onAction={() => console.log('Manage scheduled deletes clicked')}
      className="mb-4"
    >
      {scheduledDeletes.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1 mb-2">
          <div className="text-white font-semibold">{item.type}</div>
          <div className="text-xs text-white/50">{item.formats}</div>
          <div className="text-xs text-white/80">{item.date}</div>
        </div>
      ))}
    </Card>
  );

  // Call-to-action buttons for different subscription levels
  const renderUpgradeCTA = () => (
    <div className="w-full flex justify-center mb-4">
      <Button variant="upgrade" size="lg">
        Upgrade to PRO
      </Button>
    </div>
  );

  const renderConfigureCTA = () => (
    <div className="w-full flex justify-center mb-4">
      <Button variant="danger" size="lg">
        Configure LMN8
      </Button>
    </div>
  );

  const renderEditSetupCTA = () => (
    <div className="w-full flex justify-center mb-4">
      <Button variant="primary" size="lg">
        Edit LMN8 Set Up
      </Button>
    </div>
  );
  );

  const renderEditSetupCTA = () => (
    <div className="w-full flex justify-center mb-4">
      <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow hover:from-yellow-500 transition">
        Edit LMN8 Set Up
      </button>
    </div>
  );

  // Plan badge
  const renderPlanBadge = () => {
    const badgeGradients = {
      'PREMIUM': 'bg-gradient-premium',
      'PRO': 'bg-gradient-pro',
      'LITE': 'bg-gradient-lite',
      'FREE': 'bg-gradient-free'
    };

    return (
      <div className={`absolute top-4 right-4 ${badgeGradients[subscription]} text-white px-4 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm`}>
        {subscription}
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex bg-gradient-to-br ${getSubscriptionGradient(subscription)}`}>
      <SideNav
        active={activeNav}
        onNavClick={setActiveNav}
        subscription={subscription}
      />
      
      <main className="flex-1 ml-24 flex flex-col items-center py-8 px-4 relative">
        <div className="w-full max-w-4xl bg-[#07102E] rounded-2xl p-8 flex flex-col items-center">
          {/* For demo/dev purposes - subscription switcher */}
          <div className="mb-6 flex gap-2">
            {(['FREE', 'LITE', 'PRO', 'PREMIUM'] as SubscriptionType[]).map(
              (type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded ${
                    subscription === type
                      ? 'bg-secondary text-white'
                      : 'bg-primary-light text-white/60'
                  } font-bold`}
                  onClick={() => setSubscription(type)}
                >
                  {type}
                </button>
              )
            )}
            <button
              className="px-4 py-2 rounded bg-purple-500 text-white font-bold"
              onClick={() => setIsEmpty(!isEmpty)}
            >
              {isEmpty ? "Show Content" : "Show Empty"}
            </button>
          </div>
          
          {renderPlanBadge()}
          {renderTopBar()}
          {renderWelcome()}
          {renderStorageSection()}
          
          <div className="w-full max-w-3xl bg-primary-dark rounded-xl p-6 mb-4 shadow flex flex-col items-center">
            <div className="w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary"></div>
                </div>
              ) : subscription === "FREE" ? (
                <div className="text-white text-center py-8 px-4">
                  <h3 className="text-xl font-bold mb-2">FREE Plan Features</h3>
                  <p className="mb-4">Secure deletion of files from this device only.</p>
                  <Button variant="upgrade" size="lg">Upgrade to unlock more features</Button>
                </div>
              ) : !isEmpty ? (
                <>
                  {renderQuickActions()}
                  {canAccessMultipleDevices && renderDevices()}
                  {canScheduleDelete && scheduledDeletes.length > 0 && renderScheduledDeletes()}
                  {subscription === "LITE" && renderUpgradeCTA()}
                  {subscription === "PRO" && renderConfigureCTA()}
                  {subscription === "PREMIUM" && renderEditSetupCTA()}
                </>
              ) : (
                <EmptyStates />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;