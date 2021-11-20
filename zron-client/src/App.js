import { useCallback } from 'react'

import { Tldraw } from '@tldraw/tldraw'

const App = () => {
  const onChange = useCallback(
    /**
     * @param {import('@tldraw/tldraw').TldrawApp} app
     */
    (app, reason) => {
      console.log(app.getAppState())
    },
    []
  )

  return <Tldraw onPersist={onChange} />
}

export default App
