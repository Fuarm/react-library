import { useEffect, useRef } from "react"
import LibraryScene from "./babylonjs"

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const libraryScene = new LibraryScene(canvas.current!)
    libraryScene.loadModel()
    setTimeout(() => {
      const nav = {
        key: 1,
        text: '图书区',
        names: ['Etageres_Books'],
        animation: {
          position: [15, 10, -5],
          target: [2.3, 0, -2.3],
        },
      }
      libraryScene.selectModel(nav.names, nav.animation)
    }, 1000)
  }, [])

  return (
    <>
      <canvas className="w-full h-full" ref={canvas}></canvas>
    </>
  )
}

export default App