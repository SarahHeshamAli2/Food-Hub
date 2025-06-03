import { NavLink, Outlet } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaUtensils, FaInfoCircle } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';

export default function Profile() {
   const{user}= useUser()
   console.log(user);
   
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
     ${isActive ? 'bg-yellow-100 text-yellow-700 font-semibold' : 'hover:bg-gray-100 text-gray-600'}`;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4 bg-gray-50 p-6 gap-6">
      
      <aside className="bg-white rounded-2xl shadow-md p-6 space-y-6 md:col-span-1">

        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto overflow-hidden rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
            <img className='w-full  h-full '  src={user?.imageUrl} alt="profile image" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Hello {user?.firstName}!</h3>
          <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
   
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs text-gray-400 uppercase mb-2">Requests</h4>
            <nav className="space-y-2">
              <NavLink  to="accepted-requests" className={linkClass}>
                <FaCheckCircle /> Accepted Requests
              </NavLink>
              <NavLink to="rejected-requests" className={linkClass}>
                <FaTimesCircle /> Rejected Requests
              </NavLink>
            </nav>
          </div>

          <div>
            <h4 className="text-xs text-gray-400 uppercase mb-2">Recipes</h4>
            <nav className="space-y-2">
              <NavLink to="created-recipes" className={linkClass}>
                <FaUtensils /> Created Recipes
              </NavLink>
            </nav>
          </div>

      
        </div>
      </aside>

      <main className="bg-white rounded-2xl shadow-md p-6 md:col-span-3">
        <Outlet />
      </main>
    </div>
  );
}
