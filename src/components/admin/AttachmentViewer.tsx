import React, { useState, useEffect, useCallback } from 'react';
import { X, Download } from 'lucide-react';
import { getAttachment } from '../../services/attachmentService';

type Props = {
  filename: string;
  title: string;
  onClose: () => void;
};

export function AttachmentViewer({ filename, title, onClose }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const data = getAttachment(filename);
    setImageUrl(data);
  }, [filename]);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const modal = document.getElementById('attachment-modal');
    const modalContent = document.getElementById('attachment-content');
    if (modal && modalContent && !modalContent.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  if (!imageUrl) {
    return null;
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="attachment-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div id="attachment-content" className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              title="Download"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}