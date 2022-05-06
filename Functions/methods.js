const onJobClick = (callBack) => {
  const leftRail = document.getElementsByClassName("jobs-search__left-rail")[0];

  leftRail.onclick = callBack;
};

const findWords = (string, words) => {
  const found = [];
  for (let i in words) {
    const regex = new RegExp(`${words[i]}`);

    if (regex.test(string)) {
      found.push(words[i]);
    }
  }
  return found;
};

export { findWords, onJobClick };
