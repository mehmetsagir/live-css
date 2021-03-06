import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {

  const router = useRouter()

  function activeClass(href) {
    if(router.pathname === href) {
      return 'active'
    }
  }

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <title>Live CSS</title>
      </Head>
      <div className="container">
        <NavContainer>
          <Link exect href="/">
            <a>
              <h3>LiveCSS</h3>
            </a>
          </Link>
          <nav>
            <Link exect href="/">
              <a className={activeClass('/')}>Box Shadow</a>
            </Link>
            <Link href="/drop-shadow">
              <a className={activeClass('/drop-shadow')}>Drop Shadow</a>
            </Link>
            <Link href="/text-shadow">
              <a className={activeClass('/text-shadow')}>Text Shadow</a>
            </Link>
            <Link href="/border-radius">
              <a className={activeClass('/border-radius')}>Border Radius</a>
            </Link>
          </nav>
        </NavContainer>
        <Component {...pageProps} />
      </div>
    </>
  )
}

const NavContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 35px;
    font-weight: 400;
  }

  nav a {
    opacity: 0.5;
    transition: 250ms;
    &.active,
    &:hover {
      opacity: 1;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`
export default MyApp
