import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/Header';
import Submenu from './components/Submenu';
import './styles/global.scss'
import DataProvider from './context/DataContext';
import ThemeProvider from './context/ThemeContext';
import Theme from './components/Themes/Theme';
import CartProvider from './context/CartContext';

ReactDOM.render(
  <React.StrictMode>
      <DataProvider>
        <CartProvider>
          <ThemeProvider>
            <Theme>
              <Header />
              <Submenu />
            </Theme>
          </ThemeProvider>
          <App />
        </CartProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
