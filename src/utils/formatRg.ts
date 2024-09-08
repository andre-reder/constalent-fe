export default function formatRG(rg: string) {
  // Remove todos os caracteres que não são dígitos
  rg = rg.replace(/\D/g, '');

  // Aplica a formatação ao RG no formato XX.XXX.XXX-X
  rg = rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");

  return rg;
}
