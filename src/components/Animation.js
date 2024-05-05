import React, { useState, useEffect } from 'react';
import snoopy from '../images/snoopy.gif';
import accat from '../images/accat.gif';
import catfire from "../images/cat-fire.gif";
import dumbcat from '../images/dumbcat.gif';

const images = [snoopy, accat, catfire, dumbcat];

const Animation = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    shuffleImages();
  }, []);

  const shuffleImages = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  };

  return (
    <div className='pt-5 mt-5'>
      <img src={images[currentImageIndex]} alt="Weather Animation" width="400" height="400" />
    </div>
  );
};

export default Animation;
