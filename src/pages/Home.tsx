import './Home.css';
import Logo from '../assets/logo.png';
import Mascot from '../assets/mascot.png';

export default function Home({
  onAddBtnClick,
}: {
  onAddBtnClick: (target: HTMLButtonElement) => void;
}) {
  return (
    <>
      <header>
        <div className="logo">
          <img src={Logo} alt="Qr Code Headquarters logo" />
        </div>
        <button
          type="button"
          onClick={(e) => {
            onAddBtnClick(e.target as HTMLButtonElement);
          }}
          className="material-symbols-outlined"
        >
          qr_code_2_add
        </button>
        <button
          type="button"
          onClick={(e) => {
            onAddBtnClick(e.target as HTMLButtonElement);
          }}
          className="material-symbols-outlined"
        >
          library_books
        </button>
      </header>
      <div className="mascot">
        <img src={Mascot} alt="Qr Code Headquarters mascot" />
      </div>
    </>
  );
}
