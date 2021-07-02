export default function copyToClipboard(target, status) {
  target.select()
  document.execCommand('copy')
  status(true)
  setTimeout(() => {
    status(false)
  }, 1500);
}