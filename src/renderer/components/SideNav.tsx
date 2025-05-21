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

  // Define navigation items with their availability based on subscription
  const navItems = [
    {
      label: "Home",
      icon: `/assets/navbar-${subscription.toLowerCase()}/icon-home-${subscription.toLowerCase()}${
        selected === "Home" ? "-active" : ""
      }.svg`,
      isAvailable: true, // available for all subscription types
    },
    {
      label: "Schedule",
      icon: `/assets/navbar-${subscription.toLowerCase()}/icon-schedule-${subscription.toLowerCase()}${
        selected === "Schedule" ? "-active" : ""
      }.svg`,
      isAvailable: subscription === "PRO" || subscription === "PREMIUM",
    },
    {
      label: "Devices",
      icon: `/assets/navbar-${subscription.toLowerCase()}/icon-devices-${subscription.toLowerCase()}${
        selected === "Devices" ? "-active" : ""
      }.svg`,
      isAvailable: subscription !== "FREE",
    },
    {
      label: "Account",
      icon: `/assets/navbar-${subscription.toLowerCase()}/icon-account-${subscription.toLowerCase()}${
        selected === "Account" ? "-active" : ""
      }.svg`,
      isAvailable: true, // available for all subscription types
    },
    {
      label: "Settings",
      icon: `/assets/navbar-${subscription.toLowerCase()}/icon-settings-${subscription.toLowerCase()}${
        selected === "Settings" ? "-active" : ""
      }.svg`,
      isAvailable: true, // available for all subscription types
    },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-24 bg-[#030714] flex flex-col items-center py-8 z-50 shadow-lg">
      <div className="mb-12">
        <div className="w-12 h-12 rounded-full border-2 border-[#CAD1E6] flex items-center justify-center overflow-hidden">
          <img
            src={`/assets/avatars/avatar-${subscription.toLowerCase()}.svg`}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/assets/avatars/avatar-premium.svg";
            }}
          />
        </div>
      </div>
      <ul className="flex flex-col gap-8 w-full items-center">
        {navItems.map((item) => (
          <li key={item.label} className="w-full flex flex-col items-center">
            <button
              className={`flex flex-col items-center w-full py-2 focus:outline-none transition ${
                selected === item.label ? "bg-[#101C43] rounded-xl" : ""
              } ${
                !item.isAvailable
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer hover:bg-[#101C43]/50"
              }`}
              onClick={() => item.isAvailable && handleClick(item.label)}
              disabled={!item.isAvailable}
            >
              <div className="w-7 h-7 mb-1 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-5 h-5"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/assets/navbar-premium/icon-${item.label.toLowerCase()}-premium${
                      selected === item.label ? "-active" : ""
                    }.svg`;
                  }}
                />
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
      <div className="mt-auto">
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="32" fill="black" />
          <path d="M18 25.5H22V38.5H31.5V42.5H18V25.5Z" fill="#00D36C" />
          <path d="M32 25.5H36V42.5H32V25.5Z" fill="#00D36C" />
          <path
            d="M37 25.5H46.5V29.5H41V32.5H46.5V36.5H41V42.5H37V25.5Z"
            fill="#00D36C"
          />
        </svg>
      </div>
    </nav>
  );
};

export default SideNav;
