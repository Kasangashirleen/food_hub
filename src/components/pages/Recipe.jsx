import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };
  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  return (
    <Wrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="recipe" />
      </div>
      <Info>
        <div>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingridients" ? "active" : ""}
            onClick={() => setActiveTab("ingridients")}
          >
            Ingridients
          </Button>
        </div>
        {activeTab === "instructions" && (
          <span>
            <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </span>
        )}
        {activeTab === "ingridients" && (
          <ul>
            {details.extendedIngredients.map((ingridient) => (
              <li key={ingridient.id}>{ingridient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  div {
    width: 100%;
  }
  img {
    width: 100%;
    border-radius: 1rem;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 4rem;
  font-weight: 600;
  width: 10rem;
`;
const Info = styled.div`
  margin-left: 8rem;
  div {
    display: flex;
    margin-bottom: 2rem;
  }
  span {
    line-height: 1.5rem;
    p{
      margin-top: 2rem;
      line-height: 2rem;
    }
  }
`;

export default Recipe;
