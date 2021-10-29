let wantedWords = ["react", "html", "css", "js", "javascript", "remote"],
  notWantedWords = [
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
    "redux",
    "native",
    "salesforce",
    "Shopify",
    "C#",
    "php",
    "Israel",
  ];

function jobIsValid() {
  let counter = 0;
  let missingWords = [];
  for (let i = 0; i < wantedWords.length; i++) {
    find(wantedWords[i]) ? counter++ : missingWords.push(wantedWords[i]);
  }
  if (counter === wantedWords.length) {
    return true;
  } else {
    alert(missingWords);
    return false;
  }
}

/*v1.1 */
//*****************************
function highlightWantedWords() {
  for (let i = 0; i < wantedWords.length; i++) {
    let rightRail = document.getElementsByClassName(
      "jobs-search__right-rail"
    )[0];
    let regExp = new RegExp(wantedWords[i], "gi");
    alert(rightRail.innerHTML.match(regExp));
  }
  /*
  let counter = 0;
  let missingWords = [];
  for (let i = 0; i < wantedWords.length; i++) {
    find(wantedWords[i]) ? counter++ : missingWords.push(wantedWords[i]);
  }
  if (counter === wantedWords.length) {
    return true;
  } else {
    alert(missingWords);
    return false;
  }
  */
}
//*****************************
/*v1.1 */

function jobIsClean() {
  let restrictedWords = [];
  for (const word of notWantedWords) {
    if (find(word)) {
      restrictedWords.push(word);
    }
  }
  if (restrictedWords.length !== 0) {
    alert(restrictedWords);
    return false;
  }
  return true;
}

function find(word = null) {
  let rightRail = document.getElementsByClassName("jobs-search__right-rail")[0];
  return rightRail.innerHTML.toLowerCase().includes(word.toLowerCase());
}

function getButton() {
  let buttons = document.getElementsByClassName("artdeco-button--primary");
  let next = "Continue to next step".toLowerCase();
  let review = "Review your application".toLowerCase();
  let submit = "Submit application".toLowerCase();
  for (const button of buttons) {
    if (button.getAttribute("aria-label")) {
      let aria_label = button.getAttribute("aria-label").toLowerCase();
      if (
        aria_label === next ||
        aria_label === review ||
        aria_label === submit
      ) {
        return button;
      }
    } else {
      alert("There is no aria-label");
    }
  }
}

function selectFieldsIsFull() {
  let selectFields = document.getElementsByTagName("select");
  for (const field of selectFields) {
    if (field.value == "") {
      return false;
    }
  }
  return true;
}

function inputFieldsIsFull() {
  let inputFields = document.getElementsByTagName("input");
  for (const field of inputFields) {
    if (
      field.getAttribute("name")
        ? field.getAttribute("name").includes("urn:li:fs_easyApplyFormElement:")
        : false
    ) {
      if (field.value == "") {
        return false;
      }
    }
  }
  return true;
}

//function radioButtonIsChecked(){
//  let inputFields = document.getElementsByTagName("input");
//  for (const field of inputFields) {
//    if(field.getAttribute("name")? field.getAttribute("name").includes('urn:li:fs_easyApplyFormElement:') : false){
//      if(field.value == ""){
//        console.log(field);
//        return false;
//      }
//    }
//  }
//  return true;
//}

function textareaFieldsIsFull() {
  let textareaFields = document.getElementsByTagName("textarea");
  //console.log("textareaFields: ",textareaFields);
  //console.log("textareaFields.length: ",textareaFields.length);
  //console.log("textareaFields[0].value: ",textareaFields[0].value);
  for (const field of textareaFields) {
    if (field.value == "") {
      return false;
    }
  }
  return true;
}

function formIsReadyToClick() {
  if (selectFieldsIsFull() && inputFieldsIsFull() && textareaFieldsIsFull()) {
    return true;
  }
  return false;
}

function fieldsIsValid() {
  let modal = document.getElementsByClassName("jobs-easy-apply-modal")[0];
  return !modal.innerHTML
    .toLowerCase()
    .includes("Please enter a valid answer".toLowerCase());
}

function submitPageAppear() {
  let followCompany = document.getElementById("follow-company-checkbox");
  //alert("submitPageAppear() function executed");
  if (followCompany) {
    return true;
  } else {
    return false;
  }
}
function unFollowCompany() {
  let followCompany = document.getElementById("follow-company-checkbox");
  followCompany.checked = false;
}

function clickActionButton() {
  setTimeout(() => {
    // if fields is full and no validation error exist
    if (formIsReadyToClick() && fieldsIsValid()) {
      if (submitPageAppear() && !submitLocked) {
        unFollowCompany();
        setTimeout(() => {
          let actionButton = getButton();
          console.log("submit clicked");
          actionButton.click();
        }, 1000);
      } else {
        let actionButton = getButton();
        actionButton.click();
      }
    } else {
      console.log("not ready");
    }
  }, 500);
}

let submitLocked = false;
window.onload = function () {
  setTimeout(function () {
    // get left and right sides of page
    let leftRail = document.getElementsByClassName("jobs-search__left-rail")[0];
    // when click on a job
    leftRail.onclick = function () {
      setTimeout(function () {
        if (jobIsValid() && jobIsClean()) {
          // if job is valid and clean click on apply button
          let applyButton =
            document.getElementsByClassName("jobs-apply-button")[0];
          applyButton.click();
          // get modal
          let modal = document.getElementsByClassName(
            "jobs-easy-apply-modal"
          )[0];
          //console.log(modal.length);
          modal.onclick = function () {
            if (!submitLocked) {
              // we mean by ActionButton is buttons in modal [ next, review, submit ]
              clickActionButton();
              //console.log("modal.onclick executed", submitLocked);
            }
            submitLocked = submitPageAppear();
          };
          clickActionButton();
          submitLocked = submitPageAppear();
          //console.log("first click: ", submitLocked);
        }
      }, 1000);
    };
  }, 1000);
};
