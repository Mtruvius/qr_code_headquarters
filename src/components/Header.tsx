import './Header.css';
import Mascot from '../assets/mascot.png';

export default function Header() {
  return (
    <header>
      <div id="content">
        <div className="mascot">
          <img src={Mascot} alt="Qr Code Headquarters mascot" />
        </div>
      </div>
    </header>
  );
}
