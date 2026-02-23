import { FiUserCheck, FiUserX } from "react-icons/fi";
const StatusBadge = ({ status, usage = null }) => {
  let bgColor = "";
  let textColor = "";
  let icon = null;

  switch (status) {
    case "completed":
      bgColor = "bg-green-100 dark:bg-green-900/30";
      textColor = "text-green-800 dark:text-green-200";
      break;
    case "success":
      bgColor = "bg-green-100 dark:bg-green-900/30";
      textColor = "text-green-800 dark:text-green-200";
      break;
    case "pending":
      bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
      textColor = "text-yellow-800 dark:text-yellow-200";
      icon = usage === "user" ? <FiUserX className="mr-1" /> : null;
      break;
    case "declined" || "failed":
      bgColor = "bg-red-100 dark:bg-red-900/30";
      textColor = "text-red-800 dark:text-red-200";
      break;
    case "failed":
      bgColor = "bg-red-100 dark:bg-red-900/30";
      textColor = "text-red-800 dark:text-red-200";
      break;
    case "active":
      bgColor = "bg-green-100 dark:bg-green-900/30";
      textColor = "text-green-800 dark:text-green-200";
      icon = usage === "user" ? <FiUserCheck className="mr-1" /> : null;
      break;
    case "inactive":
      bgColor = "bg-red-100 dark:bg-red-900/30";
      textColor = "text-red-800  dark:text-red-200";
      break;
    case "deactivated":
      bgColor = "bg-red-100 dark:bg-red-900/30";
      textColor = "text-red-800 dark:text-red-200";
      icon = usage === "user" ? <FiUserX className="mr-1" /> : null;
      break;
    default:
      bgColor = "bg-gray-100 dark:bg-gray-700";
      textColor = "text-gray-800 dark:text-gray-200";
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {icon && icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
