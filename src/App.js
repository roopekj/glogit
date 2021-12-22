import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import reviewsData from "./reviews.csv"

const Glogi = (data) => {
  return (
    <div class="glogi">
      <div class="glogi-image">
        <img src={`${process.env.PUBLIC_URL}/img/${data.fname}`}></img>
      </div>
      <div class="glogi-teksti">
        <h1>{data.name}</h1>
        <h2>{data.score}/10</h2>
        <p>{data.review}</p>
      </div>
    </div>
  )
}

const App = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [gallery, setGallery] = useState([])
  const [gallerySet, setGallerySet] = useState(false)

  useEffect(() => {
    fetch(reviewsData)
      .then((res) => res.text())
      .then((res) => {
        let output = []
        let lines = res.split("\n")
        lines.shift()
        lines.forEach(line => {
          const parts = line.split(";");
          if (parts.length === 4) {
            output.push({ name: parts[0], score: parts[1], review: parts[2], fname: parts[3] });
          }
        })
        setReviews(output)
      })
      .finally(setIsLoading(false));
  }, []);

  const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef();

    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
      const eventListener = (event) => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    }, [eventName, element]);
  };

  const handler = ({ key }) => {
    if (["F9", "120"].includes(String(key))) {
      setGallery(["gallery.png"])
      setGallerySet(true)
    }
  };

  useEventListener("keydown", handler);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          reviews.map(review => {
            return (
              <div key={review.name}>
                <Glogi fname={review.fname} name={review.name} score={review.score} review={review.review} />
              </div>
            )
          })
        )}

        {gallerySet ? (
          <div class="gallery">
            {
              gallery.map(image => {
                return (
                  <img src={`${process.env.PUBLIC_URL}/img/${image}`}></img>
                )
              })
            }
          </div>
        ) : (
          <br />
        )}
      </header>
      <a href="https://github.com/roopekj" id="link">Roope Kajoluoto</a>
    </div>
  );
}

export default App;
