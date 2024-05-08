import { ImageCard } from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

export const ImageGallery = ({ images, openModal }) => {
  if (!images.length) {
    return <h2>No images find</h2>;
  }

  return (
    <ul className={s.list}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onclick={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
