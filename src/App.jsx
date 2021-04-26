import React from 'react';
import Cards from './components/Cards';
import Cart from './components/Cart';

import styles from './styles/app.module.scss';

function App() {
  return (
      <main className={styles.Wrapper}>
        <Cards />
        <Cart />
      </main>
  );
}

export default App;
