import * as React from "react";
import { useState } from "react";

type SubscriptionType = "FREE" | "LITE" | "PRO" | "PREMIUM";

interface SideNavProps {
  active?: string;
  onNavClick?: (label: string) => void;
  subscription?: SubscriptionType;
}

const SideNav: React.FC<SideNavProps> = ({
  active = "Home",
  onNavClick,
  subscription = "PREMIUM",
}) => {
  const [selected, setSelected] = useState(active);

  const handleClick = (label: string) => {
    setSelected(label);
    if (onNavClick) onNavClick(label);
  };

  // Get the appropriate icon path based on subscription and whether the icon is active
  const getIconPath = (label: string) => {
    const isActive = selected === label;
    const subscriptionPath = subscription.toLowerCase();
    return `/assets/navbar-${subscriptionPath}/icon-${label.toLowerCase()}-${subscriptionPath}${
      isActive ? "-active" : ""
    }.svg`;
  };

  // Define navigation items
  const navItems = [
    { label: "Home", icon: getIconPath("home") },
    { label: "Schedule", icon: getIconPath("schedule") },
    { label: "Devices", icon: getIconPath("devices") },
    { label: "Account", icon: getIconPath("account") },
    { label: "Settings", icon: getIconPath("settings") },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-24 bg-black flex flex-col items-center py-8 z-50 shadow-lg">
      <div className="mb-12">
        <img
          src={`/assets/avatars/avatar-${subscription.toLowerCase()}.svg`}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-[#CAD1E6]"
        />
      </div>
      <ul className="flex flex-col gap-8 w-full items-center">
        {navItems.map((item) => (
          <li key={item.label} className="w-full flex flex-col items-center">
            <button
              className={`flex flex-col items-center w-full py-2 focus:outline-none ${
                selected === item.label ? "bg-[#101C43] rounded-xl" : ""
              }`}
              onClick={() => handleClick(item.label)}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-7 h-7 mb-1"
                onError={(e) => {
                  // Fallback to premium icon if the subscription-specific icon is not found
                  const target = e.target as HTMLImageElement;
                  target.src = `/assets/navbar-premium/icon-${item.label.toLowerCase()}-premium${
                    selected === item.label ? "-active" : ""
                  }.svg`;
                }}
              />
              <span
                className={`text-xs font-semibold ${
                  selected === item.label ? "text-white" : "text-[#CAD1E6]/70"
                }`}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
