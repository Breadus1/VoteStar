import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyPanel from '../pages/CompanyPanel';
import VotingPanel from '../pages/VotingPanel';
import Login from '../pages/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/company-panel" element={<CompanyPanel />} />
        <Route path="/voting-panel" element={<VotingPanel />} />
        <Route path="/" exact element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;