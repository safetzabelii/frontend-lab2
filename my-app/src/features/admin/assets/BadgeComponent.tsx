import React from 'react';

interface BadgeComponentProps {
  id: number;
}

const BadgeComponent: React.FC<BadgeComponentProps> = ({ id }) => {
  const idToBadgeMapping: Record<number, { style: string; text: string }> = {
    0: { style: 'bg-gray-500 text-gray-500', text: 'Order Not Selected' },
    1: { style: 'bg-blue-500 text-blue-800', text: 'Order Selected' },
    2: { style: 'bg-red-100 text-red-800', text: 'Order On Its Way' },
    3: { style: 'bg-green-100 text-green-800', text: 'Order Has Arrived' },
    4: { style: 'bg-yellow-100 text-yellow-800', text: 'Order Is Delivered' },
    // Add more mappings as needed
  };

  const badgeMapping = idToBadgeMapping[id];

  if (!badgeMapping) {
    return null; // Or display a default badge/error message
  }

  const { style, text } = badgeMapping;

  return (
    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:text-white ${style}`}>
      {text}
    </span>
  );
};

export default BadgeComponent;
