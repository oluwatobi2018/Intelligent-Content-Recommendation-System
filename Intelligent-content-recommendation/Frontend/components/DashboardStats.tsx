import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h4 className="text-xl font-bold">{value}</h4>
      <p className="text-gray-500">{label}</p>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  const stats = [
    { label: "Total Views", value: "10.5K" },
    { label: "Engagement Rate", value: "72%" },
    { label: "Active Users", value: "3.2K" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
