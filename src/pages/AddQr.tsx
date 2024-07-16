import React, { useState } from 'react';
import { IProps, QRCode } from 'react-qrcode-logo';
import { ColorPicker, IColor, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import BackBtn from '../components/BackBtn';
import Tooltip from '../components/Tooltip';
import './AddQr.css';

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

export default function AddQr({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  const [qrValue, setQrValue] = useState('HEllo');
  const [bgColor, setBgColor] = useState('#fff');
  const [fgColor, setFgColor] = useState('#000');
  const [size, setSize] = useState(150);
  const [qrStyle, setqrStyle] = useState('squares' as IProps['qrStyle']);
  return (
    <>
      <header>
        <div className="menu_btns">
          <BackBtn onBackClicked={(e) => onBackClicked(e)} />
        </div>
      </header>
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
            onFocus={() => {
              // onClicked(e.target as HTMLButtonElement);
            }}
            onMouseOver={(e) => {
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
            onFocus={() => {
              // onClicked(e.target as HTMLButtonElement);
            }}
            onMouseOver={(e) => {
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
