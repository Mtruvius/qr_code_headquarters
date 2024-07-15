import BackBtn from '../components/BackBtn';

export default function AddQr({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  return (
    <>
      <header>
        <div className="menu_btns">
          <BackBtn onBackClicked={(e) => onBackClicked(e)} />
        </div>
      </header>
      <div>Hello AddQr</div>
      <div>Hello AddQr</div>
    </>
  );
}
