import MenuBtns from './MenuBtns';
import BackBtn from './BackBtn';
import './Header.css';

export default function Header({
  isBackBtn = false,
  onBtnClicked,
}: {
  // eslint-disable-next-line react/require-default-props
  isBackBtn?: boolean;
  onBtnClicked: (target: HTMLButtonElement) => void;
}) {
  const head = isBackBtn ? (
    <div className="menu_btns">
      <BackBtn onBackClicked={(e) => onBtnClicked(e)} />
    </div>
  ) : (
    <div className="menu_btns">
      <MenuBtns
        onClicked={(e) => {
          onBtnClicked(e);
        }}
      />
    </div>
  );
  return <header>{head}</header>;
}
