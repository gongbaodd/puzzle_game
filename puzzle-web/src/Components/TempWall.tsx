import { useEffect, useRef } from 'react'
import { drawBlock } from '../utils';

export default function Wall() {  
    const tempWallCanvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (tempWallCanvas.current) {
            const canvas = tempWallCanvas.current;
            drawBlock(canvas, ["chocolate", "burlywood", "grey"], [
              "22222",
              "20002",
              "21112",
              "20002",
              "22222"
            ])
          }
    }, []);

    return <canvas ref={tempWallCanvas} width={100} height={100}></canvas>

}