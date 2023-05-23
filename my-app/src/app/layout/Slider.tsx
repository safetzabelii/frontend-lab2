import { observer } from "mobx-react";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Link } from "react-router-dom";
import '../layout/Slider.css';


import SwiperCore, { Navigation, Pagination } from 'swiper';

import './Slider.css';

SwiperCore.use([Navigation, Pagination]);


export default observer(function Slider(){
    const { offerStore } = useStore();
    const { loadOffers, offersByName } = offerStore;
    
    useEffect(() => {
        loadOffers();
    }, [offerStore]);

    return (
          <div className="flex justify-center">
          <div className="slider w-full max-w-screen-lg">
              <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  loop
              >
                  {offersByName.map((offer) => (
                      <SwiperSlide key={offer.id} className="flex justify-center">
                          <Link to={`/offerDetails/${offer.id}`}>
                              <img
                                  src={`data:image/jpeg;base64,${offer.imagePath}`}
                                  alt={offer.image}
                                  className="mx-auto"
                              />
                          </Link>
                      </SwiperSlide>
                  ))}
              </Swiper>
          </div>
      </div>
    );
});
