import './MenuBtns.css';
import Tooltip from './Tooltip';

export default function MenuBtns({
  onClicked,
}: {
  onClicked: (target: HTMLButtonElement) => void;
}) {
  return (
    <>
      <button
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
      </button>
      <button
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
      </button>
    </>
  );
}
