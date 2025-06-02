import { FiBell } from "react-icons/fi";

export default function UserNotification({count}) {


return <>
 <div className="relative inline-block cursor-pointer">
      <FiBell size={28} />
      
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
</>
}
