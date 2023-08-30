import styled from "styled-components";

export const SinglePageStyles = styled.div`
  section {
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .SinglePage_nav {
    display: flex;
    justify-content: space-between;
    background: var(--clr-grey-5);
    padding: 1.5rem;
  }
  .single_page_img {
    width: 80%;
    height: auto;
    margin: 2rem;
  }
  .SinglePage_nav > h1 {
    color: #fff;
  }
  .Single_text {
    display: flex;

    justify-self: start;
    margin: 1rem 2rem;
  }
`;
