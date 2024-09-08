export default function isRgValid(rg: string) {
  // Remove todos os caracteres que não são dígitos
  rg = rg.replace(/\D/g, '');

  // Verifica se o RG tem exatamente 9 dígitos
  if (rg.length !== 9) {
    return false;
  }

  // Verifica se todos os caracteres são iguais (ex: "111111111" não é um RG válido)
  if (/^(\d)\1+$/.test(rg)) {
    return false;
  }

  // Se passou nas verificações, o RG é considerado válido
  return true;
}
