import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import PresentationEditor from './components/PresentationEditor';

function App () {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/presentation/:id" element={<PresentationEditor />} />
      </Routes>
      <Logout />
    </BrowserRouter>
    </>

  );
}

export default App;
