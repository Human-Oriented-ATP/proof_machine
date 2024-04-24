import { useEffect, useState } from "react";
import { Game } from "./Game"
import { promises as fs } from "fs"

export interface GameLoaderProps {
  problemFile: string
  goToHomeScreen: () => void
}

export function GameLoader(props: GameLoaderProps) {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const module = await fs.readFile(`../../problems/${props.problemFile}.json`, "utf-8")
      setData(JSON.parse(module))
    } catch (error) {
      console.error("Failed to load the data file", error);
      setData(null)
    }
  }

  useEffect(() => {
    loadData()
  })

  if (data) {
    return <Game problemData={data} goToHomeScreen={props.goToHomeScreen}></Game>
  } else {
    return <></>
  }

}