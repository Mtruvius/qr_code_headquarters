import React, { useState } from 'react';
import { IProps, QRCode } from 'react-qrcode-logo';
import { ColorPicker, IColor, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import Tooltip from '../components/Tooltip';
import { SaveProps } from '../assets/helper';
import './AddQr.css';
import Header from '../components/Header';

function URLInput({ onURLSubmit }: { onURLSubmit: (url: string) => void }) {
  const [url, setURL] = useState('');
  return (
    <div className="dataField">
      <form onSubmit={(e) => e.preventDefault()}>
        <span>URL:</span>
        <input type="text" onChange={(e) => setURL(e.target.value)} />
        <div>
          <button type="submit" onClick={() => onURLSubmit(url)}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

function QrDotsStyle({
  onStyleSelect,
}: {
  onStyleSelect: (style: string) => void;
}) {
  function handleClick(e: React.SyntheticEvent<EventTarget>) {
    if (!(e.target instanceof HTMLButtonElement)) return;
    onStyleSelect(String(e.target.dataset.style));
  }

  return (
    <div className="selectStyleField">
      <span>Style:</span>
      <button
        type="button"
        data-style="squares"
        className="active"
        onClick={handleClick}
      >
        squares
      </button>
      <button type="button" data-style="dots" onClick={handleClick}>
        dots
      </button>
      <button type="button" data-style="fluid" onClick={handleClick}>
        fluid
      </button>
    </div>
  );
}

function QrSizeSlider({
  onSliderChange,
}: {
  onSliderChange: (size: number) => void;
}) {
  const [size, setSize] = useState(150);
  function handleChange(e: React.SyntheticEvent<EventTarget>) {
    setSize(Number((e.target as HTMLInputElement).value));
    onSliderChange(size);
  }

  return (
    <div className="qrCode_size">
      <span>Size: </span>
      <input
        type="range"
        min="60"
        max="300"
        defaultValue={size}
        onChange={handleChange}
      />
      <span>{size} px</span>
    </div>
  );
}

function QrColorPicker({
  startColor,
  label,
  onColorChange,
}: {
  startColor: string;
  label: string;
  onColorChange: (color: string) => void;
}) {
  const [color, setColor] = useColor(startColor);
  const [isVisible, setVisibility] = useState('hidden');

  function handleChange(hex: IColor) {
    setColor(hex);
    onColorChange(hex.hex);
  }
  return (
    <div className="backColorOption">
      <div
        className={`colorPicker ${isVisible}`}
        onMouseLeave={() => {
          setVisibility('hidden');
        }}
      >
        <ColorPicker
          height={100}
          hideAlpha
          hideInput={['rgb', 'hsv']}
          color={color}
          onChange={(hex) => handleChange(hex)}
        />
      </div>
      <div>
        <span>{label}: </span>
        <button
          type="button"
          style={{ backgroundColor: color.hex }}
          onMouseEnter={() => setVisibility('')}
        >
          <span style={{ color: '#0000' }}>#</span>
        </button>
      </div>
    </div>
  );
}

function QrPreview({
  ...props
}: {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  qrStyle: IProps['qrStyle'];
}) {
  const [data, setData] = useState('');
  if (props.value !== '') {
    if (data !== props.value) setData(props.value ? props.value : data);
    return (
      <QRCode
        value={data}
        // ecLevel={ecLevel}
        size={props.size}
        // quietZone={quietZone}
        bgColor={props.bgColor}
        fgColor={props.fgColor}
        // logoImage={logoImage}
        // logoWidth={logoWidth}
        // logoHeight={logoHeight}
        // logoOpacity={logoOpacity}
        // removeQrCodeBehindLogo={removeQrCodeBehindLogo}
        // logoPadding={logoPadding}
        // logoPaddingStyle={logoPaddingStyle}
        qrStyle={props.qrStyle}
        // eyeRadius={eyeRadius}
        // eyeColor={eyeColor}
        // id={id}
        // style={style}
      />
    );
  }
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

  const [qrValue, setQrValue] = useState(defaultQrValue);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [fgColor, setFgColor] = useState(defaultFgColor);
  const [size, setSize] = useState(defaultSize);
  const [qrStyle, setqrStyle] = useState(defaultQrStyle);
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
        }}
      />

      <div id="addQr">
        <div className="qrPreview" style={{ width: `${size}px` }}>
          <span>Preview: </span>
          <QrPreview
            value={qrValue}
            qrStyle={qrStyle}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
          />
        </div>
        <br />
        <URLInput
          onURLSubmit={(url) => {
            setQrValue(url);
          }}
        />
        <br />
        <QrDotsStyle
          onStyleSelect={(style) => {
            setqrStyle(style as IProps['qrStyle']);
          }}
        />
        <br />
        <QrSizeSlider onSliderChange={(s: number) => setSize(s)} />
        <br />
        <div className="qrCode_color">
          <span>Color:</span>
          <QrColorPicker
            startColor="#fff"
            label="Back"
            onColorChange={(color) => setBgColor(color)}
          />
          <br />
          <QrColorPicker
            startColor="#000"
            label="Front"
            onColorChange={(color) => setFgColor(color)}
          />
          <br />
        </div>
        <br />
        <div className="footBtns">
          <button
            type="button"
            className="material-symbols-outlined"
            onClick={() => {
              const saveData: SaveProps = {
                qrValue,
                qrStyle,
                size,
                bgColor,
                fgColor,
              };
              SaveQr(saveData);
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
              // onClicked(e.target as HTMLButtonElement);
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
        <br />
        <br />
      </div>
    </>
  );
}
