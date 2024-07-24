import './QrLogoUpload.css';

export default function QrLogoUpload({
  uploadedImg,
  onImageSelect,
}: {
  uploadedImg: string;
  onImageSelect(img: string): void;
}) {
  return (
    <div className="logo_upload">
      <span className="label">Upload Logo:</span>
      <label
        htmlFor="img_upload"
        className="img_upload"
        style={{ backgroundImage: `URL(${uploadedImg})` }}
      >
        Custom Upload
        <input
          id="img_upload"
          type="file"
          onChange={(evt) => {
            const { files } = evt.target;
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = e.target?.result as string;
              onImageSelect(img);
            };
            reader.readAsDataURL(files![0]);
          }}
        />
      </label>
    </div>
  );
}
