import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  // Format numbers for readability
  const formattedValue =
    typeof value === "number" ? new Intl.NumberFormat().format(value) : value;

  return (
    <div className="bg-white shadow-md rounded-xl p-5 text-center border border-gray-200 hover:shadow-lg transition duration-300">
      <h4 className="text-2xl font-bold text-gray-900">{formattedValue}</h4>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  const stats = [
    { label: "Total Views", value: 10500 },
    { label: "Engagement Rate", value: "72%" },
    { label: "Active Users", value: 3200 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;

