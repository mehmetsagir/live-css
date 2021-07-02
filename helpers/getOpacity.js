export default function getOpacity(shadowOpacity, setOpacity) {
  if(shadowOpacity == 100 || shadowOpacity == 0) {
    shadowOpacity == 100 ? setOpacity(1) : setOpacity(shadowOpacity)
    return;
  } 
  
  shadowOpacity < 10 ? setOpacity('0.0' + shadowOpacity) : setOpacity('0.' + shadowOpacity)
}