import './FooterBtns.css';
import Tooltip from './Tooltip';

export interface MainBtnIProps {
  text: string;
  tooltip: string;
}
export default function FooterBtns({
  btns,
  onClicked,
}: {
  btns: MainBtnIProps[];
  onClicked: (target: string) => void;
}) {
  return (
    <>
      {btns.map((btn) => {
        return (
          <button
            key={btn.text}
            type="button"
            onFocus={() => {
              onClicked(btn.text);
            }}
            onMouseOver={(e) => {
              Tooltip(e.target as HTMLButtonElement, `${btn.tooltip}`);
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).children[0].remove();
            }}
            className="footerBtn material-symbols-outlined"
          >
            {btn.text}
          </button>
        );
      })}
      {/* <button
        type="button"
        onFocus={(e) => {
          onClicked(e.target as HTMLButtonElement);
        }}
        onMouseOver={(e) => {
          Tooltip(e.target as HTMLButtonElement, 'Create New QrCode');
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).children[0].remove();
        }}
        className="home material-symbols-outlined"
      >
        qr_code_2_add
      </button> */}
      {/* <button
        type="button"
        onFocus={(e) => {
          onClicked(e.target as HTMLButtonElement);
        }}
        onMouseOver={(e) => {
          Tooltip(e.target as HTMLButtonElement, 'My Library');
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).children[0].remove();
        }}
        className="home material-symbols-outlined"
      >
        library_books
      </button> */}
    </>
  );
}
