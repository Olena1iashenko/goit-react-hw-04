import s from "./ImageCard.module.css";

export const ImageCard = ({ image, onClick }) => {
  const handleClick = () => {
    onClick(image.urls.regular);
  };
  return (
    <li className={s.image}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageCard;
