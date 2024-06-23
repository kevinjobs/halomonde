import dayjs from 'dayjs';

export const covertToUnixStamp10 = (n: number | string) => {
  return Number(String(n).slice(0, 10));
};

export const nowStamp = () => {
  return covertToUnixStamp10(Date.now());
};

export const stampToDate = (stamp: number) => {
  if (String(stamp).length === 10) {
    return dayjs.unix(stamp).toDate();
  } else if (String(stamp).length === 13) {
    return dayjs(stamp).toDate();
  }
};
