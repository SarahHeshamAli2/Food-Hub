import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtected = ({children}) => {
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const {isLoaded, isSignedIn, user} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded) {
            if (isSignedIn) {
                if (user.id !== adminId) {
                    navigate("/unauthorized", { replace: true });
                }
            } else {
                navigate("/login", { replace: true });
            }
        }
    }, [isLoaded, isSignedIn, user, adminId, navigate]);

    if (!isLoaded) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    if (!isSignedIn || user.id !== adminId) {
        return null;
    }

    return (
        <div>
            {children}
        </div>
    );
}

export default AdminProtected;
