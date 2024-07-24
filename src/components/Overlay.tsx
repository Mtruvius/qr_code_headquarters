import './Overlay.css';

export default function Overlay({
  className,
  content,
  onClicked,
}: {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  content: JSX.Element;
  onClicked(): void;
}) {
  return (
    <div className={`overlay ${className}`}>
      {content}
      <br />
      <button
        type="button"
        onClick={() => {
          onClicked();
        }}
      >
        Close
      </button>
    </div>
  );
}
