const findImages = require('./js/findImages.js');
const log = require('./js/log.js');

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
  log.addLog(`다운로드를 시작합니다. 그림이 실제로 다운로드가 안될 경우 입력하신 값들(특히 NID_AUT, NID_SES)을 다시 확인하세요.`);

  let titleId = document.getElementById("titleId").value;
  let startNo = document.getElementById("startNo").value;
  let endNo = document.getElementById("endNo").value;
  let path = document.getElementById("path").files[0].path;
  let nidAut = document.getElementById("nidAut").value;
  let nidSes = document.getElementById("nidSes").value;
  
  for(let i = startNo; i <= endNo; i++)
  setTimeout(() => {
    findImages.findWebToonImages(titleId, i, path, nidAut, nidSes);
  }, i * 2 * 1000);
  return false;
}