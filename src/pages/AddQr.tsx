/* eslint-disable react/jsx-props-no-spreading */
import { useReducer, useState } from 'react';
import { IProps } from 'react-qrcode-logo';
import QrPreview from '../components/QrPreview';
import Header from '../components/Header';
import logo from '../assets/logo.png';
import SizeSlider from '../components/SizeSlider';
import QrStyleBtns from '../components/QrStylesBtns';
import QrColorPicker from '../components/QrColorPicker';
import QrLogoUpload from '../components/QrLogoUpload';
import DownloadQrBtn from '../components/DownloadQrBtn';
import Overlay from '../components/Overlay';

import './AddQr.css';
import 'react-color-palette/css';
import LibraryAddBtn from '../components/LibraryAddBtn';
import SaveQr from '../helpers/SaveQr';

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

const previewReducer = (obj: IProps, action: IProps) => {
  const state = Object.entries(obj);
  const newState = state.map((prop) => {
    if (prop[0] === Object.keys(action)[0]) {
      prop.pop();
      prop.push(Object.values(action)[0]);
    }
    return prop;
  });
  return Object.fromEntries(newState) as IProps;
};

const previewDefaults: IProps = {
  value: '',
  bgColor: '#fff',
  fgColor: '#000',
  size: 150,
  qrStyle: 'squares',
  logoImage: '',
  logoWidth: 30,
  logoHeight: 30,
  logoOpacity: 100,
  removeQrCodeBehindLogo: false,
  logoPadding: 0,
  logoPaddingStyle: 'square',
  eyeRadius: [0, 0, 0],
  eyeColor: ['#000', '#000', '#000'],
};

export default function AddQr({
  onBackClicked,
}: {
  onBackClicked: (target: HTMLButtonElement) => void;
}) {
  const [preview, updatePreview] = useReducer(previewReducer, previewDefaults);
  const [overlayHidden, setOverlayHidden] = useState('hidden');
  const [overlayContent, setOverlayContent] = useState(<div>Hello World</div>);
  const [showStyle, setShowStyle] = useState('hidden');
  const [showLogoStylling, setLogoStylling] = useState('hidden');
  const [inputVal, setInputVal] = useState(preview.value!);
  const [uploadedImg, setUploadedImg] = useState(logo);

  return (
    <>
      <Header
        isBackBtn
        onBtnClicked={(e) => {
          onBackClicked(e);
          setInputVal('');
          setUploadedImg(logo);
          const defaults = Object.entries(previewDefaults);
          defaults.map((def) => updatePreview({ [def[0]]: def[1] }));
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
              updatePreview({ value: url });
            }}
          />
        </div>

        <div className="preview_section">
          <div className="preview">
            <span>Preview: </span>
            <div className="qrPreview">
              <QrPreview
                value={preview.value!}
                qrStyle={preview.qrStyle}
                size={preview.size!}
                bgColor={preview.bgColor!}
                fgColor={preview.fgColor!}
                logoImage={preview.logoImage!}
                logoWidth={preview.logoWidth!}
                logoHeight={preview.logoHeight!}
                removeQrCodeBehindLogo={preview.removeQrCodeBehindLogo!}
                logoOpacity={preview.logoOpacity!}
                logoPadding={preview.logoPadding!}
                logoPaddingStyle={preview.logoPaddingStyle!}
                eyeRadius={preview.eyeRadius}
                eyeColor={preview.eyeColor}
              />
            </div>
          </div>
          <div className="styleBtns">
            <button
              type="button"
              onClick={() => {
                setShowStyle(showStyle === 'hidden' ? '' : 'hidden');
                setLogoStylling('hidden');
              }}
            >
              Style
            </button>
            <button
              type="button"
              onClick={() => {
                setLogoStylling(showLogoStylling === 'hidden' ? '' : 'hidden');
                setShowStyle('hidden');
              }}
            >
              Logo
            </button>
          </div>
        </div>

        <div className={`stylling ${showStyle}`}>
          <div className="qr_size">
            <SizeSlider
              title="Size"
              value={preview.size!}
              min={60}
              max={300}
              onSliderChange={(s: number) => {
                // setSize(s);
                updatePreview({ size: s });
              }}
            />
          </div>
          <div className="qrCode_color">
            <span className="label">Color:</span>
            <div className="colors">
              <QrColorPicker
                startColor={preview.bgColor!}
                label="Back"
                onColorChange={(color) => {
                  updatePreview({ bgColor: color });
                }}
              />
              <QrColorPicker
                startColor={preview.fgColor!}
                label="Front"
                onColorChange={(color) => updatePreview({ fgColor: color })}
              />
            </div>
          </div>
          <div className="qr_style">
            <QrStyleBtns
              label="Style"
              buttons={['Squares', 'Dots', 'Fluid']}
              onStyleSelect={(style) => {
                updatePreview({ qrStyle: style as IProps['qrStyle'] });
              }}
            />
          </div>
          <div className="slider_group">
            <span className="label">Eye Radius: </span>
            {(preview.eyeRadius as number[]).map((eye, i) => {
              const eyeArr = preview.eyeRadius as number[];
              let name;
              switch (i) {
                case 0:
                  name = 'Left Eye';
                  break;
                case 1:
                  name = 'Right Eye';
                  break;
                default:
                  name = 'Bottom Eye';
                  break;
              }
              return (
                <div
                  className={`qr_eye_slide ${name.toLowerCase().replaceAll(' ', '-')}`}
                  key={name}
                >
                  <SizeSlider
                    title={name}
                    value={eye! * 2}
                    unit="%"
                    min={0}
                    max={100}
                    onSliderChange={(radius: number) => {
                      const val = radius / 2;
                      if (i === 0) {
                        updatePreview({
                          eyeRadius: [val, eyeArr[1], eyeArr[2]],
                        });
                      }
                      if (i === 1) {
                        updatePreview({
                          eyeRadius: [eyeArr[0], val, eyeArr[2]],
                        });
                      }
                      if (i === 2) {
                        updatePreview({
                          eyeRadius: [eyeArr[0], eyeArr[1], val],
                        });
                      }
                    }}
                  />
                  <QrColorPicker
                    startColor="#000"
                    // label=""
                    onColorChange={(color) => {
                      const colors = preview.eyeColor?.valueOf() as string[];
                      if (i === 0) {
                        updatePreview({
                          eyeColor: [color, colors[1], colors[2]],
                        });
                      }
                      if (i === 1) {
                        updatePreview({
                          eyeColor: [colors[0], color, colors[2]],
                        });
                      }
                      if (i === 2) {
                        updatePreview({
                          eyeColor: [colors[0], colors[1], color],
                        });
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={`stylling ${showLogoStylling}`}>
          <div className="qr_img_section">
            <QrLogoUpload
              uploadedImg={uploadedImg}
              onImageSelect={(img) => {
                updatePreview({ logoImage: img });
                // setLogoImage(img);
                setUploadedImg(img);
              }}
            />
          </div>
          <div className="slider_group">
            <span className="label">Logo Size: </span>
            <div className="qr_img_width">
              <SizeSlider
                title="Width"
                value={preview.logoWidth!}
                min={20}
                max={120}
                onSliderChange={(width: number) =>
                  updatePreview({ logoWidth: width })
                }
              />
            </div>
            <div className="qr_img_height">
              <SizeSlider
                title="Height"
                value={preview.logoHeight!}
                min={20}
                max={120}
                onSliderChange={(height: number) =>
                  updatePreview({ logoHeight: height })
                }
              />
            </div>
          </div>
          <div className="qr_img_opacity">
            <SizeSlider
              title="Opacity"
              value={preview.logoOpacity!}
              unit="%"
              min={0}
              max={100}
              onSliderChange={(opacity: number) =>
                updatePreview({ logoOpacity: opacity })
              }
            />
          </div>
          <div className="logo_removeBg">
            <span className="label">Remove QrCode Behind Logo:</span>
            <input
              type="checkbox"
              onChange={(e) => {
                updatePreview({ removeQrCodeBehindLogo: e.target.checked });
              }}
            />
          </div>
          <div className="qr_img_logo_pad">
            <SizeSlider
              title="Logo Padding"
              value={preview.logoPadding!}
              min={0}
              max={20}
              onSliderChange={(padding: number) =>
                updatePreview({ logoPadding: padding })
              }
            />
          </div>
          <div className="qr_pad_style">
            <QrStyleBtns
              label="Logo Padding Style"
              buttons={['Square', 'Circle']}
              onStyleSelect={(style) => {
                updatePreview({
                  logoPaddingStyle: style as IProps['logoPaddingStyle'],
                });
              }}
            />
          </div>
        </div>

        <div className="footBtns">
          <LibraryAddBtn
            onClicked={() => {
              const saveData: IProps = { ...preview };
              if (saveData.value !== '') {
                SaveQr(saveData);
                setOverlayHidden('');
                setOverlayContent(
                  <div className="overlay_content">
                    <div className="overlay_content_title">
                      {saveData.value} QR Code Saved
                    </div>
                    {
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <QrPreview {...saveData} />
                    }
                  </div>
                );
              }
            }}
          />
          <DownloadQrBtn
            canvas={document.querySelector('#react-qrcode-logo')!}
            name={inputVal}
          />
        </div>
        <br />
        <br />
      </div>
      <Overlay
        content={overlayContent}
        onClicked={() => {
          const defaults = Object.entries(previewDefaults);
          setInputVal('');
          setUploadedImg('');
          defaults.map((def) => updatePreview({ [def[0]]: def[1] }));
          setOverlayHidden('hidden');
        }}
        className={overlayHidden}
      />
    </>
  );
}
