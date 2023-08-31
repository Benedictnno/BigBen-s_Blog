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
    margin: 3rem auto;
  }
  .CreatePost{
    margin: 4rem 0;
    color : #fff;
  } .Profile_Container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .Profile_Form {
    display: grid;
    
  }
  .Profile_Form input {
    width: 10rem;
  }
`;
