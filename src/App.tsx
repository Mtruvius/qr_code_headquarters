import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import logo from './assets/logo.png';

export default function App() {
  const menuObj = { menu1: '#', menu2: '#', menu3: '#', menu4: '#' };
  return (
    <>
      <Menu
        direction="vert"
        labels_N_links={menuObj}
        logo={logo}
        icons={['qr_code_2']}
        iconStyle="left"
      />
      <div>
        <Header />
      </div>
    </>
  );
}
