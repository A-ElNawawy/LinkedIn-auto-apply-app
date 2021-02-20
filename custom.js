let wantedWords = ['react', 'remote'],
  notWantedWords = [
    //'3+',
    '4+',
    '5+',
    '6+',
    '7+',
    //'3 years',
    '4 years',
    '5 years',
    '6 years',
    '7 years',
    //'minimum 3',
    'minimum 4',
    'minimum 5',
    'minimum 6',
    'minimum 7',
    //'At least 3',
    'At least 4',
    'At least 5',
    'At least 6',
    'At least 7',
    //'Angular',
    //'vue',
    'wordpress',
    'full stack',
    'full-stack',
    'stack',
    'react native',
    'react-native',
    'native',
    'salesforce',
    'Israel',
  ];

function jobIsValid(){
  let counter = 0;
  let missingWords = [];
  for (let i = 0; i < wantedWords.length; i++) {
    find(wantedWords[i]) ? counter++ : missingWords.push(wantedWords[i]);
  }
  if(counter === wantedWords.length){
    return true;
  }else{
    alert("we miss: ", missingWords);
    return false;
  }
}

function jobIsClean(){
  let restrictedWords = [];
  for (const word of notWantedWords) {
    if(find(word)){
      restrictedWords.push(word);
    }
  }
  if(restrictedWords.length !== 0){
    alert(restrictedWords);
    return false;
  }
  return true;
}

function find(word = null){
  let rightRail = document.getElementsByClassName("jobs-search__right-rail")[0];
  return rightRail.innerHTML.toLowerCase().includes(word.toLowerCase());
}

function getButton(){
  let buttons = document.getElementsByClassName("artdeco-button--primary");
  let next = "Continue to next step".toLowerCase();
  let review = "Review your application".toLowerCase();
  let submit = "Submit application".toLowerCase();
  for (const button of buttons) {
    if(button.getAttribute("aria-label")){
      let aria_label = button.getAttribute("aria-label").toLowerCase();
      if(aria_label === next || aria_label === review || aria_label === submit){
        return button;
      }
    }else{
      alert("There is no aria-label");
    }
  }
}

function selectFieldsIsFull(){
  let selectFields = document.getElementsByTagName("select");
  for (const field of selectFields) {
    if(field.value == ""){
      return false;
    }
  }
  return true;
}

function inputFieldsIsFull(){
  let inputFields = document.getElementsByTagName("input");
  for (const field of inputFields) {
    if(field.getAttribute("name")? field.getAttribute("name").includes('urn:li:fs_easyApplyFormElement:') : false){
      if(field.value == ""){
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

function textareaFieldsIsFull(){
  let textareaFields = document.getElementsByTagName("textarea");
  //console.log("textareaFields: ",textareaFields);
  //console.log("textareaFields.length: ",textareaFields.length);
  //console.log("textareaFields[0].value: ",textareaFields[0].value);
  for (const field of textareaFields) {
    if(field.value == ""){
      return false;
    }
  }
  return true;
}

function formIsReadyToClick(){
  if(selectFieldsIsFull() && inputFieldsIsFull() && textareaFieldsIsFull()){
    return true;
  }
  return false;
}

function fieldsIsValid(){
  let modal = document.getElementsByClassName("jobs-easy-apply-modal")[0];
  return ! modal.innerHTML.toLowerCase().includes("Please enter a valid answer".toLowerCase());
}

function unFollowCompany(){
  let followCompany = document.getElementById("follow-company-checkbox");
  followCompany ? followCompany.checked = false : null;
  return followCompany;
}

window.onload = function(){
  setTimeout(function(){
    // get left and right sides of page
    let leftRail = document.getElementsByClassName("jobs-search__left-rail")[0];
    let rightRail = document.getElementsByClassName("jobs-search__right-rail")[0];
    // when click on a job
    leftRail.onclick = function(){
      setTimeout(function(){
        if(jobIsValid() && jobIsClean()){
          // if job is valid and clean click on apply
          let applyButton = document.getElementsByClassName("jobs-apply-button")[0];
          applyButton.click();
          window.onclick = function(){
            setTimeout(() => {
              if(formIsReadyToClick() && fieldsIsValid()){
                console.log("ready");
                if(unFollowCompany()){
                  unFollowCompany();
                  setTimeout(() => {
                    let actionButton = getButton();
                    actionButton.click();
                  }, 500);
                }else{
                  let actionButton = getButton();
                  actionButton.click();
                }
              }
              else{
                console.log("not ready");
              //  alert("Validation Error row #163");
              }
            }, 500);
          }
          // if fields is full and no validation error exist
          if(formIsReadyToClick() && fieldsIsValid()){
            if(unFollowCompany()){
              unFollowCompany();
              setTimeout(() => {
                let actionButton = getButton();
                actionButton.click();
              }, 500);
            }else{
              let actionButton = getButton();
              actionButton.click();
            }
          }
        }
      }, 1000);
    }
  }, 1000);
}