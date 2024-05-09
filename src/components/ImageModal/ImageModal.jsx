import s from "./ImageModal.module.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "80%",
    padding: "0",
  },
};
s;

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      // className={s.modal}
      // overlayClassName={s.overlay}
      style={customStyles}
    >
      <img src={imageUrl} alt="Large" className={s.img} />
    </Modal>
  );
};

export default ImageModal;
