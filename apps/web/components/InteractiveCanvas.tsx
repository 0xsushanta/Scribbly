import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { Button } from './Button';

interface Point {
  x: number;
  y: number;
}

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1e1b4b');
  
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get correct coordinates
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      // Re-draw grid
      drawGrid(ctx!, canvas.width, canvas.height);
    }
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#cbd5e1';
    for (let x = 20; x < width; x += 20) {
      for (let y = 20; y < height; y += 20) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set actual size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) drawGrid(ctx, canvas.width, canvas.height);
      
      const handleResize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        if (ctx) drawGrid(ctx, canvas.width, canvas.height);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const colors = ['#1e1b4b', '#ef4444', '#22c55e', '#3b82f6', '#eab308'];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col h-[500px]">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${color === c ? 'scale-125 border-slate-400' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: c }}
                aria-label="Select color"
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">Try drawing something!</span>
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" size="sm" onClick={clearCanvas} title="Clear">
             <RefreshCw size={16} />
           </Button>
           <Button variant="ghost" size="sm" title="Save">
             <Download size={16} />
           </Button>
        </div>
      </div>
      <div className="relative flex-1 bg-[#FDFCF8] cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-50">
          <span className="font-hand text-2xl text-slate-300 -rotate-12 block">Scribly Demo</span>
        </div>
      </div>
    </div>
  );
};