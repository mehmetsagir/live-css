import { useState } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Copied from '../components/Copied'
import copyToClipboard from '../helpers/copyToClipboard'
import getOpacity from '../helpers/getOpacity'

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

  function getShadowOpacity (value) {
    setShadowOpacity(value)
    getOpacity(value, setOpacity)
  }

  return (
    <Layout>
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
          <input type="range" min="0" max="100" value={shadowOpacity} onChange={(e) => getShadowOpacity(e.target.value)} />
        </div>
      </div>

      <Review className="review" settings={{
          backgroundColor,
          boxColor,
          boxShadow
        }}>
        <div className="box">
          <input type="text" readOnly value={`box-shadow: ${boxShadow()};`} onClick={(e) => copyToClipboard(e.target, status = setCopied)} />
        </div>
      </Review>
      <Copied copied={copied} />
    </Layout>
  )
}

const Review = styled.div`
  background: ${({settings}) => settings.backgroundColor};

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
    }
  }
`