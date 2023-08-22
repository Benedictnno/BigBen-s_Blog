import styled from "styled-components";

export const SetUpProfileStyles = styled.div`
  .container {
    position: relative;
    max-width: 500px;
    width: 100%;
    background: #fcedda;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .container header {
    font-size: 1.2rem;
    color: #000;
    font-weight: 600;
    text-align: center;
  }

  .container .form {
    margin-top: 15px;
  }

  .form .input-box {
    width: 100%;
    margin-top: 10px;
  }

  .input-box label {
    color: #000;
  }

  .form :where(.input-box input, .select-box) {
    position: relative;
    height: 35px;
    width: 100%;
    outline: none;
    font-size: 1rem;
    color: #808080;
    margin-top: 5px;
    border: 1px solid #ee4e34;
    border-radius: 6px;
    padding: 0 15px;
    background: #fcedda;
  }

  .input-box input:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  .form .column {
    display: flex;
    column-gap: 15px;
  }

  .form .gender-box {
    margin-top: 10px;
  }

  .form :where(.gender-option, .gender) {
    display: flex;
    align-items: center;
    column-gap: 50px;
    flex-wrap: wrap;
  }

  .form .gender {
    column-gap: 5px;
  }

  .gender input {
    accent-color: #ee4e34;
  }

  .form :where(.gender input, .gender label) {
    cursor: pointer;
  }

  .gender label {
    color: #000;
  }

  .address :where(input, .select-box) {
    margin-top: 10px;
  }

  .select-box select {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    color: #808080;
    font-size: 1rem;
    background: #fcedda;
  }

  .form button {
    height: 40px;
    width: 100%;
    color: #000;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #ee4e34;
  }

  .form button:hover {
    background: #ee3e34;
  }
`;