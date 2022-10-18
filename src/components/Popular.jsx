import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            pagination: false,
            drag: "free",
            // direction: 'ltr'|'rtl',
            // wheel: true,
            // releaseWheel: true,
            gap: "2rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>
                  <Card>
                    <img src={recipe.image} alt={recipe.title} />
                    <p>{recipe.title}</p>
                  </Card>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
  padding: 0.5rem;
  background: ivory;
`;

const Card = styled.div`
  min-height: 18rem;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  background: beige;
  border: 1px solid grey;
  // margin: 5px;

  img {
    border-radius: 0.5rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%, 75%);

    color: black;
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 0.9rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Popular;
