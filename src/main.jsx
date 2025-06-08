import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'

import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react';
import { store } from './redux/store/store.js';
import { Provider } from 'react-redux';

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl='/'>
     <Provider store={store}>
      <App />
    </Provider>
  </ClerkProvider>
  </StrictMode>,
  
)


