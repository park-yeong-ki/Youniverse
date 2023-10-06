import React, { memo, useEffect } from "react";
import "./StarryBackground.css";

const StarryBackground: React.FC = () => {
  const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  useEffect(() => {
    const style = ["style1", "style2"];
    const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    const opacity = [
      "opacity1",
      "opacity1",
      "opacity1",
      "opacity2",
      "opacity2",
      "opacity3",
    ];

    const noite = document.querySelector(".constelacao");
    const widthWindow = window.innerWidth;
    const heightWindow = window.innerHeight;

    for (let i = 0; i < 100; i++) {
      const starElem = document.createElement("span");
      starElem.classList.add(
        "estrela",
        style[getRandomArbitrary(0, 2)],
        opacity[getRandomArbitrary(0, 6)],
        tam[getRandomArbitrary(0, 5)]
      );
      starElem.style.animationDelay = `.${getRandomArbitrary(0, 9)}s`;
      starElem.style.left = `${getRandomArbitrary(0, widthWindow)}px`;
      starElem.style.top = `${getRandomArbitrary(0, heightWindow)}px`;

      if (noite) {
        noite.appendChild(starElem);
      }
    }
  }, []);
  return (
    <>
      <div className="noite"></div>
      <div className="constelacao"></div>
    </>
  );
};

export default memo(StarryBackground);
