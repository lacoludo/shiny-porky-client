import { LEVELS } from '../constants/level';

export function levelGetter(gramme) {
  let porkyLevel = null;
  level = LEVELS.every((level, index) => {
    const isLast = gramme >= level.total
    if (isLast) {
      porkyLevel = {
        level: LEVELS[index].level,
        expRequired: LEVELS[index].required,
        remainingExp: LEVELS[index].total - gramme,
      }
    }

    return isLast;
  });

  return porkyLevel;
}