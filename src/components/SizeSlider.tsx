import './SizeSlider.css';

export default function SizeSlider({
  title,
  value,
  unit = 'px',
  min,
  max,
  onSliderChange,
}: {
  title: string;
  value: number;
  // eslint-disable-next-line react/require-default-props
  unit?: string;
  min: number;
  max: number;
  onSliderChange: (size: number) => void;
}) {
  function handleChange(e: React.SyntheticEvent<EventTarget>) {
    onSliderChange(Number((e.target as HTMLInputElement).value));
  }

  return (
    <div className="size_slide">
      <span>{title}: </span>
      <input
        type="range"
        min={String(min)}
        max={String(max)}
        value={value}
        onChange={handleChange}
      />
      <span>
        {value} {unit}
      </span>
    </div>
  );
}
