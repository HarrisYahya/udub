"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Props = {
  categories: string[];
  category: string;
  setCategory: (value: string) => void;
};

export default function CategoryScroller({
  categories,
  category,
  setCategory,
}: Props) {
  return (
    <section className="p-6">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 3.5 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories.map((c) => (
          <SwiperSlide key={c}>
            <button
              onClick={() => setCategory(c || "All")}
              className={`px-4 py-2 rounded-full border w-full text-sm ${
                category === c
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {c}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}