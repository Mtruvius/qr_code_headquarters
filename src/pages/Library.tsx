import { useState } from 'react';
import { IProps, QRCode } from 'react-qrcode-logo';
import './Library.css';
import Header from '../components/Header';

export default function Library({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  const [isEmpty, setIsEmpty] = useState(true);
  const data = localStorage.getItem('qr_library');
  if (data) {
    if (isEmpty === true) {
      setIsEmpty(false);
    }
  }
  const library = JSON.parse(data || '[]');
  const savedQRs = library.map((lib: IProps) => {
    return (
      <div key={lib.value}>
        <QRCode
          value={lib.value}
          // ecLevel={ecLevel}
          size={lib.size}
          // quietZone={quietZone}
          bgColor={lib.bgColor}
          fgColor={lib.fgColor}
          logoImage={lib.logoImage}
          logoWidth={lib.logoWidth}
          logoHeight={lib.logoHeight}
          logoOpacity={lib.logoOpacity}
          removeQrCodeBehindLogo={lib.removeQrCodeBehindLogo}
          logoPadding={lib.logoPadding}
          logoPaddingStyle={lib.logoPaddingStyle}
          qrStyle={lib.qrStyle as IProps['qrStyle']}
          eyeRadius={lib.eyeRadius}
          eyeColor={lib.eyeColor}
          // id={id}
          // style={style}
        />
        <span>{lib.value}</span>
      </div>
    );
  });
  return (
    <>
      <Header isBackBtn onBtnClicked={onBackClicked} />
      <button
        type="button"
        onClick={() => {
          if (isEmpty) return;
          localStorage.clear();
          setIsEmpty(true);
        }}
      >
        Clear All
      </button>
      <div className="library">{savedQRs}</div>
    </>
  );
}
