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
      width={width}
      height={height}
      frameborder={frameborder}
      src={src}
    ></iframe>
  )
}
