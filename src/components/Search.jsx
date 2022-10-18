import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };
  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
}
const FormStyle = styled.form`
  margin: 0rem 19rem;
  position: relative;
  position: relative;
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    padding: 0.65rem 2.5rem;
    color: white;
    border: none;
    border-radius: 1rem;
    outline: none;
  }

  svg {
    position: absolute;
    color: white;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
  }
`;

export default Search;
