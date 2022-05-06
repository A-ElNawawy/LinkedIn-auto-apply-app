const redWords = [
  //'3+',
  "4+",
  "5+",
  "6+",
  "7+",
  //'3 years',
  "4 years",
  "5 years",
  "6 years",
  "7 years",
  //'minimum 3',
  "minimum 4",
  "minimum 5",
  "minimum 6",
  "minimum 7",
  //'At least 3',
  "At least 4",
  "At least 5",
  "At least 6",
  "At least 7",
  //'Angular',
  //'vue',
  "wordpress",
  "Python",
  "full stack",
  "full-stack",
  "stack",
  "react native",
  "react-native",
  //"redux",
  "native",
  "salesforce",
  "Shopify",
  "C#",
  //"php",
  "Israel",
  "passport",
  "visa",
  "Must be Authorized to Work in United States without any sponsorship",
  "US Remote",
];

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

const getRedWords = () => {
  setTimeout(function () {
    //let jobDetails = document.getElementById("job-details")

    const rightRail = document.getElementsByClassName(
      "jobs-search__right-rail"
    )[0];

    const searchTxt = rightRail.innerHTML;

    let foundWords = findWords(searchTxt, redWords);
    if (foundWords.length > 0) {
      alert(foundWords);
    } else {
      alert("Job Is Clean");
    }
  }, 1000);
};

onJobClick(getRedWords);
