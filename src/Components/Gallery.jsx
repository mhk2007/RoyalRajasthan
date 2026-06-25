import React from "react";

const images = [
  "/download.webp",
  "/ghujia.jpg",
  "/mawa-kachori.webp",
  "/rajasthani-ghevar.jpg"
];

const Gallery = () => {
  return (
    <div className="py-16 px-6 bg-yellow-50">

      <h2 className="text-4xl text-center font-extrabold mb-10 text-red-900">
        📸 Royal Food Gallery
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl shadow-lg group"
          >
            <img
              src={img}
              alt="Rajasthani Food"
              className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
            />
          </div>
        ))}

      </div>

    </div>
  );
};

export default Gallery;