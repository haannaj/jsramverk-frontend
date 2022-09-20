// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Editor from "./components/editor";
// import { useEffect, useState } from 'react';
// import docsModel from './models/docs';
// import EditorDocs from './components/editor';



// function App() {
//   const [allDocs, setAllDocs] = useState(null);

//   async function fetchDocs() {
//     const docs = await docsModel.getAllDoc();
//     console.log(docs)

//     setAllDocs(docs)
//     console.log(allDocs)
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchDocs();
//     })();
//   }, []);

//   return (
//     <div className="App">
//       <header className="header">
//         <h1>la empresa</h1>
//       </header>
//       <main className="main">
//         {/* <WineList wines={wines} />
//         <WineForm submitFunction={fetchWines} /> */}
        
//         <EditorDocs allDocs={allDocs} />
//       </main>
//     </div>
//   );
// }

// export default App;