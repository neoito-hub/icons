import { Global, jsx } from '@emotion/core'
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import IconButton from './components/icon-button'
import SearchInput from './components/search-input'
import theme from './theme'
import './ui.css'
import useSearch from './use-search'

function App() {
  const [icons, setIcons] = useState([])
  const [iconData, setIconData] = useState('')
  const [command, setCommand] = useState('search_icon')
  const [query, setQuery] = React.useState('')
  let results = useSearch(query, icons)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/neoito-hub/icons/main/icons.json?cache=' + Date.now())
      .then(response => response.json())
      .then(data => {
        setIcons(data)
        setQuery(' ')
      });
    onmessage = (event) => {
      // console.log("got this from the plugin code", event.data.pluginMessage)
      setCommand(event.data.pluginMessage.type)
      setIconData(JSON.stringify(event.data.pluginMessage.data, null, 2))
    }

  }, [])
  return (
    <div>
      <Global
        styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
      />
      {command === 'search_icon' ? <Fragment>
        <SearchInput
          icons={icons}
          value={query}
          onChange={event => setQuery(event.target.value)}
          css={{
            position: 'sticky',
            top: 0,
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        />
        <div css={{ padding: theme.space[2] }}>
          <div
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridGap: theme.space[1],
            }}
          >
            {results.map((icon, index) => (
              <IconButton key={index} name={icon.name} contents={icon.svg} />
            ))}
          </div>
          <div
            css={{
              marginTop: theme.space[2],
              padding: theme.space[2],
              fontSize: theme.fontSizes[0],
              color: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            NeoICONS v1
        </div>
        </div>
      </Fragment>
        : <Fragment>
          <textarea css={{
            height: "100%",
            width: "100%"
          }}
            defaultValue={iconData} >

          </textarea>
        </Fragment>}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
