import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatTime = (num, timezone, format = "hh:mm A") => {
  const date = dayjs.unix(num).tz(timezone);
  return date.format(format);
};
