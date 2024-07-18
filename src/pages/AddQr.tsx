import React, { useState } from 'react';
import { IProps } from 'react-qrcode-logo';
// import { ColorPicker, IColor, useColor } from 'react-color-palette';
import { SaveProps } from '../assets/helper';
import Tooltip from '../components/Tooltip';
import QrPreview from '../components/QrPreview';
import Header from '../components/Header';
import logo from '../assets/logo.png';
import './AddQr.css';
import 'react-color-palette/css';

function URLInput({
  value,
  onChanging,
  onURLSubmit,
}: {
  value: string;
  onChanging: (value: string) => void;
  onURLSubmit: (url: string) => void;
}) {
  const [url, setURL] = useState('');
  return (
    <div className="dataField">
      <form onSubmit={(e) => e.preventDefault()}>
        <span>URL:</span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChanging(val);
            setURL(val);
          }}
        />
        <div>
          <button type="submit" onClick={() => onURLSubmit(url)}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

// function QrDotsStyle({
//   onStyleSelect,
// }: {
//   onStyleSelect: (style: string) => void;
// }) {
//   function handleClick(e: React.SyntheticEvent<EventTarget>) {
//     if (!(e.target instanceof HTMLButtonElement)) return;
//     onStyleSelect(String(e.target.dataset.style));
//   }

//   return (
//     <div className="selectStyleField">
//       <span>Style:</span>
//       <button
//         type="button"
//         data-style="squares"
//         className="active"
//         onClick={handleClick}
//       >
//         squares
//       </button>
//       <button type="button" data-style="dots" onClick={handleClick}>
//         dots
//       </button>
//       <button type="button" data-style="fluid" onClick={handleClick}>
//         fluid
//       </button>
//     </div>
//   );
// }
// function QrColorPicker({
//   startColor,
//   label,
//   onColorChange,
// }: {
//   startColor: string;
//   label: string;
//   onColorChange: (color: string) => void;
// }) {
//   const [color, setColor] = useColor(startColor);
//   const [isVisible, setVisibility] = useState('hidden');

//   function handleChange(hex: IColor) {
//     setColor(hex);
//     onColorChange(hex.hex);
//   }
//   return (
//     <div className="backColorOption">
//       <div
//         className={`colorPicker ${isVisible}`}
//         onMouseLeave={() => {
//           setVisibility('hidden');
//         }}
//       >
//         <ColorPicker
//           height={100}
//           hideAlpha
//           hideInput={['rgb', 'hsv']}
//           color={color}
//           onChange={(hex) => handleChange(hex)}
//         />
//       </div>
//       <div>
//         <span>{label}: </span>
//         <button
//           type="button"
//           style={{ backgroundColor: color.hex }}
//           onMouseEnter={() => setVisibility('')}
//         >
//           <span style={{ color: '#0000' }}>#</span>
//         </button>
//       </div>
//     </div>
//   );
// }

function QrSizeSlider({
  title,
  value,
  unit = 'px',
  min,
  max,
  onSliderChange,
}: {
  title: string;
  value: number;
  // eslint-disable-next-line react/require-default-props
  unit?: string;
  min: number;
  max: number;
  onSliderChange: (size: number) => void;
}) {
  function handleChange(e: React.SyntheticEvent<EventTarget>) {
    onSliderChange(Number((e.target as HTMLInputElement).value));
  }

  return (
    <div className="qrCode_size">
      <span>{title}: </span>
      <input
        type="range"
        min={String(min)}
        max={String(max)}
        value={value}
        onChange={handleChange}
      />
      <span>
        {value} {unit}
      </span>
    </div>
  );
}

function QrLogo({
  uploadedImg,
  onImageSelect,
}: {
  uploadedImg: string;
  onImageSelect(img: string): void;
}) {
  return (
    <>
      <div>Upload Logo:</div>
      <label
        htmlFor="img_upload"
        className="img_upload"
        style={{ backgroundImage: `URL(${uploadedImg})` }}
      >
        Custom Upload
        <input
          id="img_upload"
          type="file"
          onChange={(evt) => {
            const { files } = evt.target;
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = e.target?.result as string;
              onImageSelect(img);
            };
            reader.readAsDataURL(files![0]);
          }}
        />
      </label>
    </>
  );
}

function SaveQr(props: SaveProps) {
  if (props.qrValue === '') return;
  const name = 'qr_library';
  const data: SaveProps[] = [];
  if (localStorage.getItem(name)) {
    JSON.parse(localStorage.getItem(name)!).forEach((qrCode: SaveProps) => {
      data.push(qrCode);
    });
  }
  const conatinsData = data.some((v) => v.qrValue === props.qrValue);
  if (conatinsData === false) {
    data.push({ ...props });
  } else {
    data.filter((d) => {
      if (d.qrValue !== props.qrValue) return d;
      return Object.assign(d, props);
    });
  }
  localStorage.setItem(name, JSON.stringify(data));
}

function FooterBtns({ clicked }: { clicked(type: string): void }) {
  return (
    <div className="footBtns">
      <button
        type="button"
        className="material-symbols-outlined"
        onClick={() => {
          clicked('add');
        }}
        onMouseEnter={(e) => {
          Tooltip(e.target as HTMLButtonElement, 'Add to Library');
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).children[0].remove();
        }}
      >
        library_add
      </button>
      <button
        type="button"
        className="material-symbols-outlined"
        onClick={() => {
          clicked('download');
        }}
        onMouseEnter={(e) => {
          Tooltip(e.target as HTMLButtonElement, 'Download');
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).children[0].remove();
        }}
      >
        download
      </button>
    </div>
  );
}

export default function AddQr({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  // localStorage.clear();
  const defaultQrValue = '';
  const defaultBgColor = '#fff';
  const defaultFgColor = '#000';
  const defaultSize = 150;
  const defaultQrStyle = 'squares' as IProps['qrStyle'];
  const defaultLogoImage = '';
  const defaultLogoWidth = 30;
  const defaultLogoHeight = 30;
  const defaultLogoOpacity = 100;
  const defaultRemoveQrCodeBehindLogo = false;
  const defaultLogoPadding = 0;
  const defaultLogoPaddingStyle = 'square' as IProps['logoPaddingStyle'];

  const [inputVal, setInputVal] = useState(defaultQrValue);
  const [uploadedImg, setUploadedImg] = useState(logo);
  const [qrValue, setQrValue] = useState(defaultQrValue);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [fgColor, setFgColor] = useState(defaultFgColor);
  const [size, setSize] = useState(defaultSize);
  const [qrStyle, setqrStyle] = useState(defaultQrStyle);
  const [logoImage, setLogoImage] = useState(defaultLogoImage);
  const [logoWidth, setLogoWidth] = useState(defaultLogoWidth);
  const [logoHeight, setLogoHeight] = useState(defaultLogoHeight);
  const [removeQrCodeBehindLogo, setRemoveQrCodeBehindLogo] = useState(
    defaultRemoveQrCodeBehindLogo
  );
  const [logoOpacity, setLogoOpacity] = useState(defaultLogoOpacity);
  const [logoPadding, setLogoPadding] = useState(defaultLogoPadding);
  const [logoPaddingStyle, setLogoPaddingStyle] = useState(
    defaultLogoPaddingStyle
  );

  return (
    <>
      <Header
        isBackBtn
        onBtnClicked={(e) => {
          onBackClicked(e);
          setQrValue(defaultQrValue);
          setBgColor(defaultBgColor);
          setFgColor(defaultFgColor);
          setSize(defaultSize);
          setqrStyle(defaultQrStyle);
          setInputVal(defaultQrValue);
          setLogoImage(defaultLogoImage);
          setUploadedImg(logo);
          setLogoWidth(defaultLogoWidth);
          setLogoHeight(defaultLogoHeight);
          setRemoveQrCodeBehindLogo(defaultRemoveQrCodeBehindLogo);
          setLogoOpacity(defaultLogoOpacity);
          setLogoPadding(defaultLogoPadding);
          setLogoPaddingStyle(defaultLogoPaddingStyle);
        }}
      />

      <div id="addQr">
        <div
          className="qrPreview"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <span>Preview: </span>
          <QrPreview
            value={qrValue}
            qrStyle={qrStyle}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            logoImage={logoImage}
            logoWidth={logoWidth}
            logoHeight={logoHeight}
            removeQrCodeBehindLogo={removeQrCodeBehindLogo}
            logoOpacity={logoOpacity}
            logoPadding={logoPadding}
            logoPaddingStyle={logoPaddingStyle}
          />
        </div>
        <br />
        <URLInput
          value={inputVal}
          onChanging={(val) => {
            setInputVal(val);
          }}
          onURLSubmit={(url) => {
            setQrValue(url);
          }}
        />
        <br />
        {/* <QrDotsStyle
          onStyleSelect={(style) => {
            setqrStyle(style as IProps['qrStyle']);
          }}
        />
        <br />
        <QrSizeSlider
          title="Size"
          value={size}
          min={60}
          max={300}
          onSliderChange={(s: number) => setSize(s)}
        />
        <br />
        <div className="qrCode_color">
          <span>Color:</span>
          <QrColorPicker
            startColor={bgColor}
            label="Back"
            onColorChange={(color) => setBgColor(color)}
          />
          <br />
          <QrColorPicker
            startColor={fgColor}
            label="Front"
            onColorChange={(color) => setFgColor(color)}
          />
          <br />
        </div>
        <br /> */}
        <div className="qr_img_section">
          <QrLogo
            uploadedImg={uploadedImg}
            onImageSelect={(img) => {
              setLogoImage(img);
              setUploadedImg(img);
            }}
          />
        </div>
        <QrSizeSlider
          title="Width"
          value={logoWidth}
          min={20}
          max={120}
          onSliderChange={(width: number) => setLogoWidth(width)}
        />
        <br />
        <QrSizeSlider
          title="Height"
          value={logoHeight}
          min={20}
          max={120}
          onSliderChange={(height: number) => setLogoHeight(height)}
        />
        <br />
        <QrSizeSlider
          title="Opacity"
          value={logoOpacity}
          unit="%"
          min={0}
          max={100}
          onSliderChange={(opacity: number) => setLogoOpacity(opacity)}
        />
        <br />
        <div>
          <span>Remove QrCode Behind Logo:</span>
          <input
            type="checkbox"
            onChange={(e) => {
              setRemoveQrCodeBehindLogo(e.target.checked);
            }}
          />
        </div>
        <br />
        <QrSizeSlider
          title="Logo Padding"
          value={logoPadding}
          min={0}
          max={20}
          onSliderChange={(padding: number) => setLogoPadding(padding)}
        />
        <br />
        <FooterBtns
          clicked={(type) => {
            if (type === 'add') {
              const saveData: SaveProps = {
                qrValue,
                qrStyle,
                size,
                bgColor,
                fgColor,
                logoImage,
              };
              SaveQr(saveData);
            }
          }}
        />
        <br />
        <br />
      </div>
    </>
  );
}
