import BackBtn from '../components/BackBtn';

export default function AddQr({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  return (
    <>
      <BackBtn onBackClicked={(e) => onBackClicked(e)} />
      <div>Hello AddQr</div>
      <div>Hello AddQr</div>
    </>
  );
}
