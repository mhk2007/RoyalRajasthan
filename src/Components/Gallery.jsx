import React from "react";

const images = [
  "/download.webp",
  "/ghujia.jpg",
  "/mawa-kachori.webp",
  "/rajasthani-ghevar.jpg"
];

const Gallery = () => {
  return (
    <div className="bg-yellow-50 px-6 py-10 md:py-12">

      <h2 className="mb-6 text-center text-4xl font-extrabold text-red-900">
        📸 Royal Food Gallery
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">

        {images.map((img, i) => (
          <div
            key={i}
            className="self-start overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src={img}
              alt="Rajasthani Food"
              className="mx-auto block h-48 w-auto max-w-full"
            />
          </div>
        ))}

      </div>

    </div>
  );
};

export default Gallery;
