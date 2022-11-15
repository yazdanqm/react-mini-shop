import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './Components/Index/Index';
import "./vendors/bootstrap/bootstrap.min.css";
import "./vendors/fontawesome/css/all.min.css";
import "./vendors/themify-icons/themify-icons.css";
import "./vendors/nice-select/nice-select.css";
import "./vendors/owl-carousel/owl.theme.default.min.css";
import "./vendors/owl-carousel/owl.carousel.min.css";
import './css/style.css'
import { HashRouter } from "react-router-dom";
import { AuthProvider } from './Context/auth-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HashRouter >
    <React.StrictMode>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </React.StrictMode>
</HashRouter >
);
