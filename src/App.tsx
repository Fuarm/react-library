import { ActionEvent } from "@babylonjs/core"
import { useEffect, useRef } from "react"
import LibraryScene from "./babylonjs"
import meshInfos from "./meshInfos"

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const libraryScene = new LibraryScene(canvas.current!, evt => {
      const { loaded, total } = evt
      loaded === total && setTimeout(() => {
        libraryScene.registerAction(
          meshInfos.map(item => item.names).flat(),
          evt => {
            const meshName = evt.meshUnderPointer!.name
            libraryScene.selectModel(
              [meshName],
              meshInfos.filter(item => item.names[0] === meshName)[0].animation
            )
          }
        )
      }, 100)
    })
  }, [])

  return (
    <>
      <canvas className="w-full h-full" ref={canvas}></canvas>
    </>
  )
}

export default App