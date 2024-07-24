import './App.css';
import { useState } from 'react';
import Home from './pages/Home';
import Library from './pages/Library';
import AddQr from './pages/AddQr';
import Logo from './assets/logo.png';

export default function App() {
  const [home, setHome] = useState('100vh');
  const [lib, setLib] = useState('0vh');
  const [addQr, setaddQr] = useState('0vh');

  function selectComponent(selection: HTMLButtonElement) {
    const title = selection.firstChild?.textContent?.toLowerCase();
    switch (title) {
      case 'arrow_back':
        setHome('100vh');
        setLib('0vh');
        setaddQr('0vh');
        break;
      case 'library_books':
        setHome('0vh');
        setLib('100vh');
        setaddQr('0vh');
        break;
      case 'qr_code_2_add':
        setHome('0vh');
        setLib('0vh');
        setaddQr('100vh');
        break;
      default:
        break;
    }
  }
  return (
    <>
      <div className="logo">
        <img src={Logo} alt="Qr Code Headquarters logo" />
      </div>
      <section
        style={{
          height: lib,
          backgroundColor: 'var(--LightBlue-color)',
        }}
      >
        <Library
          onBackClicked={(e: HTMLButtonElement) => {
            selectComponent(e);
          }}
        />
      </section>
      <section
        style={{
          height: home,
        }}
      >
        <Home
          onBtnClicked={(e: HTMLButtonElement) => {
            selectComponent(e);
          }}
        />
      </section>
      <section
        style={{
          height: addQr,
          backgroundColor: 'var(--DarkRed-color)',
        }}
      >
        <AddQr
          onBackClicked={(e: HTMLButtonElement) => {
            selectComponent(e);
          }}
        />
      </section>
    </>
  );
}
