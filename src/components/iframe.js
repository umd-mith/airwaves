import React from "react"

export default function IFrame({
  title,
  src,
  width = "100%",
  height,
  frameborder = "0",
}) {
  return (
    <iframe
      title={title}
      width={width}
      height={height}
      frameBorder={frameborder}
      src={src}
    ></iframe>
  )
}
