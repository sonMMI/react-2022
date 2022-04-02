import React from 'react'
import styled from 'styled-components'

const StyledModal = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: #1114;
  overflow: auto;
  padding: 0 5px;
`

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  background: rgb(250, 250, 250);
  border-radius: 5px;
  box-shadow: 2px 8px 20px #ccc;
  padding: 1.5rem 1rem;
  position: relative;
  margin: 5rem auto;

  & > h3 {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    color: #555;
    letter-spacing: 0.2rem;
  }

  & > span {
    position: absolute;
    top: 0;
    right: 8px;
    color: crimson;
    font-size: larger;
    font-weight: 600;
    cursor: pointer;
  }
`

const Modal = ({ children, titleText, setOpen }) => {
  return (
    <StyledModal>
      <Container>
        <h3>{titleText}</h3>
        {children}
        <span onClick={() => setOpen(false)}>&#10006;</span>
      </Container>
    </StyledModal>
  )
}

export default Modal
