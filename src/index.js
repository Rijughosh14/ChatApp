import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App1 from './Alumini/App';
import App2 from './ChatApp/JS/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as process from 'process';
import Offline from './ChatApp/JS/Offline';
window.global = window;
window.process = process;
window.Buffer = [];

const root = ReactDOM.createRoot(document.getElementById('root'));
const setup = process.env.REACT_APP_SETUP

function Index() {
  const [status, setStatus] = useState(navigator.onLine ? 'online' : 'offline');

  useEffect(() => {
    function handleOnline() {
      setStatus('online');
    }

    function handleOffline() {
      setStatus('offline');
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <BrowserRouter>
    {/* { <React.StrictMode> */}
      <ThemeProvider>
        {status === 'online' ? (
          <>
            <ToastContainer position="top-center" />
            <App2 />
          </>
        ) : (
          <Offline />
        )}
      </ThemeProvider>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  );
        }

setup === "app1" ?
  root.render(
    <BrowserRouter>
      { //<React.StrictMode>
        // <App1 />
        //</React.StrictMode>
      }
    </BrowserRouter>
  ) :
  root.render(
    <Index/>
  )

reportWebVitals();
