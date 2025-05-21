import React from "react";

interface StorageSegment {
  color: string;
  percentage: number;
  label: string;
}

interface StorageBarProps {
  segments: StorageSegment[];
  height?: number;
  className?: string;
}

/**
 * StorageBar component to visualize storage distribution
 */
const StorageBar: React.FC<StorageBarProps> = ({
  segments,
  height = 34,
  className = "",
}) => {
  // Validate segments
  const totalPercentage = segments.reduce(
    (sum, segment) => sum + segment.percentage,
    0
  );

  if (totalPercentage > 100) {
    console.warn("StorageBar: Total percentage exceeds 100%");
  }

  return (
    <div className="w-full space-y-4">
      {/* Storage bar */}
      <div
        className={`relative rounded-[10px] overflow-hidden ${className}`}
        style={{ height: `${height}px` }}
      >
        {segments.map((segment, idx) => {
          // Calculate left offset as percentage
          const left = segments
            .slice(0, idx)
            .reduce((acc, s) => acc + s.percentage, 0);

          // Determine border radius for first and last segments
          const borderRadius =
            idx === 0
              ? "10px 0 0 10px"
              : idx === segments.length - 1
              ? "0 10px 10px 0"
              : "0";

          return (
            <div
              key={`${segment.label}-${idx}`}
              className="absolute top-0 h-full"
              style={{
                left: `${left}%`,
                width: `${segment.percentage}%`,
                background: segment.color,
                borderRadius,
              }}
            />
          );
        })}
      </div>

      {/* Palette legend */}
      <div className="flex flex-row items-center gap-4 w-full flex-wrap">
        {segments.map((segment, idx) => (
          <div
            key={`legend-${segment.label}-${idx}`}
            className="flex flex-row items-center gap-1"
          >
            <span
              className="inline-block rounded-full"
              style={{ width: 10, height: 10, background: segment.color }}
            />
            <span className="text-white/80 text-base font-nunito">
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageBar;
