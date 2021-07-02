import styled from 'styled-components'

const Layout = ({children}) => {
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
      select {
        width: 100%;
        height: 30px;
        appearance: none;
        border: 1px solid #ccc;
        padding: 0 4px;
        font-size: 14px;
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
  .my-10 {
    margin: 10px 0;
  }
`

export default Layout
