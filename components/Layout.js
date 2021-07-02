import { useEffect } from 'react';
import styled from 'styled-components'

const Layout = ({shadowOpacity, setOpacity, children}) => {

  useEffect(() => {
    if(shadowOpacity == 100 || shadowOpacity == 0) {
      shadowOpacity == 100 ? setOpacity(1) : setOpacity(shadowOpacity)
      return;
    } 

    shadowOpacity < 10 ? setOpacity('0.0' + shadowOpacity) : setOpacity('0.' + shadowOpacity)
  }, [setOpacity, shadowOpacity])

  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.main`
  padding: 50px 0;
  display: flex;

  .settings {
    max-width: max-content;
    display: flex;
    flex-direction: column;
    padding-right: 100px;
    .br {
      border-top: 1px dashed #ccc;
      margin: 20px 0;
    }
    .row {
      width: 300px;
      p {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
      input {
        width: 100%;
      }
    }
  }
  .review {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    input {
      height: 40px;
      min-height: 40px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      z-index: 10;
    }
  }
`

export default Layout
