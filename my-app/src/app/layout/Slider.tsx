import { observer } from "mobx-react";
import { useStore } from "../stores/store";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Link } from "react-router-dom";
import '../layout/Slider.css';

import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import './Slider.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default observer(function Slider() {
  const { offerStore, cartStore } = useStore();
  const { loadOffers, offersByName } = offerStore;
  const [loadedImages, setLoadedImages] = useState<{ width: number; height: number; }[]>([]);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const defaultWidth = 500; // Set your desired default width
  const defaultHeight = 300; // Set your desired default height

  useEffect(() => {
    loadOffers();
  }, [offerStore]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = event.target as HTMLImageElement;
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, { width: naturalWidth, height: naturalHeight }]);
  };

  useEffect(() => {
    if (loadedImages.length > 0) {
      const maxWidthImage = Math.max(...loadedImages.map((image) => image.width));
      const maxHeightImage = Math.max(...loadedImages.map((image) => image.height));
      setMaxWidth(maxWidthImage);
      setMaxHeight(maxHeightImage);
    }
  }, [loadedImages]);

  const handleAddToCart = (offerId: string) => {
    //
  };

  return (
    <div className="flex flex-col items-center mt-40">
      <h2 className="text-3xl font-bold text-center mb-4">Check out our latest offers!</h2>
      <div className="slider w-full max-w-screen-lg">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 5000 }} // Auto slide every 5 seconds
        >
          {offersByName.map((offer) => (
            <SwiperSlide key={offer.id} className="flex justify-center">
              <Link to={`/offerDetails/${offer.id}`}>
                <div className="image-container flex items-center justify-center h-full">
                  <img
                    src={`data:image/jpeg;base64,${offer.imagePath}`}
                    alt={offer.image}
                    className="mx-auto object-cover"
                    onLoad={handleImageLoad}
                    style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px`, width: `${defaultWidth}px`, height: `${defaultHeight}px` }}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="text-center mt-4">Hurry up and grab these amazing deals!</p>
    </div>
  );
});
