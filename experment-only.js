const main = (word) => {
  var regExp = new RegExp(word, "gi");
  return "cat cat dog".match(regExp).map((word) => word.replace("c", "f"));
  //return regExp;
};

console.log(main("cat"));
