"use client"
import React, { useRef, useEffect, useState } from 'react';
import { Pencil, Eraser, Trash2 } from 'lucide-react';

export const MiniCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [color, setColor] = useState('#FDACAC'); // Default Brand Medium Pink

  // Initialize and Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      // Save current content
      const ctx = canvas.getContext('2d');
      // In a real app we might want to preserve the image data, 
      // but for this demo, clearing on resize is acceptable or we can just set dimensions once.
      // Let's set dimensions to match clientWidth
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      if (ctx) {
        drawGrid(ctx, canvas.width, canvas.height);
        // Add a default scribble if it's the first load
        drawWelcomeScribble(ctx, canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches && e.changedTouches.length > 0) {
        // Handle touch end
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling on touch
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const { x, y } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color; // Eraser paints white (bg color)
    ctx.lineWidth = tool === 'eraser' ? 24 : 4;
    // For smoother lines
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // Use clearRect instead of painting white to preserve transparency if needed, 
    // but here we are on a white bg.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Reset composite operation to draw grid
    ctx.globalCompositeOperation = 'source-over';
    drawGrid(ctx, canvas.width, canvas.height);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(253, 172, 172, 0.15)'; // Very faint pink
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 24) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += 24) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  };

  const drawWelcomeScribble = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.strokeStyle = '#FDACAC';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    const cx = width / 2;
    const cy = height / 2;
    
    // Draw a simple infinity loop-ish shape
    ctx.moveTo(cx - 60, cy);
    ctx.bezierCurveTo(cx - 60, cy - 50, cx, cy - 50, cx, cy);
    ctx.bezierCurveTo(cx, cy + 50, cx + 60, cy + 50, cx + 60, cy);
    ctx.bezierCurveTo(cx + 60, cy - 50, cx, cy - 50, cx, cy);
    
    ctx.stroke();
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-72 md:h-96 bg-white rounded-2xl shadow-xl shadow-brand-900/5 border border-stone-200 overflow-hidden group transform hover:scale-[1.01] transition-all duration-500"
    >
      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-full border border-stone-200 shadow-lg shadow-stone-200/50 transition-transform duration-300 hover:scale-105">
        <button 
          onClick={() => setTool('pencil')}
          className={`p-2.5 rounded-full transition-colors ${tool === 'pencil' ? 'bg-brand-600 text-white shadow-md' : 'text-stone-500 hover:bg-stone-100'}`}
          title="Pencil"
        >
          <Pencil size={18} />
        </button>
        <button 
          onClick={() => setTool('eraser')}
          className={`p-2.5 rounded-full transition-colors ${tool === 'eraser' ? 'bg-stone-200 text-stone-700 shadow-inner' : 'text-stone-500 hover:bg-stone-100'}`}
          title="Eraser"
        >
          <Eraser size={18} />
        </button>
        
        <div className="w-px h-6 bg-stone-200 mx-1 self-center"></div>
        
        <div className="flex gap-1 px-1">
          {[
            { c: '#FDACAC', label: 'Pink' },   // Brand Medium
            { c: '#FFCDC9', label: 'Coral' },   // Brand Light
            { c: '#FD7979', label: 'Rose' },   // Brand Dark
            { c: '#0f172a', label: 'Black' }   // Ink
          ].map((clr) => (
            <button
              key={clr.c}
              onClick={() => { setColor(clr.c); setTool('pencil'); }}
              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${color === clr.c && tool === 'pencil' ? 'border-stone-300 scale-110 shadow-sm' : 'border-transparent'}`}
              style={{ backgroundColor: clr.c }}
              title={clr.label}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={clearCanvas} 
          className="p-2 bg-white rounded-full border border-stone-200 shadow-sm hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Clear Canvas"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full cursor-crosshair touch-none active:cursor-crosshair"
      />
      
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-50">
        <span className="bg-stone-100/80 backdrop-blur px-3 py-1 text-xs font-mono tracking-wider text-stone-500 rounded-full inline-block border border-stone-200/50">
          INTERACTIVE CANVAS
        </span>
      </div>
    </div>
  );
};