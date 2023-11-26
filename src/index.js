import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App1 from './Alumini/App';
import App2 from './Web Connect Application/JS/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as process from 'process';
import Offline from './Web Connect Application/JS/Offline';
import { socket } from './Web Connect Application/JS/Socket/Socket';
import ScreenWarning from './Warning';
import { Provider } from 'react-redux';
import {store} from './Web Connect Application/JS/Store/Store.js'
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
      socket.close();

    };
  }, []);

  return (
    <BrowserRouter>
      {/* { <React.StrictMode> */}
      <ThemeProvider>
        {status === 'online' ? (
          <>
          <Provider store={store}>
            <ToastContainer position="top-center" />
            <App2 />
         </Provider>
          </>
        ) : (
          <Offline />
        )}
      </ThemeProvider>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  );
}

function ScreenSize() {

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isLargeScreen ? <Index /> : <ScreenWarning />}
    </div>
  )
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
      <ScreenSize />
  )

reportWebVitals();
