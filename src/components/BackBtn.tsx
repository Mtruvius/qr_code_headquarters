import Tooltip from './Tooltip';

export default function BackBtn({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={(e) => {
        Tooltip(e.target as HTMLButtonElement, 'Back');
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).children[0].remove();
      }}
      onClick={(e) => onBackClicked(e.target as HTMLButtonElement)}
      className="home material-symbols-outlined"
    >
      arrow_back
    </button>
  );
}
