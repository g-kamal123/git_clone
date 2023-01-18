import { Page } from '@shopify/polaris';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Search1 from './component/Search1';
import User from './component/User';
import React from 'react';

function App() {
  return (
   <Page>
    <Routes>
      <Route path='/' element={<Search1 />}/>
      <Route path='/user' element={<User />} />
    </Routes>
   </Page>
  );
}

export default App;
