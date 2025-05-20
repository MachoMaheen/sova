import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Card component following the LMN8 design system
 */
const Card: React.FC<CardProps> = ({
  children,
  title,
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div className={`bg-primary-light rounded-lg p-4 shadow ${className}`}>
      {(title || actionText) && (
        <div className="flex items-center justify-between mb-3">
          {title && <div className="text-white text-lg font-bold">{title}</div>}
          {actionText && (
            <button
              onClick={onAction}
              className="text-xs text-[#CAD1E6] font-bold px-2 py-1 rounded hover:bg-[#CAD1E6]/10 transition"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
