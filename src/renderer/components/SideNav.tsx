import * as React from 'react';

const navItems = [
  { label: 'Home', icon: '/assets/navbar-premium/icon-home-premium-active.svg' },
  { label: 'Schedule', icon: '/assets/navbar-premium/icon-schedule-premium.svg' },
  { label: 'Devices', icon: '/assets/navbar-premium/icon-devices-premium.svg' },
  { label: 'Account', icon: '/assets/navbar-premium/icon-account-premium.svg' },
  { label: 'Settings', icon: '/assets/navbar-premium/icon-settings-premium.svg' },
];

const SideNav: React.FC<{ active?: string; onNavClick?: (label: string) => void }> = ({ active = 'Home', onNavClick }) => {
  const [selected, setSelected] = React.useState(active);

  const handleClick = (label: string) => {
    setSelected(label);
    if (onNavClick) onNavClick(label);
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-24 bg-black flex flex-col items-center py-8 z-50 shadow-lg">
      <div className="mb-12">
        <img src="/assets/avatars/avatar-premium.svg" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-[#CAD1E6]" />
      </div>
      <ul className="flex flex-col gap-8 w-full items-center">
        {navItems.map((item) => (
          <li key={item.label} className="w-full flex flex-col items-center">
            <button
              className={`flex flex-col items-center w-full py-2 focus:outline-none ${selected === item.label ? 'bg-[#101C43] rounded-xl' : ''}`}
              onClick={() => handleClick(item.label)}
            >
              <img src={item.icon} alt={item.label} className="w-7 h-7 mb-1" />
              <span className={`text-xs font-semibold ${selected === item.label ? 'text-white' : 'text-[#CAD1E6]/70'}`}>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav; 