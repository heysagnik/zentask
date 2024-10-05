import React from 'react';

import { Taskbox } from './components/Taskbox.jsx';
import { Button } from './components/Button.jsx';
import {Header} from './components/Header.jsx'
function App() {
  return (
    <>
      <Header/>
      <Taskbox title= 'Web3'task='Learn the idea' />
      <Button/>
    </>
  );
}

export default App;
