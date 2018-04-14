import { LEVELS } from '../constants/level';

export function levelGetter(gramme) {
  let porkyLevel = 0
  level = LEVELS.some((level, index) => {
    porkyLevel = LEVELS[index].level;
    return gramme <= level.required;
  });
  return porkyLevel;
}