import styled from "styled-components";

export const ProfilePageStyles = styled.section`
  margin: 2rem;
  .singlePostDetail {
    display: flex;
    flex-direction: column;
    margin-left: 0.75rem;
  }
  .singlePostDetail_container {
    display: flex;
    flex-direction: row;
    width: 600px;
    height: 200px;
  }
  .profile_post_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 3rem 0;
  }
  .CreatePost {
    margin: 4rem 0.3rem;
    color: #fff;
  }
  .Profile_Container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: var(--clr-primary-1);
    color: #fff;
    padding: 1rem;
    border-radius: 7px;
    margin: -2rem;
  }

  .Profile_Form {
    display: flex;
    font-size: var(--main-font-size);
    font-family: var(--main-fontFamily);
    margin: 0 0 0 -10rem;
  }

  .Profile_Form > div {
    display: flex;
    flex-direction: column;
  }

  .authorDetails {
    color: #fff;
  }

  @media screen and (max-width: 425px) {
    margin: 2rem 0 0 1.5rem;

    .Profile_Container {
      display: flex;
      flex-direction: column;
    }
    .Selector{
      width: 5rem;
    } .Profile_Form {
      display: flex;
      flex-direction: column;
      margin: 1rem 0;
    }
  }
`;
