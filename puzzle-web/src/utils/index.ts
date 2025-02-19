export function drawBlock(canvas: HTMLCanvasElement, colors: string[], pattern: string[]) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    const cellSize = 20; // Each cell is 20x20 to fill 100x100
  
    for (let y = 0; y < pattern.length; y++) {
      for (let x = 0; x < pattern[y].length; x++) {
        ctx.fillStyle = colors[pattern[y][x] as unknown as number];
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
  