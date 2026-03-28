import { Plus, Minus } from "lucide-react";

const ImageLightbox = ({
  selectedImage,
  zoomLevel,
  onZoom,
}) => {
  return (
    <div
      className="modal fade"
      id="imageLightbox"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 bg-transparent">
          <div
            className="modal-header border-0 p-0 position-absolute top-0 end-0 m-3"
            style={{ zIndex: 10 }}
          >
            <button
              type="button"
              className="btn-close btn-close-white shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="modal-body p-0 d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "80vh" }}
          >
            <div className="lightbox-image-container mb-4">
              <img
                src={selectedImage}
                alt="預覽大圖"
                className="img-fluid rounded shadow-lg"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: "transform 0.2s ease-out",
                  maxHeight: "85vh",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="lightbox-toolkit d-flex gap-3 p-3 rounded-pill bg-white shadow-sm mb-3">
              <button
                className="btn btn-outline-primary rounded-circle zoom-btn"
                onClick={() => onZoom(-0.2)}
                title="縮小"
              >
                <Minus size={20} />
              </button>
              <span className="zoom-percentage">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                className="btn btn-outline-primary rounded-circle zoom-btn"
                onClick={() => onZoom(0.2)}
                title="放大"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
