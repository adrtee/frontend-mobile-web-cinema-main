export function getDates(numDays: number) {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < numDays; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });

    dates.push(`${dayName} ${day} ${month}`);
  }

  return dates;
}
