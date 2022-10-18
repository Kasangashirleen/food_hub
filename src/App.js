import Pages from "./components/pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { BiRestaurant } from "react-icons/bi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Logo>
          <h2>FOOD HUB</h2>
          <BiRestaurant />
        </Logo>

        <Category />
        <Search />
        <Pages />
      </BrowserRouter>
    </div>
  );
}
const Logo = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-left: 0;
  width: 20%;
  svg {
    font-size: 2rem;
  }
`;

export default App;
