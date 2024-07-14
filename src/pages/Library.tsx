import BackBtn from '../components/BackBtn';

export default function Library({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  return (
    <>
      <BackBtn onBackClicked={(e) => onBackClicked(e)} />
      <div>Hello Library</div>
      <div>Hello Library</div>
    </>
  );
}
