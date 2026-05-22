import React from 'react';

interface Props {
  id?: string;
  icon: string | React.ReactNode;
  title: string;
  badge?: string;
  action?: React.ReactNode;
}

const SectionHeader: React.FC<Props> = ({ id, icon, title, badge, action }) => (
  <div className="flex items-center justify-between mb-4" id={id}>
    <div className="flex items-center gap-2.5">
      <span aria-hidden="true">{icon}</span>
      <h2 className="text-base font-semibold text-gray-100">{title}</h2>
      {badge && (
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full font-medium">
          {badge}
        </span>
      )}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export default SectionHeader;
