import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'

import '/node_modules/bootstrap/dist/css/bootstrap.min.css'

window.onload = () => {
  const root = createRoot(document.getElementById("root"));

  root.render(
    <StrictMode>
    <App />
    </StrictMode>
  );
};