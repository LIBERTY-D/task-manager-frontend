//@ts-nocheck
export function BytesToUrl(input: string | File | Blob): string {
    if (typeof input === 'string') {
      try {
        const binaryString = window.atob(input);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
  
        const blob = new Blob([bytes], { type: 'image/png' }); // Adjust MIME type if needed
        return URL.createObjectURL(blob);
      } catch (err) {
        console.error('Failed to convert base64 string to Blob:', err);
        return '/assets/blank.jpg'; // Fallback image
      }
    } else if (input instanceof Blob || input instanceof File) {
      return URL.createObjectURL(input);
    }
  
    console.error('Invalid input type for BytesToUrl function.');
    return '/assets/blank.jpg'; // Fallback image
  }
  