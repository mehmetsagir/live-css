import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Copied from '../components/Copied'
import copyToClipboard from '../helpers/copyToClipboard'

export default function Home() {
  const [horizontalLength, setHorizontalLength] = useState(10)
  const [verticalLength, setVerticalLength] = useState(10)
  const [blurRadius, setBlurRadius] = useState(5)
  const [shadowColor, setShadowColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [opacity, setOpacity] = useState(1)
  const [shadowOpacity, setShadowOpacity] = useState(100)
  const [copied, setCopied] = useState(false)


  useEffect(() => {
    if(shadowOpacity == 100 || shadowOpacity == 0) {
      shadowOpacity == 100 ? setOpacity(1) : setOpacity(shadowOpacity)
      return;
    } 

    shadowOpacity < 10 ? setOpacity('0.0' + shadowOpacity) : setOpacity('0.' + shadowOpacity)
  }, [shadowOpacity])

  function dropShadow(){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(shadowColor)){
        c= shadowColor.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return `drop-shadow(${horizontalLength}px ${verticalLength}px ${blurRadius}px rgba(${[(c>>16)&255, (c>>8)&255, c&255].join(',')}, ${opacity}))`
    }
  }

  return (
    <Container settings={{
      backgroundColor,
      dropShadow
    }
    }>
      <div className="settings">
        <div className="row">
          <p>Horizontal Length <span>{ horizontalLength }px</span></p>
          <input type="range" min="-200" max="200" value={horizontalLength} onChange={(e) => setHorizontalLength(e.target.value)} />
        </div>
        <div className="row">
          <p>Vertical Length <span>{ verticalLength }px</span></p>
          <input type="range" min="-200" max="200" value={verticalLength} onChange={(e) => setVerticalLength(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Blur Radius <span>{ blurRadius }px</span></p>
          <input type="range" min="0" max="300" value={blurRadius} onChange={(e) => setBlurRadius(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Shadow Color <span>{ shadowColor }</span></p>
          <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Background Color <span>{ backgroundColor }</span></p>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Opacity <span>{ opacity }</span></p>
          <input type="range" min="0" max="100" value={shadowOpacity} onChange={(e) => setShadowOpacity(e.target.value)} />
        </div>
      </div>

      <div className="review">
        <img src="images/avatar.png" alt="Picture of the author" />
        <input type="text" readOnly value={`filter: ${dropShadow()};`} onClick={(e) => copyToClipboard(e.target, status = setCopied)} />
      </div>
      <Copied copied={copied} />
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
    height: 550px;
    background: ${({settings}) => settings.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    img {
      width: 350px;
      filter: ${({settings}) => settings.dropShadow};
    }

    input {
      width: 55%;
      height: 40px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      z-index: 10;
    }
    
  }
`