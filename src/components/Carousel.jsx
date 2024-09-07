import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  const handleNextClick = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative max-w-full mx-auto">
      {/* Carousel container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 96}px)` }} // Adjusted for fixed width
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-96" // Fixed width for each image container
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover h-64 md:h-[400px]" // Adjust height as needed
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            } focus:outline-none`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
