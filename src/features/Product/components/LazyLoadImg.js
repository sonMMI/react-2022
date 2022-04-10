import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const StyleImg = styled.img`
  width: 100%;
  height: 300px;
  display: block;
  object-fit: cover;
  transform: scale(0.7);
  transition: 0.5s ease-in-out;

  &.active {
    transform: scale(1);
  }
`

const LazyLoadImg = ({ url, title }) => {
  const imgRef = useRef()
  useEffect(() => {
    const img = imgRef.current

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute('src', url)
        img.classList.add('active')
      }
    })

    if (img) observer.observe(img)

    return () => {
      if (img) observer.unobserve(img)
    }
  }, [url])
  return <StyleImg alt={title} ref={imgRef} />
}

export default LazyLoadImg
