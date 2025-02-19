import { useEffect, useRef } from 'react'
import { drawBlock } from '../utils';
export default function Wall() {  
    const wallCanvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (wallCanvas.current) {
            const canvas = wallCanvas.current;
            drawBlock(canvas, ["chocolate", "burlywood"], [
              "00010",
              "11111",
              "01000",
              "11111",
              "00010"
            ])
          }
    }, []);

    return <canvas ref={wallCanvas} width={100} height={100}></canvas>

}