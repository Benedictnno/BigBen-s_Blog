import styled from "styled-components";

export const CartStyle = styled.div`

  .post-card {
    width: 500px;
    height: auto;

    background: lightgrey;
    background-color: rgb(24 27 32);
    border: 1px solid rgb(84 90 106);
    border-radius: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }

  .avatar {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: blueviolet;
    background-image: linear-gradient(
      to top left,
      blueviolet,
      rgb(73, 31, 112)
    );
  }

  .title {
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
    margin-top: 10px;
    color: #fff;
    text-decoration: none;
    transition: all 0.35s ease-in;
  }

  .title:hover {
    text-decoration: underline blueviolet;
  }

  .datetime {
    font-size: 12px;
    color: rgb(168 179 207);
    margin: 10px 0;
  }

  .image-preview {
    flex: 1;
    min-height: 150px;
    width: 100%;
    border-radius: 20px;
    background-color: blueviolet;
    background-image: linear-gradient(
      to top left,
      blueviolet,
      rgb(73, 31, 112)
    );
    margin-bottom: 4px;
  }

  .image-preview > img {
    width: 100%;
    /* height: 100%; */
  }
  .comment-like {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2px 0;
  }

  .comment-like span {
    cursor: pointer;
    height: 40px;
    width: 50px;
    padding: 0 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    border-radius: 10px;
    background-color: transparent;
    transition: all 0.15s ease;
  }

  .comment-like span:hover {
    background-color: rgba(137, 43, 226, 0.096);
  }

  .comment-like span svg {
    fill: rgb(255, 255, 255);
    margin-right: 2px;
  }
`;