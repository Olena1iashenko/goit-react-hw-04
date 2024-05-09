import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { toast } from "react-toastify";
import ImageModal from "./components/ImageModal/ImageModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hasMoreImages, setHasMoreImages] = useState(true);
  // const [searchQuery, setSearchQuery] = useState("");

  const accessKey = "8RLSWco7mGuYlLvfbXC7LqXQOFQ5deRwg2Q9xby70_o";

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
    // setSearchQuery("");
  };

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${accessKey}`
        );
        if (response.data.results.length === 0) {
          setHasMoreImages(false);
          return toast.info("No more images to load");
        }
        setImages((prev) =>
          page === 1
            ? [...response.data.results]
            : [...prev, ...response.data.results]
        );
      } catch (error) {
        setError();
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== "") {
      fetchImages();
    }
  }, [query, page]);

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
      <SearchBar
        onSubmit={handleSubmit}
        // value={searchQuery}
        // onChange={setSearchQuery}
      />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && hasMoreImages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageUrl={selectedImage}
        />
      )}
    </div>
  );
}
