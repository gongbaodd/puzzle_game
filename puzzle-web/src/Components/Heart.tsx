import { useEffect, useRef } from 'react'
import { drawBlock } from '../utils';
export default function Wall() {
    const heartCanvas = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        if (heartCanvas.current) {
            const canvas = heartCanvas.current;
            drawBlock(canvas, ["red", "green", "lightred"], [
                "11111",
                "00100",
                "00020",
                "00000",
                "10001"
            ])
        }
    }, []);

    return <canvas ref={heartCanvas} width={100} height={100}></canvas>
}