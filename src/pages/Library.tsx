import { IProps, QRCode } from 'react-qrcode-logo';
import { SaveProps } from '../assets/helper';
import './Library.css';
import Header from '../components/Header';

export default function Library({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  const data = localStorage.getItem('qr_library');
  const library = JSON.parse(data || '[]');
  const savedQRs = library.map((lib: SaveProps) => {
    return (
      <div key={lib.qrValue}>
        <QRCode
          value={lib.qrValue}
          // ecLevel={ecLevel}
          size={lib.size}
          // quietZone={quietZone}
          bgColor={lib.bgColor}
          fgColor={lib.fgColor}
          logoImage={lib.logoImage}
          // logoWidth={logoWidth}
          // logoHeight={logoHeight}
          // logoOpacity={logoOpacity}
          // removeQrCodeBehindLogo={removeQrCodeBehindLogo}
          // logoPadding={logoPadding}
          // logoPaddingStyle={logoPaddingStyle}
          qrStyle={lib.qrStyle as IProps['qrStyle']}
          // eyeRadius={eyeRadius}
          // eyeColor={eyeColor}
          // id={id}
          // style={style}
        />
        <span>{lib.qrValue}</span>
      </div>
    );
  });
  return (
    <>
      <Header isBackBtn onBtnClicked={onBackClicked} />
      <div className="library">{savedQRs}</div>
    </>
  );
}
