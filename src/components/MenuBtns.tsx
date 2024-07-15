import './MenuBtns.css';

function tooltip(btn: HTMLButtonElement) {
  const newText = btn.textContent?.includes('qr_code')
    ? 'QR Code'
    : 'View My Library';
  if (document.querySelector('.tooltip') !== null) return null;
  return btn.insertAdjacentHTML(
    'beforeend',
    `<div class="tooltip">${newText}</div>`
  );
}

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
          tooltip(e.target as HTMLButtonElement);
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
          tooltip(e.target as HTMLButtonElement);
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
