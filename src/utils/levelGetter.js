import { LEVELS } from '../constants/level';

export function levelGetter(gramme) {
  let porkyLevel = null;
  level = LEVELS.every((level, index) => {
    const isLast = gramme >= level.total
    if (isLast) {
      porkyLevel = {
        level: LEVELS[index].level,
        total: LEVELS[index].total,
        expRequired: LEVELS[index + 1].required,
        remainingExp: LEVELS[index + 1].total - gramme,
      }
    }

    return isLast;
  });

  return porkyLevel;
}