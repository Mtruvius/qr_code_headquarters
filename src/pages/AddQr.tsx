import { useReducer, useState } from 'react';
import { IProps } from 'react-qrcode-logo';
import QrPreview from '../components/QrPreview';
import Header from '../components/Header';
import logo from '../assets/logo.png';
import SizeSlider from '../components/SizeSlider';
import QrStyleBtns from '../components/QrStylesBtns';
import QrColorPicker from '../components/QrColorPicker';
import QrLogoUpload from '../components/QrLogoUpload';
import FooterBtns from '../components/FooterBtns';
import './AddQr.css';
import 'react-color-palette/css';

const saveQr = (props: IProps) => {
  if (props.value === '') return;
  const name = 'qr_library';
  const data: IProps[] = [];
  if (localStorage.getItem(name)) {
    JSON.parse(localStorage.getItem(name)!).forEach((qrCode: IProps) => {
      data.push(qrCode);
    });
  }
  const conatinsData = data.some((v) => v.value === props.value);
  if (conatinsData === false) {
    data.push({ ...props });
  } else {
    data.filter((d) => {
      if (d.value !== props.value) return d;
      return Object.assign(d, props);
    });
  }
  localStorage.setItem(name, JSON.stringify(data));
};

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

        <div className="stylling">
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
            <span>Color:</span>
            <QrColorPicker
              startColor={preview.bgColor!}
              label="Back"
              onColorChange={(color) => {
                updatePreview({ bgColor: color });
              }}
            />
            <br />
            <QrColorPicker
              startColor={preview.fgColor!}
              label="Front"
              onColorChange={(color) => updatePreview({ fgColor: color })}
            />
            <br />
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
          <div className="qr_eyes_radius">
            {(preview.eyeRadius as number[]).map((eye, i) => {
              const eyeArr = preview.eyeRadius as number[];
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
                    label="Color"
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
        <div className="logo_stylling">
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
            <span>Remove QrCode Behind Logo:</span>
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
          <FooterBtns
            btns={[
              { text: 'library_add', tooltip: 'Add To Library' },
              { text: 'download', tooltip: 'Download' },
            ]}
            onClicked={(e) => {
              if (e === 'library_add') {
                const saveData: IProps = { ...preview };
                saveQr(saveData);
              }
            }}
          />
        </div>
        <br />
        <br />
      </div>
    </>
  );
}
