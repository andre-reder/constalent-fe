export default function downloadFile(file: File | string, fileName: string) {
  if (typeof file === 'string') {
    const link = document.createElement('a');
    link.href = file;
    link.download = fileName;
    link.click();
  } else {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }
}
