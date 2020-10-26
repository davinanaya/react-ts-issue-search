import React from 'react';
import IssueSearchLayout from './layout/IssueSearchLayout';
import './App.scss';

function App() {
  return (
    <>
      <header className="App-header">
        <h2>Code Challenge NuOrder</h2>
      </header>
      <main>
        <div className="container">
          <IssueSearchLayout />
        </div>
      </main>
    </>
  );
}

export default App;
