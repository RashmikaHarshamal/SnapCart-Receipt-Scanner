import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Parallax } from "swiper/modules";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500 }}
        parallax={true}
        speed={1500}
        modules={[Autoplay, Parallax]}
        className="w-full h-screen"
      >
        {[5, 2, 3].map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="flex justify-center items-center text-white text-center w-full h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url('/${img}.jpg')` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative max-w-2xl">
                <small
                  data-swiper-parallax="-200"
                  className="block mb-2 text-lg tracking-widest uppercase text-white drop-shadow-md"
                >
                  Make your life easier
                </small>
                <h2
                  data-swiper-parallax="-300"
                  className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-lg"
                >
                  Snap <span className="text-orange-400">Cart</span> - Receipt<br />
                  <span className="text-orange-400">Scanner</span>
                </h2>
                <p
                  data-swiper-parallax="-400"
                  className="text-xl mb-6 text-white drop-shadow-md"
                >
                  Email:{" "}
                  <span className="font-bold text-orange-400">
                    rashmikaharshamal169@gmail.com
                  </span>
                </p>
                <button
                  data-swiper-parallax="-500"
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-lime-500 text-white font-semibold rounded-full shadow-lg hover:bg-lime-400 transition"
                >
                  Login
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
