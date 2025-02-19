import { FC, useEffect, useRef } from 'react'
import { drawBlock } from '../utils';
const Grass: FC = () => {
    const grassCanvas = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (grassCanvas.current) {
          const canvas = grassCanvas.current;
          drawBlock(canvas, ["lightgreen", "green"], [
            "11111",
            "01111",
            "11101",
            "11111",
            "10111"
          ])
        }
      }, []);

    return <canvas ref={grassCanvas} width={100} height={100}></canvas>
}

export default Grass;