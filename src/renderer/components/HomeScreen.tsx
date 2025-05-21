import React, { useState, useEffect } from "react";
import "./HomeScreen.css";
import SideNav from "./SideNav";

// Define subscription types
export type SubscriptionType = "FREE" | "LITE" | "PRO" | "PREMIUM";

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
  { label: "Images", color: "#2859FE", percentage: 40 },
  { label: "Documents", color: "#FFA411", percentage: 7 },
  { label: "Videos", color: "#F8D512", percentage: 10 },
  { label: "Audio", color: "#30D158", percentage: 13 },
  { label: "Others", color: "#585959", percentage: 21 },
  { label: "Free", color: "#000002", percentage: 9 },
];

/**
 * HomeScreen Component - Premium variant based on exact Figma design
 */
const HomeScreen: React.FC = () => {
  // State
  const [subscription, setSubscription] = useState<SubscriptionType>("PREMIUM");
  const [devices, setDevices] = useState<Device[]>([]);
  const [scheduledDeletes, setScheduledDeletes] = useState<ScheduledDelete[]>(
    []
  );
  const [activeNav, setActiveNav] = useState("Home");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          // Mock devices
          const mockDevices: Device[] = [
            {
              id: "1",
              name: "Device 1",
              email: "name@mail.com",
              type: "desktop",
            },
            {
              id: "2",
              name: "Device 2",
              email: "name@mail.com",
              type: "mobile",
            },
            {
              id: "3",
              name: "Device 3",
              email: "name@mail.com",
              type: "desktop",
            },
          ];

          // Mock scheduled deletes
          const mockScheduledDeletes: ScheduledDelete[] = [
            {
              id: "1",
              type: "Documents",
              formats: ".png, .jpg, .pdf",
              date: "25th September at 5:00 PM",
              paths: ["/path/to/file1.png", "/path/to/file2.jpg"],
            },
          ];

          setDevices(mockDevices);
          setScheduledDeletes(mockScheduledDeletes);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-[#07102E]">
      {/* Side Navigation */}
      <SideNav
        active={activeNav}
        onNavClick={setActiveNav}
        subscription={subscription}
      />

      {/* Main Content */}
      <div className="flex-1 ml-24">
        <div className="p-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <img
                src={`/assets/avatars/avatar-${subscription.toLowerCase()}.svg`}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white text-lg font-semibold">
                Ashish Sharma
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/assets/home/notification-icon.svg"
                  alt="Notifications"
                  className="w-6 h-6"
                />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold">Welcome Back,</h1>
            <h2 className="text-white text-4xl font-bold">Ashish Sharma</h2>
          </div>

          {/* Storage Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-semibold">Storage</h3>
              <div className="flex gap-4">
                {storageSegments.map((segment, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    ></div>
                    <span className="text-white/60 text-sm">
                      {segment.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-4 bg-[#050D28] rounded-lg overflow-hidden">
              {storageSegments.map((segment, idx) => (
                <div
                  key={idx}
                  className="h-full inline-block"
                  style={{
                    width: `${segment.percentage}%`,
                    backgroundColor: segment.color,
                    borderRadius:
                      idx === 0
                        ? "8px 0 0 8px"
                        : idx === storageSegments.length - 1
                        ? "0 8px 8px 0"
                        : "0",
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Content Box */}
          <div className="bg-[#050D28] rounded-xl p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                {/* Quick Actions */}
                <div className="flex gap-4 mb-8">
                  <button className="flex items-center gap-2 bg-[#2859FE] text-white px-6 py-3 rounded-lg">
                    <img
                      src="/assets/home/delete-now-icon.svg"
                      alt="Delete"
                      className="w-5 h-5"
                    />
                    <span>Delete Now</span>
                  </button>
                  <button className="flex items-center gap-2 bg-[#FFA411] text-white px-6 py-3 rounded-lg">
                    <img
                      src="/assets/home/schedule-delete-icon.svg"
                      alt="Schedule"
                      className="w-5 h-5"
                    />
                    <span>Schedule Delete</span>
                  </button>
                </div>

                {/* Devices Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-xl font-semibold">
                      Devices
                    </h3>
                    <button className="text-[#2859FE] text-sm">
                      Manage Devices
                    </button>
                  </div>
                  <div className="space-y-4">
                    {devices.map((device) => (
                      <div
                        key={device.id}
                        className="flex justify-between items-center p-4 bg-[#07102E] rounded-lg"
                      >
                        <div>
                          <h4 className="text-white font-semibold">
                            {device.name}
                          </h4>
                          <p className="text-white/60 text-sm">
                            {device.email}
                          </p>
                        </div>
                        <img
                          src="/assets/home/chevron-right.svg"
                          alt="View"
                          className="w-5 h-5"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scheduled Deletes Section */}
                {(subscription === "PRO" || subscription === "PREMIUM") && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white text-xl font-semibold">
                        Your Next Scheduled Delete
                      </h3>
                      <button className="text-[#2859FE] text-sm">
                        Manage Scheduled Deletes
                      </button>
                    </div>
                    <div className="space-y-4">
                      {scheduledDeletes.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-4 bg-[#07102E] rounded-lg"
                        >
                          <div>
                            <h4 className="text-white font-semibold">
                              {item.type}
                            </h4>
                            <p className="text-white/60 text-sm">
                              {item.formats}
                            </p>
                          </div>
                          <div className="text-white/60 text-sm">
                            {item.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Edit Setup Button */}
                <div className="mt-8 flex justify-center">
                  <button className="flex items-center gap-2 bg-[#07102E] text-white px-6 py-3 rounded-lg">
                    <img
                      src="/assets/home/edit-setup-icon.svg"
                      alt="Edit"
                      className="w-5 h-5"
                    />
                    <span>Edit LMN8 Set Up</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Subscription Switcher (for demo) */}
          <div className="fixed bottom-8 right-8 flex gap-2">
            {(["FREE", "LITE", "PRO", "PREMIUM"] as SubscriptionType[]).map(
              (type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded ${
                    subscription === type
                      ? "bg-[#2859FE] text-white"
                      : "bg-[#050D28] text-white/60"
                  } font-bold`}
                  onClick={() => setSubscription(type)}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
