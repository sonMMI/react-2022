import React, { useCallback, useEffect, useRef, useState } from 'react'
import useQuery from './useQuery'
import styled from 'styled-components'

const Button = styled.button`
  background: white;
  border: 2px solid green;
  padding: 10px 20px;
  margin: 10px auto;
  font-weight: 600;
  text-transform: uppercase;
  display: block;
  cursor: pointer;
`

const DEFAULT_OPTION = {
  stop: false,
  firstLoad: false,
}

const useInfinityQuery = ({ url, dependencies = [], opt }) => {
  const option = { ...DEFAULT_OPTION, ...opt }
  const [page, setPage] = useState(1)
  const btnRef = useRef()

  const query = useQuery(`${url}&page=${page}`)

  useEffect(() => {
    setPage(1)
  }, dependencies)

  const handleLoadMore = useCallback(() => {
    if (option.stop) return
    setPage((prev) => prev + 1)
  }, [option.stop])

  useEffect(() => {
    const btn = btnRef.current

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && option.firstLoad) {
        handleLoadMore()
      }
    })

    if (btn) observer.observe(btn)

    return () => {
      if (btn) observer.unobserve(btn)
    }
  }, [handleLoadMore, option.firstLoad])

  const BtnRender = () => {
    return (
      <Button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={option.stop}
        ref={btnRef}
      >
        Load more
      </Button>
    )
  }
  return { BtnRender, ...query }
}

export default useInfinityQuery
