import { useEffect, useRef } from 'react'
import { drawBlock } from '../utils';

export default function Pass() {  
    const tempWallCanvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (tempWallCanvas.current) {
            const canvas = tempWallCanvas.current;
            drawBlock(canvas, ["chocolate", "burlywood", "green", "lightgreen"], [
                "02220",
                "22222",
                "22232",
                "22222",
                "03220"
            ])
          }
    }, []);

    return <canvas ref={tempWallCanvas} width={100} height={100}></canvas>

}