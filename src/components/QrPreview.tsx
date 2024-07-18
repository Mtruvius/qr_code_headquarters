/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { IProps, QRCode } from 'react-qrcode-logo';

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
  logoPaddingStyle: 'square' | 'circle' | undefined;
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
        qrStyle={props.qrStyle}
        logoImage={props.logoImage}
        logoWidth={props.logoWidth}
        logoHeight={props.logoHeight}
        removeQrCodeBehindLogo={props.removeQrCodeBehindLogo}
        logoOpacity={props.logoOpacity / 100}
        logoPadding={props.logoPadding}
        logoPaddingStyle={props.logoPaddingStyle}
        // eyeRadius={eyeRadius}
        // eyeColor={eyeColor}
        // id={id}
        // style={style}
      />
    );
  }
}
