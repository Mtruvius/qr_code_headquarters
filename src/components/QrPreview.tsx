/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { IProps, QRCode } from 'react-qrcode-logo';
import './QrPreview.css';

export default function QrPreview({
  ...props
}: {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  qrStyle: IProps['qrStyle'];
  logoImage: string;
  logoWidth: number;
  logoHeight: number;
  removeQrCodeBehindLogo: boolean;
  logoOpacity: number;
  logoPadding: number;
  logoPaddingStyle: IProps['logoPaddingStyle'];
  eyeRadius: IProps['eyeRadius'];
  eyeColor: IProps['eyeColor'];
}) {
  const [data, setData] = useState('Qr Code Headquarters');
  if (props.value !== '') {
    if (data !== props.value) setData(props.value ? props.value : data);
    return (
      <QRCode
        value={data}
        // ecLevel={ecLevel}
        size={props.size - 20}
        // quietZone={quietZone}
        bgColor={props.bgColor}
        fgColor={props.fgColor}
        qrStyle={props.qrStyle}
        logoImage={props.logoImage}
        logoWidth={props.logoWidth}
        logoHeight={props.logoHeight}
        removeQrCodeBehindLogo={props.removeQrCodeBehindLogo}
        logoOpacity={props.logoOpacity / 100}
        logoPadding={props.logoPadding}
        logoPaddingStyle={props.logoPaddingStyle}
        eyeRadius={props.eyeRadius}
        eyeColor={props.eyeColor}
        // id={id}
        // style={style}
      />
    );
  }
}
