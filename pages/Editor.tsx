import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import { EditorElement, Design } from '../types';
import { Button } from '../components/Button';
import { saveDesign } from '../services/store';
import { 
  Type, 
  Image as ImageIcon, 
  Move, 
  RotateCw, 
  Trash2, 
  Save, 
  ArrowLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

const Editor: React.FC = () => {
  const { templateId } = useParams();
  const [searchParams] = useSearchParams();
  const designId = searchParams.get('designId') || 'temp';
  const navigate = useNavigate();

  const template = TEMPLATES.find(t => t.id === templateId);

  const [side, setSide] = useState<'front' | 'back'>('front');
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  // Initialize with some default text if empty
  useEffect(() => {
    if (elements.length === 0) {
      setElements([
        {
          id: 'e1',
          type: 'text',
          content: 'Greetings from Egypt!',
          x: 200,
          y: 150,
          fontSize: 24,
          color: '#000000',
          fontFamily: 'serif'
        }
      ]);
    }
  }, []);

  const addText = () => {
    const newElement: EditorElement = {
      id: `el_${Date.now()}`,
      type: 'text',
      content: 'Double click to edit',
      x: 100,
      y: 100,
      fontSize: 20,
      color: '#000000',
      fontFamily: 'sans-serif'
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<EditorElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedId(null);
  };

  const handleSave = () => {
    if (!template) return;
    const design: Design = {
      id: designId,
      templateId: template.id,
      elements,
      lastModified: Date.now(),
      previewUrl: template.imageUrl // Simplification for MVP
    };
    saveDesign(design);
    navigate(`/checkout?designId=${designId}`);
  };

  // Simple Drag Logic (Simulated for this environment without DnD libraries)
  // In a real app, use @dnd-kit or react-draggable
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, el: EditorElement) => {
    if (side === 'back') return; // Only edit front for MVP simplicity on elements
    e.stopPropagation();
    setSelectedId(el.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - el.x,
      y: e.clientY - el.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedId && containerRef.current) {
        // Calculate relative position inside the scaled container is tricky without strict math
        // We will do simple offset based on movement
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        updateElement(selectedId, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const selectedElement = elements.find(el => el.id === selectedId);

  if (!template) return <div>Template not found</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Top Bar */}
      <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-serif font-bold text-gray-800 hidden sm:block">Editor: {template.title}</h1>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button 
                onClick={() => setSide('front')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${side === 'front' ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Front
            </button>
            <button 
                onClick={() => setSide('back')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${side === 'back' ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Back
            </button>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}><ZoomOut className="w-4 h-4" /></Button>
            <span className="text-xs text-gray-500 w-8 text-center">{Math.round(scale * 100)}%</span>
            <Button variant="outline" size="sm" onClick={() => setScale(s => Math.min(2, s + 0.1))}><ZoomIn className="w-4 h-4" /></Button>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Next Step
            </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6 z-10">
            <button 
                onClick={addText}
                className="flex flex-col items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors group"
                disabled={side === 'back'}
            >
                <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-brand-50 flex items-center justify-center border border-gray-200 group-hover:border-brand-200">
                    <Type className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Text</span>
            </button>

            <button 
                className="flex flex-col items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors group"
                disabled={side === 'back'}
                onClick={() => alert("Image upload mocked for demo")}
            >
                <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-brand-50 flex items-center justify-center border border-gray-200 group-hover:border-brand-200">
                    <ImageIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Photo</span>
            </button>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-auto p-8">
            <div 
                ref={containerRef}
                className="relative bg-white shadow-xl transition-all duration-300 ease-out"
                style={{
                    width: '600px',
                    height: '400px',
                    transform: `scale(${scale})`,
                    backgroundImage: side === 'front' ? `url(${template.imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                onClick={() => setSelectedId(null)}
            >
                {/* Safe Area / Bleed Indicator */}
                <div className="absolute inset-0 border-4 border-dashed border-red-200 opacity-0 hover:opacity-100 pointer-events-none z-50">
                    <span className="absolute top-1 left-1 text-[10px] text-red-400 bg-white px-1">Safe Area</span>
                </div>

                {side === 'front' ? (
                    // Front Elements (Draggable)
                    elements.map(el => (
                        <div
                            key={el.id}
                            style={{
                                position: 'absolute',
                                left: el.x,
                                top: el.y,
                                color: el.color,
                                fontSize: `${el.fontSize}px`,
                                fontFamily: el.fontFamily,
                                cursor: 'move',
                                border: selectedId === el.id ? '2px dashed #c99a4e' : 'none',
                                padding: '4px',
                                userSelect: 'none',
                                zIndex: 10
                            }}
                            onMouseDown={(e) => handleMouseDown(e, el)}
                        >
                            {el.content}
                            {selectedId === el.id && (
                                <div className="absolute -top-3 -right-3">
                                    <button 
                                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        onClick={(e) => { e.stopPropagation(); removeElement(el.id); }}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    // Back Side Static Layout
                    <div className="w-full h-full relative p-8 flex">
                        <div className="flex-1 border-r border-gray-300 pr-4 flex items-center justify-center text-gray-400 text-sm italic">
                            Write your message here...
                        </div>
                        <div className="w-1/2 pl-8 flex flex-col">
                            <div className="w-16 h-20 border border-gray-300 ml-auto mb-8 bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                                Stamp
                            </div>
                            <div className="space-y-6 mt-8">
                                <div className="border-b border-gray-300 h-6"></div>
                                <div className="border-b border-gray-300 h-6"></div>
                                <div className="border-b border-gray-300 h-6"></div>
                                <div className="border-b border-gray-300 h-6"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>

        {/* Right Properties Panel */}
        <aside className="w-72 bg-white border-l border-gray-200 p-6 z-10 overflow-y-auto">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Properties</h3>
            
            {selectedElement && side === 'front' ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-2">Content</label>
                        <textarea 
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-brand-500 focus:border-brand-500"
                            rows={3}
                            value={selectedElement.content}
                            onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-2">Font Size ({selectedElement.fontSize}px)</label>
                        <input 
                            type="range" 
                            min="12" 
                            max="72" 
                            value={selectedElement.fontSize}
                            onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                            className="w-full accent-brand-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-2">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {['#000000', '#ffffff', '#8b6131', '#c99a4e', '#d93025', '#1a73e8'].map(color => (
                                <button
                                    key={color}
                                    className={`w-8 h-8 rounded-full border border-gray-200 ${selectedElement.color === color ? 'ring-2 ring-offset-2 ring-brand-500' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateElement(selectedElement.id, { color })}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100">
                        <label className="block text-xs font-medium text-gray-500 mb-2">Position</label>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-[10px] text-gray-400">X</label>
                                <input 
                                    type="number" 
                                    value={Math.round(selectedElement.x)}
                                    onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                                    className="w-full border border-gray-300 rounded p-1 text-sm"
                                />
                             </div>
                             <div>
                                <label className="text-[10px] text-gray-400">Y</label>
                                <input 
                                    type="number" 
                                    value={Math.round(selectedElement.y)}
                                    onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                                    className="w-full border border-gray-300 rounded p-1 text-sm"
                                />
                             </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-400 py-12">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                        <Move className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm">Select an element on the canvas to edit its properties.</p>
                </div>
            )}
        </aside>
      </div>
    </div>
  );
};

export default Editor;
