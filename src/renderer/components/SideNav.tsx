import React, { useState } from "react";
import { SubscriptionType } from "./HomeScreen";

interface SideNavProps {
  active?: string;
  onNavClick?: (label: string) => void;
  subscription?: SubscriptionType;
}

/**
 * SideNav Component that adapts based on subscription type
 */
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

  // Define navigation items with their icon paths based on subscription
  const getIconPath = (name: string, isActive: boolean) => {
    const subLower = subscription.toLowerCase();
    const activeStr = isActive ? "-active" : "";
    return `/assets/navbar-${subLower}/icon-${name.toLowerCase()}${activeStr}.svg`;
  };

  // Define navigation items
  const navItems = [
    { 
      label: "Home", 
      isAvailable: true // available for all subscription types
    },
    { 
      label: "Schedule", 
      isAvailable: subscription === "PRO" || subscription === "PREMIUM" 
    },
    { 
      label: "Devices", 
      isAvailable: subscription !== "FREE"
    },
    { 
      label: "Account", 
      isAvailable: true // available for all subscription types
    },
    { 
      label: "Settings", 
      isAvailable: true // available for all subscription types
    },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-24 bg-[#030714] flex flex-col items-center py-8 z-50 shadow-lg">
      <div className="mb-12">
        <div className="w-12 h-12 rounded-full border-2 border-[#CAD1E6] flex items-center justify-center overflow-hidden">
          <span className="text-white font-bold text-lg">AS</span>
        </div>
      </div>
      <ul className="flex flex-col gap-8 w-full items-center">
        {navItems.map((item) => (
          <li key={item.label} className="w-full flex flex-col items-center">
            <button
              className={`flex flex-col items-center w-full py-2 focus:outline-none ${
                selected === item.label ? "bg-[#101C43] rounded-xl" : ""
              } ${!item.isAvailable ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => item.isAvailable && handleClick(item.label)}
              disabled={!item.isAvailable}
            >
              {/* Fallback to text if image fails to load */}
              <div className="w-7 h-7 mb-1 flex items-center justify-center">
                {item.label.charAt(0)}
              </div>
              <span
                className={`text-xs font-semibold ${
                  selected === item.label ? "text-white" : "text-[#CAD1E6]"
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

