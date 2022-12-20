import { useEffect, useRef, useCallback } from 'react'
// import io from 'figmaio/ui'
import { io_ui as io } from 'kiss-msg'
io?.send('ui:ready', '22')
const App = () => {
  const textbox = useRef<HTMLInputElement>()

  const countRef = useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5'
    textbox.current = element
  }, [])

  const onCreate = () => {
    const count = parseInt(textbox.current?.value || '', 10)
    io?.send('create-rectangles', count)
  }

  const onCancel = () => {
    io?.send('ui:cancel')
  }

  useEffect(() => {
    io?.on('hook:hello', (msg) => {
      console.log('msg', msg)
    })
  }, [])

  return (
    <div>
      <p>
        Count: <input ref={countRef} />
      </p>
      <div>
        <button id="create" onClick={onCreate}>
          Create
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div >
  )
}

export default App
