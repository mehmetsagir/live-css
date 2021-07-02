import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Home() {
  const [horizontalLength, setHorizontalLength] = useState(10)
  const [verticalLength, setVerticalLength] = useState(10)
  const [blurRadius, setBlurRadius] = useState(5)
  const [spreadRadius, setSpreadRadius] = useState(0)
  const [shadowColor, setShadowColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [boxColor, setBoxColor] = useState('#00bac7')
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

  function boxShadow(){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(shadowColor)){
        c= shadowColor.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return `${horizontalLength}px ${verticalLength}px ${blurRadius}px ${spreadRadius}px rgba(${[(c>>16)&255, (c>>8)&255, c&255].join(',')}, ${opacity})`
    }
  }

  function copyToClipboard(target) {
    target.select()
    document.execCommand('copy')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500);
  }

  return (
    <Container settings={{
      backgroundColor,
      boxColor,
      boxShadow,
      copied
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
        <div className="row">
          <p>Spread Radius <span>{ spreadRadius }px</span></p>
          <input type="range" min="-200" max="200" value={spreadRadius} onChange={(e) => setSpreadRadius(e.target.value)} />
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
          <p>Box Color <span>{ boxColor }</span></p>
          <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Opacity <span>{ opacity }</span></p>
          <input type="range" min="0" max="100" value={shadowOpacity} onChange={(e) => setShadowOpacity(e.target.value)} />
        </div>
      </div>

      <div className="review">
        <div className="box">
          <input type="text" readOnly value={`box-shadow: ${boxShadow()};`} onClick={(e) => copyToClipboard(e.target)} />
        </div>
      </div>
      <div className="copied">
        Copied!
      </div>
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
    display: grid;
    place-items: center;

    .box {
      width: 370px;
      height: 370px;
      background: ${({settings}) => settings.boxColor};
      box-shadow: ${({settings}) => settings.boxShadow};
      display: grid;
      place-items: center;
      z-index: 4;
      input {
        width: 90%;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
    }
  }
  .copied {
    width: 200px;
    line-height: 30px;
    padding: 5px 15px;
    border-radius: 3px;
    color: #fff;
    background: green;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    display: ${({settings}) => settings.copied ? 'block' : 'none'};
    animation: fade 300ms forwards;
  }
  @keyframes fade {
    from {
      top: 0;
      opacity: 0;
    }
    to{
      top: 30px;
      opacity: 1;
    }
  }
`