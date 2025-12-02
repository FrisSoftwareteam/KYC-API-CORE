export function formatNumber(data: number | string | undefined) {
  if (!data) return 0;
  const number = Number(data);
  if (isNaN(number)) return 0;

  const integerWithCommas = String(Math.ceil(number)).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );

  return integerWithCommas;
}
