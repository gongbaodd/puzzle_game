import { FC, useDeferredValue, useEffect, useRef, useState } from "react";
import Grass from "./Grass";
import Heart from "./Heart";
import Player from "./Player";
import Wall from "./Wall";
import TempWall from "./TempWall";

const elements: FC[] = [Grass, Heart, Player, Wall, TempWall];

type Props = {
    originMap: string[],
    onWin: () => void
}

export default function Level({ originMap, onWin }: Props) {
    const [map, setMap] = useState(originMap)
    const deferedMap = useDeferredValue(map);
    const moveCount = useRef(0)

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

        function handleKeyDown(event: KeyboardEvent) {
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
        }

        function findPlayer() {
            for (let y = 0; y < map.length; y++) {
                const x = map[y].indexOf("2");
                if (x !== -1) return { x, y };
            }
            return null;
        };

        function movePlayer(dx: number, dy: number) {
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

    useEffect(() => {
        const previousMap = deferedMap.join('')
        const newMap = map.join('')

        addMoveCount()
        checkWinning()
        function checkWinning() {
            if (previousMap.indexOf('1') === -1) {
                onWin()
            }
        }

        function addMoveCount() {
            if (previousMap !== newMap) {
                moveCount.current++;
            }
        }
    }, [deferedMap, onWin, map])

    return <div className='map'>
        {map.map((row, y) => {
            return <div key={y}>
                {row.split("").map((num, x) => {
                    const Element = elements[parseInt(num)];

                    // if (Element === TempWall) {
                    //     if (moveCount.current % 2 === 0) {
                    //         return <Grass key={x} />
                    //     }
                    // }

                    return <Element key={x} />
                })}
            </div>
        })
        }

    </div>
}

