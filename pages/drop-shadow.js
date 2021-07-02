/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
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
    <Layout shadowOpacity={shadowOpacity} setOpacity={setOpacity}>
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

      <Review className="review" settings={{ backgroundColor, dropShadow }}>
        <img src="images/avatar.png" alt="Picture of the author" />
        <input type="text" readOnly value={`filter: ${dropShadow()};`} onClick={(e) => copyToClipboard(e.target, status = setCopied)} />
      </Review>
      <Copied copied={copied} />
    </Layout>
  )
}

const Review = styled.div`
  background: ${({settings}) => settings.backgroundColor};

  img {
    width: 350px;
    filter: ${({settings}) => settings.dropShadow};
  }

  input {
    width: 55%;
  }
`