import styled from "styled-components";

export const SinglePageStyles = styled.div`
  .SinglePage_Details {
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-transform: capitalize;
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
  .comments-similar {
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
  }

  .comments-similar-detail {
    display: flex;
    align-items: center;
    justify-self: start;
  }

  /* .similar-author {
    display: flex;
margin-top: -3rem;
    justify-self: self-start;
  } */
  .comments-similar-Profile_img {
    width: 50px;
    height: 50px;
  }
  .similar_details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin-left: 3rem; */
  }

  .similar_mainImg {
    width: 85%;
  }

  .similar_container {
    margin: 2rem 2rem;
  }

  .title {
    font-weight: 500;
    text-transform: capitalize;
    text-overflow: ellipsis;
    font-size: var(--main-font-size);
  }
`;
