const findImages = require('./js/findImages.js');

// Add Event Lintener
let inputFakePath = document.getElementById("fake-path");
let inputRealPath = document.getElementById("path");

$(inputFakePath).on('click', function() {
  $(inputRealPath).click();
});

$(inputRealPath).on('change', function(event) {
  event.preventDefault();
  $(inputFakePath).val(inputRealPath.files[0].path);
});




const downloadWebtoon = () => {
  let titleId = document.getElementById("titleId").value;
  let startNo = document.getElementById("startNo").value;
  let endNo = document.getElementById("endNo").value;
  let path = document.getElementById("path").files[0].path;
  
  for(let i = startNo; i <= endNo; i++)
  setTimeout(() => {
    findImages.findWebToonImages(titleId, i, path);
  }, i * 2 * 1000);
  return false;
}