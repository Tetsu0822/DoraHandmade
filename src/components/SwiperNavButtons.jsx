import { useSwiper } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function SwiperNavButtons() {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns">
      <button className="swiper-nav-btn swiper-nav-btn-prev" onClick={() => swiper.slidePrev()}>
        <div className="d-flex"><ChevronLeft /></div>
      </button>
      <button className="swiper-nav-btn swiper-nav-btn-next" onClick={() => swiper.slideNext()}>
        <div className="d-flex"><ChevronRight /></div>
      </button>
    </div>
  );
}

export default SwiperNavButtons;
