import React from 'react';
import ReactDOM from 'react-dom/client';
import SignupForm from "./components/SignupForm.tsx";
import './styles/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <SignupForm/>
  </React.StrictMode>,
)
