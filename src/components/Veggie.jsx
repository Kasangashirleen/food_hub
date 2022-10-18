import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Veggetarian Picks</h3>
        <Splide
          options={{
            perPage: 4,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {veggie.map((recipe) => {
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
  // border: 1px solid black;
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

export default Veggie;
