import './LibraryAddBtn.css';
import Tooltip from './Tooltip';

export default function LibraryAddBtn({
  onClicked,
}: {
  onClicked: (target: string) => void;
}) {
  return (
    <button
      type="button"
      onFocus={() => {
        onClicked('library_add');
      }}
      onMouseOver={(e) => {
        Tooltip(e.target as HTMLButtonElement, 'Add To Library');
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).children[0].remove();
      }}
      className="footerBtn material-symbols-outlined"
    >
      library_add
    </button>
  );
}
