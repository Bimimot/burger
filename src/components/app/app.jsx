import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';


function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
    </div>
  );
}

export default App;
