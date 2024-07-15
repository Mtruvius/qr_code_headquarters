import './Home.css';
import Mascot from '../assets/mascot.png';
import MenuBtns from '../components/MenuBtns';

function Body() {
  return (
    <div className="mascot">
      <img src={Mascot} alt="Qr Code Headquarters mascot" />
    </div>
  );
}

export default function Home({
  onBtnClicked,
}: {
  onBtnClicked: (target: HTMLButtonElement) => void;
}) {
  return (
    <>
      <header>
        <div className="menu_btns">
          <MenuBtns
            onClicked={(e) => {
              onBtnClicked(e);
            }}
          />
        </div>
      </header>
      <Body />
    </>
  );
}
