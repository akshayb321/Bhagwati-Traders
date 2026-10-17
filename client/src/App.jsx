import React from 'react';
import './App.css';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home/Home';

export default function App() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}
