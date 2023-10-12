import moment from 'moment-timezone';

export function formatGameDateTimeTree(dateISO: string): string | null {
  const m = moment(dateISO);
  const reulstStr = m.format('MM/DD');
  return reulstStr;
}
export function formatToLLLDateStr(dateISO: string): string {
  const m = moment(dateISO);
  return m.format('lll');
}
export function formatToUsDateStr(dateISO: string): string {
  const m = moment(dateISO);
  return m.format('MM/DD/YYYY HH:mm:ss');
}

export function formatToVNDateStr(): string {
  const m = moment().tz('Asia/Ho_Chi_Minh');
  return m.format('DD-MM-YYYY');
}

export function getDateLLL(): string {
  const m = moment();
  return m.format('lll');
}

export function timeFromNow(d: Date): string {
  const f = moment(d).fromNow();
  return f;
}

export function getDate(): Date {
  const d = moment().toDate();
  return d;
}

export function formatStandartDate(dateISO: string | Date) {
  const m = moment(dateISO);
  return m.format('MMM-DD-YYYY');
}

export function formatTxDate(dateISO: string | Date) {
  const m = moment(dateISO);
  return m.format('MMM-DD-YYYY HH:mm:ss A Z');
}
