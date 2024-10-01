export default function isRgValid(rg: string) {
  // Remove todos os caracteres que não são dígitos ou a letra "X"
  rg = rg.toUpperCase().replace(/[^\dX]/g, '');

  // Verifica se o RG tem exatamente 9 caracteres, sendo o último um dígito ou a letra "X"
  if (rg.length !== 9 || (rg[8] !== 'X' && !/\d/.test(rg[8]))) {
    return false;
  }

  // Verifica se todos os caracteres (exceto o último) são iguais
  if (/^(\d)\1{7}$/.test(rg.slice(0, 8))) {
    return false;
  }

  // Se passou nas verificações, o RG é considerado válido
  return true;
}
