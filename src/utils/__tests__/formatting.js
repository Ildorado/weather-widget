import { formatTime } from "../formatting";
import { timeFormats } from "../../constants";

const timezones = { london: "Europe/London", tokyo: "Asia/Tokyo" };
describe("formatTime", () => {
  it("should work correctly with default HourPlusMinutesPlusPostMeridian format", () => {
    expect(formatTime(1607106360, timezones.london)).toMatch("06:26 PM");
    expect(formatTime(1607106360, timezones.tokyo)).toMatch("03:26 AM");
  });
  it("should work correctly with DayShortened format", () => {
    expect(
      formatTime(1607106360, timezones.london, timeFormats.DayShortened)
    ).toMatch("Fri");
    expect(
      formatTime(1607106360, timezones.tokyo, timeFormats.DayShortened)
    ).toMatch("Sat");
  });
});
