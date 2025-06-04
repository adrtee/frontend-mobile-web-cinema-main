import { getDates } from "../src/utils/date";

describe("getDates", () => {
  it("should return dates in the correct format", () => {
    const dates = getDates(3);

    dates.forEach((date) => {
      const regex = /^[A-Za-z]+ \d{1,2} [A-Za-z]{3}$/;
      expect(date).toMatch(regex);

      const parts = date.split(" ");
      const dayName = parts[0];
      const dayNumber = parseInt(parts[1], 10);
      const monthAbbr = parts[2];

      expect([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]).toContain(dayName);

      expect(dayNumber).toBeGreaterThanOrEqual(1);
      expect(dayNumber).toBeLessThanOrEqual(31);

      expect([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]).toContain(monthAbbr);
    });
  });
});
