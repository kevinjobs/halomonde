export function toMonthString(date: Date, lang?: string) {
  const year = date.getFullYear();
  let month: string | number = date.getMonth();

  if (lang === 'cn') {
    return `${year}年${month}月`;
  }

  month = month < 10 ? '0' + month : month;

  return `${year} - ${month}`;
}
