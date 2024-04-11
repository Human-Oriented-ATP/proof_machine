import { useEffect, useState } from "react";
import { Game } from "./Game"

export interface GameLoaderProps {
  problemFile: string
}

export function GameLoader(props: GameLoaderProps) {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const module = await import(`../problems/${props.problemFile}.json`)
      setData(module.default)
    } catch (error) {
      console.error("Failed to load the data file", error);
      setData(null)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (data) {
    return <Game problemData={data}></Game>
  } else {
    return <></>
  }

}