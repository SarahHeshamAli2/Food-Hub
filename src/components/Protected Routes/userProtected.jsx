import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtected = ({children}) => {
    const {user,isLoaded,isSignedIn} = useUser();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLoaded){
            if(!isSignedIn){
                navigate("/login", { replace: true });
            }
            else if(user.id === import.meta.env.VITE_ADMIN_ID){
                navigate("/unauthorized", { replace: true });
            }
        }
    },[isLoaded, isSignedIn, user, navigate]);
    if(!isLoaded){
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    if(!isSignedIn || user.id === import.meta.env.VITE_ADMIN_ID){
        return null;
    }
    return (        
        <div>
            {children}
        </div>
    );
}

export default UserProtected;
