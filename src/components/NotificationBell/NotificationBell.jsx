import { useContext, useEffect } from "react";
import { RecipesContext } from "../../context/RecipesContextProvider";
import { FiBell } from "react-icons/fi";

export default function NotificationBell({ userId, onClick }) {
  const { notifications, getNotifications, markNotificationsAsRead } = useContext(RecipesContext);

  useEffect(() => {
    if (userId) getNotifications(userId);
  }, [userId]);

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  const handleClick = async (e) => {
    e.stopPropagation();
    await markNotificationsAsRead();
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} className="relative" aria-label="Notifications">
      <FiBell size={28} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
