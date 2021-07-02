import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Copied from '../components/Copied'
import copyToClipboard from '../helpers/copyToClipboard'

export default function Home() {
  const [allCorners, setAllCorners] = useState(10)
  const [topLeft, setTopLeft] = useState(10)
  const [topRight, setTopRight] = useState(10)
  const [bottomLeft, setBottomLeft] = useState(10)
  const [bottomRight, setBottomRight] = useState(10)
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderStyle, setBorderStyle] = useState('solid')
  const [borderColor, setBorderColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#00bac7')
  const [copied, setCopied] = useState(false)

  function copyText() {
    return `
border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;
border: ${borderWidth}px  ${borderStyle} ${borderColor};`
  }

  useEffect(() => {
    setTopLeft(allCorners)
    setTopRight(allCorners)
    setBottomLeft(allCorners)
    setBottomRight(allCorners)
  }, [allCorners])

  return (
    <Container>
      <div className="settings">
        <div className="row">
          <p>All Corners <span>{ allCorners }px</span></p>
          <input type="range" min="0" max="400" value={allCorners} onChange={(e) => setAllCorners(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Top Left <span>{ topLeft }px</span></p>
          <input type="range" min="0" max="400" value={topLeft} onChange={(e) => setTopLeft(e.target.value)} />
        </div>
        <div className="row">
          <p>Top Right <span>{ topRight }px</span></p>
          <input type="range" min="0" max="400" value={topRight} onChange={(e) => setTopRight(e.target.value)} />
        </div>
        <div className="row">
          <p>Bottom Left <span>{ bottomLeft }px</span></p>
          <input type="range" min="0" max="400" value={bottomLeft} onChange={(e) => setBottomLeft(e.target.value)} />
        </div>
        <div className="row">
          <p>Bottom Right <span>{ bottomRight }</span></p>
          <input type="range" min="0" max="400" value={bottomRight} onChange={(e) => setBottomRight(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Border Width <span>{ borderWidth }</span></p>
          <input type="range" min="0" max="150" value={borderWidth} onChange={(e) => setBorderWidth(e.target.value)} />
        </div>
        <div className="row my-10">
          <p>Border Style</p>
          <select onChange={(e) => setBorderStyle(e.target.value)}>
            <option>solid</option>
            <option>dotted</option>
            <option>dashed</option>
            <option>double</option>
            <option>groove</option>
            <option>ridge</option>
            <option>inset</option>
            <option>outset</option>
          </select>
        </div>
        <div className="row">
          <p>Border Color <span>{ borderColor }</span></p>
          <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
        </div>
        <div className="br"></div>
        <div className="row">
          <p>Background Color <span>{ backgroundColor }</span></p>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
        </div>
      </div>

      <Review className="review" settings={{
        backgroundColor,
        topLeft,
        topRight,
        bottomRight,
        bottomLeft,
        borderWidth,
        borderColor,
        borderStyle
      }}>
        <div className="box"></div>
        <textarea readOnly value={copyText().trim()} onClick={(e) => copyToClipboard(e.target, status = setCopied)} >{copyText()}</textarea>
      </Review>
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

const Review = styled.div`
  .box {
    background: ${({settings}) => settings.backgroundColor};
    border-radius: ${({settings}) => `${settings.topLeft}px ${settings.topRight}px ${settings.bottomRight}px ${settings.bottomLeft}px`};
    width: 400px;
    height: 400px;
    border: ${({settings}) => `${settings.borderWidth}px  ${settings.borderStyle} ${settings.borderColor}`}
  }
  textarea {
    width: 50%;
    height: max-content;
    resize: none;
    padding: 8px;
    border: 1px solid #ccc;
  }
`