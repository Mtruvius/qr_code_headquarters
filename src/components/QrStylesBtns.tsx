export default function QrStyleBtns({
  label,
  buttons,
  onStyleSelect,
}: {
  label: string;
  buttons: string[];
  onStyleSelect: (style: string) => void;
}) {
  function handleClick(e: React.SyntheticEvent<EventTarget>) {
    if (!(e.target instanceof HTMLButtonElement)) return;
    onStyleSelect(String(e.target.dataset.style));
  }
  const data = buttons.map((text, i) => {
    if (i === 0) {
      return (
        <button
          key={text}
          type="button"
          data-style={label.toLowerCase()}
          onClick={handleClick}
          className="active"
        >
          {text}
        </button>
      );
    }
    return (
      <button
        key={text}
        type="button"
        data-style={text.toLowerCase()}
        onClick={handleClick}
      >
        {text}
      </button>
    );
  });
  return (
    <div className="styleFieldBtns">
      <span>{label}:</span>
      {data}
    </div>
  );
}
