import { useState } from 'react';
import { ColorPicker, IColor, useColor } from 'react-color-palette';
import './QrColorPicker.css';

export default function QrColorPicker({
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
    <div className="colorOptions">
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
