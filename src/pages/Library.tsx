import BackBtn from '../components/BackBtn';

export default function Library({
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

      <div>Hello Library</div>
      <div>Hello Library</div>
    </>
  );
}
