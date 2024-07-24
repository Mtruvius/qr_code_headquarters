import { IProps } from 'react-qrcode-logo';

export default function SaveQr(props: IProps) {
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
}
