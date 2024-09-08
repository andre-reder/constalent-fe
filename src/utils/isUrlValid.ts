export default function isUrlValid(url: string) {
  try {
    // Tenta criar um objeto URL. Se a string não for uma URL válida, isso lançará um erro.
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
