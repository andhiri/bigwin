import { v4 as uuidv4 } from 'uuid';

export async function storeAttachment(file: File): Promise<string> {
  // Generate a unique filename
  const extension = file.name.split('.').pop();
  const filename = `${uuidv4()}.${extension}`;
  
  // Convert file to base64 for storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        // Store in localStorage with metadata
        const attachment = {
          id: filename,
          type: file.type,
          data: reader.result,
          createdAt: new Date().toISOString()
        };
        
        // Get existing attachments
        const attachments = JSON.parse(localStorage.getItem('attachments') || '{}');
        attachments[filename] = attachment;
        
        // Store updated attachments
        localStorage.setItem('attachments', JSON.stringify(attachments));
        
        resolve(filename);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getAttachment(filename: string): string | null {
  try {
    const attachments = JSON.parse(localStorage.getItem('attachments') || '{}');
    return attachments[filename]?.data || null;
  } catch {
    return null;
  }
}