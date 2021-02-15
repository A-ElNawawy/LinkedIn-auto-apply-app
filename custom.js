window.onload = function(){
  setTimeout(function(){
    let applyButton = document.getElementsByClassName("jobs-apply-button")[0];
    console.log(applyButton);
    applyButton.style.backgroundColor = "red";
    alert("Hello");
    applyButton.click();
  }, 3000);
  
}
.getAttribute("class")