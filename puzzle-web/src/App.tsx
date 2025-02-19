import { FC, useEffect, useState } from 'react';
import './App.css'
import Grass from './Components/Grass'
import Wall from './Components/Wall';
import Heart from './Components/Heart';
import Player from './Components/Player';
import TempWall from './Components/TempWall';

const elements: FC[] = [Grass, Heart, Player, Wall, TempWall];
//                         0      1      2      3      4 
function App() {
  return (
    <div>
      <Level1></Level1>
    </div>
  )
}

export default App


function Level1() {
  const [map, setMap] = useState([
    "3333333",
    "3020303",
    "3030003",
    "3000003",
    "3000013",
    "3000003",
    "3000003",
    "3333333"
  ]) 

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);


    const findPlayer = () => {
      for (let y = 0; y < map.length; y++) {
        const x = map[y].indexOf("2");
        if (x !== -1) return { x, y };
      }
      return null;
    };
  
    const movePlayer = (dx: number, dy: number) => {
      const { x, y } = findPlayer()!;
      let newX = x + dx;
      let newY = y + dy;
      
      while (map[newY] && "34".indexOf(map[newY][newX]) === -1) {
        if (map[newY][newX] === "1") {
          break;
        }
        newX += dx;
        newY += dy;
      }
      
      if (map[newY] && map[newY][newX] === "1") {
        const newMap = [...map];
        newMap[y] = newMap[y].substring(0, x) + "0" + newMap[y].substring(x + 1);
        newMap[newY] = newMap[newY].substring(0, newX) + "2" + newMap[newY].substring(newX + 1);
        setMap(newMap);
        return;
      }
      
      newX -= dx;
      newY -= dy;
      
      if (newX !== x || newY !== y) {
        const newMap = [...map];
        newMap[y] = newMap[y].substring(0, x) + "0" + newMap[y].substring(x + 1);
        newMap[newY] = newMap[newY].substring(0, newX) + "2" + newMap[newY].substring(newX + 1);
        setMap(newMap);
      }
    };
  }, [map]);


  return <div>
    {map.map((row, y) => {
      return <div key={y}>
        {row.split("").map((num, x) => {
          const Element = elements[parseInt(num)];
          return <Element key={x}/>
        })}
      </div>
    })
    }

  </div>
}

