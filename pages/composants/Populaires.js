import React from 'react';
import Slider from 'react-slick';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import ProductCard from '../../app/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from 'react-responsive';


const Populaires = ({ currentSlide, setCurrentSlide, products }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <IoIosArrowDroprightCircle
        className={className}
        style={{ ...style, marginRight: "7rem", zIndex: "", display: "block",fontSize: "", background: "transparent", color: "#517e94"}}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <IoIosArrowDropleftCircle
        className={className}
        style={{ ...style, marginLeft: "7rem", zIndex: "1", display: "block", background: "transparent", color: "#517e94"}}
        onClick={onClick}
      />
    );
  }

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "100px",
    arrows: isMobile ? false : true, 
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3, // Ajustement ici pour afficher 1 seul slide sur mobile
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <section className='pt-20 lg:pt-32'>
    <h1 className='flex justify-center text-7xl text-cyan-700 font-dense pb-5 text-center'>LES PLUS POPULAIRES</h1>

    <Slider {...settings} className=''>
    {products.map((product, productIndex) => (
<div key={productIndex}>
<div className={` px-3 lg:px-0 lg:mx-10 py-10 transform ${currentSlide === productIndex ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}`}>
  <ProductCard product={product} />
</div>
</div>
))}
</Slider>
</section>
  );
};

export default Populaires;
