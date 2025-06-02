import { useState, useEffect } from "react";
import axios from "axios";
import { FiBell } from "react-icons/fi";
import { BASE_URL } from "../../services/api";

export default function NotificationBell({ userId, onClick }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/notifications?userId=${userId}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => n.status === "unread");

      await Promise.all(
        unreadNotifications.map((notification) =>
          axios.patch(`${BASE_URL}/notifications/${notification.id}`, {
            status: "read",
          })
        )
      );

      setNotifications((prev) =>
        prev.map((n) => (n.status === "unread" ? { ...n, status: "read" } : n))
      );
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  };

  const handleClick = async () => {
    await markAllAsRead();      
    onClick?.();               
  };

  return (
    <button
      onClick={handleClick}
      className="relative focus:outline-none"
      aria-label="Notifications"
    >
      <FiBell size={28} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
