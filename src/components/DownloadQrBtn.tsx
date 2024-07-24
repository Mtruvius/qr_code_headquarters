import Tooltip from './Tooltip';

export default function DownloadQrBtn({
  canvas,
  name,
}: {
  canvas: HTMLCanvasElement;
  name: string;
}) {
  // const canvas = document.querySelector(
  //   '#react-qrcode-logo'
  // ) as HTMLCanvasElement;
  function download() {
    const url = canvas?.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = name ?? 'react-qrcode-logo';
    link.href = url;
    link.click();
  }

  return (
    <button
      type="button"
      onFocus={() => {
        download();
      }}
      onMouseOver={(e) => {
        Tooltip(e.target as HTMLButtonElement, 'Download');
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).children[0].remove();
      }}
      className="footerBtn material-symbols-outlined"
    >
      Download
    </button>
  );
}
