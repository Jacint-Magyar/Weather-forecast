export function occurence(array) {
  return array.sort((a,b) =>
        array.filter(elem => elem.weather[0].icon === a.weather[0].icon).length
      - array.filter(elem => elem.weather[0].icon === b.weather[0].icon).length
  ).pop();
}

