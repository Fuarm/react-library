import { useEffect, useRef } from "react"
import LibraryScene from "./babylonjs"

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const libraryScene = new LibraryScene(canvas.current!)
    libraryScene.loadModel()
  }, [])

  return (
    <>
      <canvas className="w-full h-full" ref={canvas}></canvas>
    </>
  )
}

export default App