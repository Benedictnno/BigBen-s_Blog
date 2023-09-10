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

    height: 70vh;
    margin: 2rem;
    background-size: cover;
    background-position: center;

    filter: brightness(110%);
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

  .likeBtn_container {
    position: fixed;
    left: 2rem;
    bottom: 5rem;
    cursor: pointer;
    background: #fff;
    padding: 5px;
    border-radius: 5px;
  }
  .likeBtn {
    display: grid;
    place-content: center;
  }
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
    width: 300px;
  }

  .similar_container {
    margin: 2rem;
  }

  .title {
    font-weight: 500;
    text-transform: capitalize;
    text-overflow: ellipsis;
    font-size: var(--main-font-size);
  }
  .commentText_container {
    display: flex;
  }
  .commentText_container > span {
    margin: -1rem 0.1rem 0 3.7rem;
  }
  .comment_container {
    margin: 1rem 0;
  }

  .commentText {
    /* margin: -0.75rem auto 0 ; */
    padding: 0.3rem;
    width: 500px;
    /* background: #fff; */
  }

  .comment {
    display: flex;
    flex-direction: column;
  }

  .comment > button {
    margin: 1rem 0 5rem;
  }

  @media screen and (max-width: 768px) {
    .comments-similar {
      display: flex;
      flex-direction: column;
      /* justify-content: space-between; */
    }
  }
`;
