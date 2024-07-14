export default function BackBtn({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => onBackClicked(e.target as HTMLButtonElement)}
    >
      Back
    </button>
  );
}
