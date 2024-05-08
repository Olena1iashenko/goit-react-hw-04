import s from "./ImageModal.module.css";
import { useEffect } from "react";
import ReactModal from "react-modal";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      onClick={handleOverlayClick}
    >
      <img src={imageUrl} alt="Large" className={s.img} />
    </ReactModal>
  );
};

export default ImageModal;
