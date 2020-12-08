export const enchantedStyled = (string, breakpoints) => {
  const regex = /\[.+\]/g;
  const arrayString = string.match(regex);
  const cssprop = string.replace(regex, "");
  console.log("cssprop:", cssprop);
  if (arrayString === null) {
    return "";
  }
  const splitted = arrayString[0].slice(1).slice(0, -1).split(",");
  const result = splitted
    .map((el, index) => {
      if (index === 0) {
        return `
            ${cssprop}${el};
          `;
      }
      if (breakpoints.length + 1 > index) {
        return `@media (min-width:${breakpoints[index - 1]}) {
        ${cssprop}${el};
      } ;`;
      } else return "";
    })
    .join("");
  return result;
};
