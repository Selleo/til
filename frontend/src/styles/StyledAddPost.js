import styled from 'styled-components'

const StyledAddPost = styled.div`
  .add-post-main {
    display: flex;
  }

  .add-post-button {
    background-color: #f4cb00;
    border: none;
    border-radius: 10px;
    color: #1f1f1f;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    height: 48px;
    padding: 10px;
    text-align: center;
    text-transform: uppercase;
    outline: none;
    width: 180px;
  }

  .add-post-button:disabled {
    background: none;
    border-radius: 10px;
    border: 1px solid #8a8a8a;
    color: #8a8a8a;
    font-size: 16px;
    font-weight: 500;
    height: 48px;
    text-transform: uppercase;
    outline: none;
    width: 180px;
  }

  .add-post-buttons {
    display: flex;
    justify-content: center;
    margin-top: 170px;
  }

  /* todo - name it :) */
  .to-be-named {
    flex-basis: 45%;
    margin-right: 72px;
  }

  .add-post-header {
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.48px;
    margin-bottom: $m-base;
  }

  .add-post-title {
    background: #343434;
    border-radius: 10px;
    border: 1px solid #8a8a8a;
    caret-color: #8a8a8a;
    color: #8a8a8a;
    font-size: 16px;
    height: 48px;
    letter-spacing: 0.48px;
    margin-bottom: 16px;
    opacity: 1;
    outline: none;
    padding-left: 16px;
    width: 100%;
  }

  .checkboxes {
    margin-top: 40px;
  }

  .checkbox {
    display: flex;
    align-items: center;
    margin-top: 16px;
    label {
      font-size: 16px;
      margin-left: 5px;
      margin-top: 4px;
    }
  }

  .cancel-post-button {
    background: none;
    border-radius: 10px;
    border: 1px solid #8a8a8a;
    color: #8a8a8a;
    font-size: 16px;
    font-weight: 500;
    height: 48px;
    margin-left: 80px;
    outline: none;
    text-transform: uppercase;
    width: 180px;
  }

  input[type='text']::placeholder {
    color: #8a8a8a;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 500;
    letter-spacing: 0.48px;
    margin-left: 16px;
    opacity: 1;
    text-align: left;
  }
`

export default StyledAddPost
