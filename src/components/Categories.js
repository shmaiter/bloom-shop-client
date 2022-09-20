import styled from "styled-components";
import { categories } from "../data.js";
import CategoryItem from "./CategoryItem.js";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
