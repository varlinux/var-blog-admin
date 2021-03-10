export function getImageArrBuffer(url) {
  const r = new XMLHttpRequest()
  r.open("GET", url, false)
  r.overrideMimeType('text/plain; charset=x-user-defined')
  r.send(null)
  return r.responseText
  // const arrayBuffer = binaryToArrayBuffer(r.responseText)
  // const unit16 = new Uint16Array(arrayBuffer)
  // return binaryToArrayBuffer(r.responseText)
  // const arrayBuffer = binaryToArrayBuffer(r.responseText)
  // arrayBuffer.name = arrayBuffer.fileName = url.substring(url.lastIndexOf('/') + 1)
  // arrayBuffer.fileType = "image/jpeg"; //"image/octet-stream"
  // return arrayBuffer
}

export function binaryToArrayBuffer(data) {
  const arr = new Uint8Array(data.length)
  let i = 0, l = data.length
  for (; i < l; i++) {
    arr[i] = data.charCodeAt(i)
  }
  return arr.buffer
}

export function getImageBinary(url) {
  const r = new XMLHttpRequest()
  r.open("GET", url, false)
  r.overrideMimeType('text/plain; charset=x-user-defined')
  r.send(null)
  return r.responseText
}
