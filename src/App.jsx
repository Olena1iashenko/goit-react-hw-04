import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const accessKey = "8RLSWco7mGuYlLvfbXC7LqXQOFQ5deRwg2Q9xby70_o";

  useEffect(() => {
    const fetchImages = async () => {
      // if (!query) return;
      setIsLoading(true);
      setError("No images to fetch");
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${accessKey}`
        );
        setImages((prev) =>
          page === 1
            ? [...response.data.results]
            : [...prev, ...response.data.results]
        );
      } catch (error) {
        setError(toast.error("Error loading images!"));
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== "") {
      fetchImages();
    }
  }, [query, page]);

  const handleSubmit = async (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter your search!");
      return;
    }
    setImages([]);
    setIsLoading(true);
    setError("");
    setQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalIsOpen && (
        <ImageModal onClose={closeModal} imageUrl={selectedImage} />
      )}
    </div>
  );
}
