export const formatTime = (days) => {
  if (days < 365) {
    return `${days.toFixed(1)} Days`;
  } else {
    const years = (days / 365).toFixed(0);
    const extra = (days % 365).toFixed(1);

    return `${years} Years, ${extra} Days`;
  }
};
