import { FC, useDeferredValue, useEffect, useRef, useState } from "react";
import Grass from "./Grass";
import Heart from "./Heart";
import Player from "./Player";
import Wall from "./Wall";
import TempWall from "./TempWall";
import { useMount } from "react-use";

const elements: FC[] = [Grass, Heart, Player, Wall, TempWall];

type Props = {
    originMap: string[],
    onWin: () => void
};

export default function Level({ originMap, onWin }: Props) {
    const [map, setMap] = useState(originMap);
    const deferedMap = useDeferredValue(map);
    const moveCount = useRef(0);

    useMount(() => {
        if (moveCount.current === 0) {
            setMap(toggleTempWalls(originMap));
        }
    });

    // Store the original TempWall (4) and TempWall (5) positions separately
    const originalTempWalls4 = useRef(
        originMap.flatMap((row, y) =>
            row.split("").map((cell, x) => (cell === "4" ? { x, y } : null))
        ).filter(Boolean) as { x: number, y: number }[]
    );

    const originalTempWalls5 = useRef(
        originMap.flatMap((row, y) =>
            row.split("").map((cell, x) => (cell === "5" ? { x, y } : null))
        ).filter(Boolean) as { x: number, y: number }[]
    );

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
                case "r":
                case "R":
                    reset();
                    break;
                default:
                    break;
            }
        }

        function reset() {
            moveCount.current = 0;
            setMap(toggleTempWalls(originMap));
        }

        function findPlayer() {
            for (let y = 0; y < map.length; y++) {
                const x = map[y].indexOf("2");
                if (x !== -1) return { x, y };
            }
            return null;
        }

        function movePlayer(dx: number, dy: number) {
            const playerPos = findPlayer();
            if (!playerPos) return;
            
            const { x, y } = playerPos;
            let newX = x + dx;
            let newY = y + dy;

            while (map[newY] && "345".indexOf(map[newY][newX]) === -1) {
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
                setMoveCount(newMap);
                setMap(toggleTempWalls(newMap));
                return;
            }

            newX -= dx;
            newY -= dy;

            if (newX !== x || newY !== y) {
                const newMap = [...map];
                newMap[y] = newMap[y].substring(0, x) + "0" + newMap[y].substring(x + 1);
                newMap[newY] = newMap[newY].substring(0, newX) + "2" + newMap[newY].substring(newX + 1);
                setMoveCount(newMap);
                setMap(toggleTempWalls(newMap));
            }
        }

        function setMoveCount(newMap: string[]) {
            if (newMap.join("") !== map.join("")) {
                moveCount.current++;
                console.log(moveCount.current);
            }
        }
    }, [map]);

    useEffect(() => {
        const previousMap = deferedMap.join("");

        checkWinning();

        function checkWinning() {
            if (previousMap.indexOf("1") === -1) {
                onWin();
            }
        }

    }, [deferedMap, onWin]);

    return (
        <>
        <h3>Press R to reset</h3>
        <div className="map">
            {map.map((row, y) => (
                <div key={y}>
                    {row.split("").map((num, x) => {
                        const Element = elements[parseInt(num)] ?? TempWall;
                        return <Element key={x} />;
                    })}
                </div>
            ))}
        </div>
        </>
    );

    function toggleTempWalls(newMap: string[]) {
        return newMap.map((row, y) =>
            row
                .split("")
                .map((cell, x) => {
                    if (originalTempWalls4.current.some(pos => pos.x === x && pos.y === y)) {
                        return moveCount.current % 2 === 0 ? "0" : "4"; // TempWall 4 toggles on even moves
                    }
                    if (originalTempWalls5.current.some(pos => pos.x === x && pos.y === y)) {
                        return moveCount.current % 2 === 1 ? "0" : "5"; // TempWall 5 appears on odd moves
                    }
                    return cell;
                })
                .join("")
        );
    }
}
