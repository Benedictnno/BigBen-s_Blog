import styled from "styled-components";

export const CreatePostStyles = styled.div`
  margin: 2em 0.5rem;

  .Markdown_container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: wrap;
  }
  form {
    display: flex;
    flex-direction: column;
  }

  .title_container {
    display: flex;
    margin-bottom: 1rem;
  }
  .markdown {
    padding: 4rem;
    display: grid;
    row-gap: 4rem;
    position: relative;
  }

  .createPost_form {
    position: fixed;
    top: 0;
    left: 10%;
    padding: 1rem;
    margin: 2em;
    border-radius: 1rem;
    background: var(--clr-grey-9);
  }

  .input {
    border-color: transparent;
    border-radius: var(--radius);
    font-size: 1.2rem;
    line-height: 2;
    box-shadow: var(--dark-shadow);
    min-height: 30vh;
  }

  .input,
  .result {
    padding: 1rem 2rem;
  }

  @media screen and (min-width: 992px) {
    .markdown {
      min-height: 100vh;
      grid-template-columns: 1fr 1fr;
      column-gap: 4rem;
    }
  }

  @media screen and (max-width: 425px) {
    .title_container {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
    }

    .top_btn_container {
      display: flex;
      /* flex-direction: column; */
    }
  }

  /* unique styles */
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  blockquote {
    font-size: 2rem;
    font-style: italic;
    border-left: 5px solid var(--clr-grey-5);
    color: var(--clr-grey-5);
    padding-left: 2rem;
    line-height: 2;
    margin-bottom: 1.5rem;
  }

  blockquote ::first-letter {
    text-transform: uppercase;
  }

  pre {
    background: #222;
    display: inline-block;
    border-radius: var(--radius);
    padding: 1rem 2rem;
    color: yellow;
    margin-bottom: 1.5rem;
  }
`;
