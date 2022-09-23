import React from 'react';
import EditorDocs from './components/editor';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Routes>
      <Route path={'/'} element={<EditorDocs/>} />
    </Routes>
    </>
  );
}


export default App;
