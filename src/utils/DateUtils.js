export const hhMMToDate = (hhMM, date) => {
  const hhMMSplited = hhMM.split(":");
  const hour = hhMMSplited[0];
  const minutes = hhMMSplited[1];

  let newDate = date ? new Date(date) : new Date();
  newDate.setHours(hour);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
};

export const minutesOfDifference = (start, finish) =>
  Math.round((finish.getTime() - start.getTime()) / 60000);
