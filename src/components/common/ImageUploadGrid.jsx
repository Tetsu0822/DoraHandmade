import { ImageIcon, Search } from "lucide-react";

const ImageUploadGrid = ({
  fileReferences,
  isUploading,
  uploadProgress,
  onUpload,
  onRemove,
  onOpenLightbox,
}) => {
  return (
    <div className="images-grid">
      {fileReferences.map((url, index) => (
        <div key={index} className="uploaded-item">
          <div className="image-wrapper" onClick={() => onOpenLightbox(url)}>
            <img src={url} alt={`參考圖 ${index + 1}`} />
            <div className="image-overlay">
              <Search size={24} />
            </div>
          </div>
          <button
            type="button"
            className="remove-btn"
            onClick={() => onRemove(index)}
            title="刪除圖片"
          >
            ×
          </button>
        </div>
      ))}

      {isUploading && (
        <div className="uploaded-item uploading">
          <div className="upload-loading">
            <div
              className="spinner-border text-primary spinner-border-sm mb-2"
              role="status"
            ></div>
            <span className="uploading-text">圖片上傳中...</span>
            <span className="progress-text">{uploadProgress}%</span>
            <div className="progress w-75 mt-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      )}

      {!isUploading && fileReferences.length < 5 && (
        <div className="upload-dropzone" onClick={onUpload}>
          <div className="upload-placeholder">
            <ImageIcon size={32} className="dropzone-icon" />
            <p>新增圖片</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadGrid;
