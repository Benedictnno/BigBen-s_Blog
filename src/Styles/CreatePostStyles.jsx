import styled from "styled-components";


export const CreatePostStyles = styled.div`
  display: flex;

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