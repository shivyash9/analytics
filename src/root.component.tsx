import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Analytics from './components/Analytics';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
};

export default App;
