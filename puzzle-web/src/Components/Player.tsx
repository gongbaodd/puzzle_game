import { useEffect, useRef } from 'react'
import { drawBlock } from '../utils';
export default function Player() {
    const playerCanvas = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {

        if (playerCanvas.current) {
            const canvas = playerCanvas.current;
            drawBlock(canvas, ["black", "orange", "white", "blue", "green"], [
                "40004",
                "41114",
                "22222",
                "43334",
                "43434"
            ])
        }
    }, []);

    return <canvas ref={playerCanvas} width={100} height={100}></canvas>
}