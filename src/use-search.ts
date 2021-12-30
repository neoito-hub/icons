import Fuse from 'fuse.js'
import React from 'react'
import { Icon } from './app-types'

function useSearch(query: string, icons: Icon[]) {
  const [results, setResults] = React.useState(icons)

  const fuse = new Fuse((icons), {
    threshold: 0.2,
    keys: ['name', 'tags'],
  })

  React.useEffect(() => {
    if (query.trim()) {
      setResults(fuse.search(query.trim()))
    } else {
      setResults(icons)
    }
  }, [query])

  return results
}

export default useSearch
