import { CSSProperties } from 'react';
import './Menu.css';

type Direction = 'vert' | 'hori';
type IconStyle = 'left' | 'top' | 'only';

interface Props {
  direction: Direction;
  labels_N_links: object;
  // eslint-disable-next-line react/require-default-props
  logo?: string;
  // eslint-disable-next-line react/require-default-props
  icons?: string[];
  // eslint-disable-next-line react/require-default-props
  iconStyle?: IconStyle;
  // eslint-disable-next-line react/require-default-props
}

export default function Menu({
  direction,
  labels_N_links,
  logo,
  icons = [],
  iconStyle = 'left',
}: Props) {
  const vertiStyle = {
    display: 'flex',
    flexDirection: 'column',
  };
  const hortStyle = {
    display: 'flex',
  };
  const menuStyle = direction === 'vert' ? vertiStyle : hortStyle;

  const linksStyleVert = {
    display: 'flex',
    flexDirection: 'column',
  };
  const linksStyleHori = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  };
  const linksStyle = direction === 'vert' ? linksStyleVert : linksStyleHori;

  const iconDefaultStyle = {
    display: 'flex',
  };
  const iconTopStyle = {
    display: 'flex',
    flexDirection: 'column',
  };
  const iconOnlyStyle = {
    textAlign: 'center',
  };

  const menu = Object.entries(labels_N_links).map((m, i) => {
    if (icons.length > 0) {
      const style =
        (iconStyle === 'left' && iconDefaultStyle) ||
        (iconStyle === 'top' && iconTopStyle) ||
        (iconStyle === 'only' && iconOnlyStyle);
      return (
        <a key={m[1]} style={style as CSSProperties} href={m[1]}>
          <span className="material-symbols-outlined">{icons[i]}</span>
          {iconStyle !== 'only' ? (
            <span className="menu-label">{m[0]}</span>
          ) : null}
        </a>
      );
    }
    return <a href={m[1]}>{m[0]}</a>;
  });

  return (
    <div className="menu" style={menuStyle as CSSProperties}>
      {logo != null ? (
        <a href="/" target="_blank" rel="noreferrer">
          <img src={logo} className="logo" alt="Qr code headquarters logo" />
        </a>
      ) : null}
      <div className="menu_links" style={linksStyle as CSSProperties}>
        {menu}
      </div>
    </div>
  );
}
