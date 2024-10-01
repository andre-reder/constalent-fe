export default function formatRG(rg: string) {
  // Remove todos os caracteres que não são dígitos, exceto a letra 'X' na última posição
  rg = rg.toUpperCase().replace(/[^\dX]/g, ''); // Remove caracteres não numéricos, exceto 'X'

  // Se a letra "X" não estiver na última posição, remover
  if (rg.indexOf('X') !== -1 && rg.indexOf('X') !== rg.length - 1) {
    rg = rg.replace(/X/g, ''); // Remove 'X' se não estiver na última posição
  }

  // Aplica a formatação ao RG no formato XX.XXX.XXX-X
  rg = rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");

  return rg;
}
