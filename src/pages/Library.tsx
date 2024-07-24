import { ReactElement, useState } from 'react';
import { IProps, QRCode } from 'react-qrcode-logo';
import './Library.css';
import Header from '../components/Header';
import Overlay from '../components/Overlay';
import DownloadQrBtn from '../components/DownloadQrBtn';

function DeleteBtn({
  label,
  className,
  onClicked,
}: {
  label: string;
  className: string;
  onClicked(): void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onClicked();
        // if (label === 'Clear All') {
        //   localStorage.clear();
        // } else {
        //   onClicked();
        // }
      }}
      className={className}
    >
      {label}
    </button>
  );
}

export default function Library({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  const [activeQqrCode, setActiveQRCode] = useState<ReactElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [overlay, setOverlay] = useState('hidden');
  const letters = Array(26)
    .fill(0)
    .map((_, i) => String.fromCharCode(65 + i));

  const data = localStorage.getItem('qr_library');
  if (data) {
    if (isEmpty === true) {
      setIsEmpty(false);
    }
  }
  // setCurrentLib(data || '[]');
  const library = JSON.parse(data || '[]');
  const qrCodes = library.map((lib: IProps) => {
    const letterIndex = Math.floor(Math.random() * 26);
    const id = `${letters[letterIndex]}${Date.now()}`;
    return (
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
        id={id}
        // style={style}
      />
    );
  });

  const savedQRs = qrCodes.map((qrCode: ReactElement) => {
    return (
      <button
        type="button"
        key={qrCode.props.value}
        className="lib_qr-code"
        onClick={() => {
          setOverlay('');
          const qrObj = Object.entries(qrCode.props);
          const newObj = qrObj.map((q) => {
            if (q[0] !== 'size') return q;
            q.pop();
            q.push(300);
            return q;
          });
          const newProps = Object.fromEntries(newObj);
          // eslint-disable-next-line react/jsx-props-no-spreading
          setActiveQRCode(<QRCode {...newProps} />);
        }}
      >
        {qrCode}
        <div>{qrCode.props.value}</div>
      </button>
    );
  });

  // const savedQRs = library.map((lib: IProps) => {
  //   return (
  //     <button
  //       type="button"
  //       key={lib.value}
  //       className="lib_qr-code"
  //       onClick={(e) => {
  //         console.log(e);
  //         // setQRCode();
  //       }}
  //     >
  //       <QRCode
  //         value={lib.value}
  //         // ecLevel={ecLevel}
  //         size={lib.size}
  //         // quietZone={quietZone}
  //         bgColor={lib.bgColor}
  //         fgColor={lib.fgColor}
  //         logoImage={lib.logoImage}
  //         logoWidth={lib.logoWidth}
  //         logoHeight={lib.logoHeight}
  //         logoOpacity={lib.logoOpacity}
  //         removeQrCodeBehindLogo={lib.removeQrCodeBehindLogo}
  //         logoPadding={lib.logoPadding}
  //         logoPaddingStyle={lib.logoPaddingStyle}
  //         qrStyle={lib.qrStyle as IProps['qrStyle']}
  //         eyeRadius={lib.eyeRadius}
  //         eyeColor={lib.eyeColor}
  //         // id={id}
  //         // style={style}
  //       />
  //       <div>{lib.value}</div>
  //     </button>
  //   );
  // });
  return (
    <>
      <Header isBackBtn onBtnClicked={onBackClicked} />
      <DeleteBtn
        label="Clear All"
        className="clearAll"
        onClicked={() => {
          setIsEmpty(true);
          localStorage.clear();
        }}
      />
      <div className="library">{isEmpty ? null : savedQRs}</div>
      <Overlay
        className={overlay}
        content={
          <div className="overlay-content">
            <div>{activeQqrCode?.props.value}</div>
            <div className="qr_overlay">{activeQqrCode}</div>
            <DownloadQrBtn
              canvas={
                document.querySelector(
                  `#${activeQqrCode?.props.id}`
                ) as HTMLCanvasElement
              }
              name={activeQqrCode?.props.value as string}
            />
            <DeleteBtn
              label="delete"
              className="lib_qr_delete material-symbols-outlined"
              onClicked={() => {
                const newLib = library.filter((lib: IProps) => {
                  return lib.value !== activeQqrCode?.props.value;
                });
                localStorage.setItem('qr_library', JSON.stringify(newLib));
                setOverlay('hidden');
              }}
            />
          </div>
        }
        onClicked={() => {
          setOverlay('hidden');
        }}
      />
    </>
  );
}
