const ptRelativeTimeFormat = new Intl.RelativeTimeFormat('pt-BR', {
    numeric: 'auto',
});

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
  ];

export const relativeTime = (date: string) => {
    const now: Date = new Date();
    const givenDate: Date = new Date(date);
    const diffTime = now.getTime() - givenDate.getTime();
    let duration = diffTime / 1000;
  
    const formatter = ptRelativeTimeFormat
  
    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration) * -1, division.name);
      }
      duration /= division.amount ?? 1;
    }
  };