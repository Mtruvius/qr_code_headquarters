import React, { createContext, useState } from 'react';
import { IProps } from 'react-qrcode-logo';
import { SaveProps } from '../assets/helper';
import QrPreview from '../components/QrPreview';
import Header from '../components/Header';
import logo from '../assets/logo.png';
import SizeSlider from '../components/SizeSlider';
import QrColorPicker from '../components/QrColorPicker';
import QrLogoUpload from '../components/QrLogoUpload';
import FooterBtns from '../components/FooterBtns';
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

function QrStyles({
  label,
  buttons,
  onStyleSelect,
}: {
  label: string;
  buttons: string[];
  onStyleSelect: (style: string) => void;
}) {
  function handleClick(e: React.SyntheticEvent<EventTarget>) {
    if (!(e.target instanceof HTMLButtonElement)) return;
    onStyleSelect(String(e.target.dataset.style));
  }
  const data = buttons.map((text, i) => {
    if (i === 0) {
      return (
        <button
          key={text}
          type="button"
          data-style={label.toLowerCase()}
          onClick={handleClick}
          className="active"
        >
          {text}
        </button>
      );
    }
    return (
      <button
        key={text}
        type="button"
        data-style={text.toLowerCase()}
        onClick={handleClick}
      >
        {text}
      </button>
    );
  });
  return (
    <div className="styleFieldBtns">
      <span>{label}:</span>
      {data}
    </div>
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

const defaults = {
  QrValue: '',
  BgColor: '#fff',
  FgColor: '#000',
  Size: 150,
  QrStyle: 'squares' as IProps['qrStyle'],
  LogoImage: '',
  LogoWidth: 30,
  LogoHeight: 30,
  LogoOpacity: 100,
  RemoveQrCodeBehindLogo: false,
  LogoPadding: 0,
  LogoPaddingStyle: 'square' as IProps['logoPaddingStyle'],
  EyeRadius: [0, 0, 0],
  EyeColor: ['#000', '#000', '#000'],
};
const StyleContext = createContext(defaults);

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
  const defaultEyeRadius = [0, 0, 0];
  const defaultEyeColor = ['#000', '#000', '#000'];

  const [styleVal, setStyleVal] = useState(defaults);

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
  const [eyeRadius, setEyeRadius] = useState(defaultEyeRadius);
  const [topLeftEye, setTopLeftEye] = useState(eyeRadius[0]);
  const [topRightEye, setTopRightEye] = useState(eyeRadius[1]);
  const [bottomLeftEye, setBottomLeftEye] = useState(eyeRadius[2]);
  const [eyeColor, setEyeColor] = useState(defaultEyeColor);
  const [leftEyeColor, setleftEyeColor] = useState(eyeColor[0]);
  const [rightEyeColor, setRightEyeColor] = useState(eyeColor[1]);
  const [bottomEyeColor, setBottomEyeColor] = useState(eyeColor[2]);

  return (
    <StyleContext.Provider value={styleVal}>
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
          setEyeRadius(defaultEyeRadius);
          setEyeColor(defaultEyeColor);
        }}
      />

      <div id="addQr">
        <div className="qrInput">
          <URLInput
            value={inputVal}
            onChanging={(val) => {
              setInputVal(val);
            }}
            onURLSubmit={(url) => {
              setQrValue(url);
            }}
          />
        </div>
        {/* preview */}
        <span>Preview: </span>
        <div className="qrPreview">
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
            eyeRadius={eyeRadius as IProps['eyeRadius']}
            eyeColor={eyeColor as IProps['eyeColor']}
          />
        </div>

        <div className="stylling">
          <div className="qr_size">
            <SizeSlider
              title="Size"
              value={size}
              min={60}
              max={300}
              onSliderChange={(s: number) => setSize(s)}
            />
          </div>
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
          <div className="qr_style">
            <QrStyles
              label="Style"
              buttons={['Squares', 'Dots', 'Fluid']}
              onStyleSelect={(style) => {
                setqrStyle(style as IProps['qrStyle']);
              }}
            />
          </div>
          <div className="qr_eyes_radius">
            {eyeRadius.map((_, i) => {
              let name;
              switch (i) {
                case 0:
                  name = 'Top Left Eye';
                  break;
                case 1:
                  name = 'Top Right Eye';
                  break;
                default:
                  name = 'Bottom Left Eye';
                  break;
              }
              return (
                <div
                  className={`qr_eye_slide ${name.toLowerCase().replaceAll(' ', '-')}`}
                  key={name}
                >
                  <SizeSlider
                    title={name}
                    value={eyeRadius[i] * 2}
                    unit="%"
                    min={0}
                    max={100}
                    onSliderChange={(radius: number) => {
                      const value = radius / 2;
                      if (i === 0) setTopLeftEye(value);
                      if (i === 1) setTopRightEye(value);
                      if (i === 2) setBottomLeftEye(value);
                      setEyeRadius([topLeftEye, topRightEye, bottomLeftEye]);
                    }}
                  />
                  <QrColorPicker
                    startColor="#000"
                    label="Color"
                    onColorChange={(color) => {
                      if (i === 0) setleftEyeColor(color);
                      if (i === 1) setRightEyeColor(color);
                      if (i === 2) setBottomEyeColor(color);
                      setEyeColor([
                        leftEyeColor,
                        rightEyeColor,
                        bottomEyeColor,
                      ]);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="qr_img_section">
          <QrLogoUpload
            uploadedImg={uploadedImg}
            onImageSelect={(img) => {
              setLogoImage(img);
              setUploadedImg(img);
            }}
          />
        </div>
        <div className="qr_img_width">
          <SizeSlider
            title="Width"
            value={logoWidth}
            min={20}
            max={120}
            onSliderChange={(width: number) => setLogoWidth(width)}
          />
        </div>
        <div className="qr_img_height">
          <SizeSlider
            title="Height"
            value={logoHeight}
            min={20}
            max={120}
            onSliderChange={(height: number) => setLogoHeight(height)}
          />
        </div>
        <div className="qr_img_opacity">
          <SizeSlider
            title="Opacity"
            value={logoOpacity}
            unit="%"
            min={0}
            max={100}
            onSliderChange={(opacity: number) => setLogoOpacity(opacity)}
          />
        </div>
        <div className="logo_removeBg">
          <span>Remove QrCode Behind Logo:</span>
          <input
            type="checkbox"
            onChange={(e) => {
              setRemoveQrCodeBehindLogo(e.target.checked);
            }}
          />
        </div>
        <div className="qr_img_logo_pad">
          <SizeSlider
            title="Logo Padding"
            value={logoPadding}
            min={0}
            max={20}
            onSliderChange={(padding: number) => setLogoPadding(padding)}
          />
        </div>
        <div className="qr_pad_style">
          <QrStyles
            label="Logo Padding Style"
            buttons={['Square', 'Circle']}
            onStyleSelect={(style) => {
              setLogoPaddingStyle(style as IProps['logoPaddingStyle']);
            }}
          />
        </div>
        <div className="footBtns">
          <FooterBtns
            btns={[
              { text: 'library_add', tooltip: 'Add To Library' },
              { text: 'download', tooltip: 'Download' },
            ]}
            onClicked={(e) => {
              if (e === 'add') {
                const saveData: SaveProps = {
                  qrValue,
                  qrStyle,
                  size,
                  bgColor,
                  fgColor,
                  logoImage,
                  logoOpacity,
                  logoPadding,
                  logoPaddingStyle,
                };
                SaveQr(saveData);
              }
            }}
          />
        </div>
        <br />
        <br />
      </div>
    </StyleContext.Provider>
  );
}
