export default function formatCnpj(value: string) {
  // Remove all non-numeric characters from the input
  const numericValue = value.replace(/\D/g, '');

  // Split the numeric input into groups of 2 digits
  const groups = numericValue.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);

  // If the input doesn't match the CNPJ format, return the original input value
  if (!groups) {
    return value;
  }

  // Reformat the input as a CNPJ with a dot and a hyphen between each group
  const maskedValue = `${groups[1]}.${groups[2]}.${groups[3]}/${groups[4]}-${groups[5]}`;

  return maskedValue;
}
