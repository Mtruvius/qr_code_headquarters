import './Home.css';
import Mascot from '../assets/mascot.png';
import Header from '../components/Header';

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
      <Header onBtnClicked={onBtnClicked} />
      <Body />
    </>
  );
}
