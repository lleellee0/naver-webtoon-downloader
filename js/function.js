const findImages = require('./js/findImages.js');
const log = require('./js/log.js');
const fs = require('fs');

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
  
  for(let i = startNo ,j = 0; i <= endNo; i++, j++)
    setTimeout(() => {
      findImages.findWebToonImages(titleId, i, path, nidAut, nidSes, 3);
    }, j * 2 * 1000);
  return false;
}

const onViewerPathChange = () => {
  clearViewerList();
  setViewerList();
}

const clearViewerList = () => {
  let viewerList = document.getElementById("list");
  $(viewerList).html('');
}

const setViewerList = () => {
  let path;
  if(document.getElementById("path").files[0] === undefined)  // "목록으로" 버튼으로 들어온 경우
    path = decodeURI(getUrlVars()["path"]);
  else                                                        // 정상적으로 변경해서 들어온 경우
    path = document.getElementById("path").files[0].path;

  if(path === "undefined")                                    // 처음 창을 열었을 때의 상태
    return;

  console.log(path);
  
  fs.readdir(path, (err, files) => {
    if(err) {
      console.error(err);
      return;
    }
    let noSet = new Set();
    for(let i = 0; i < files.length; i++)
      noSet.add(files[i].split('-')[0]);
    console.log(noSet);
    
    let viewerList = document.getElementById("list");
    noSet.forEach((value)=> {
      $(viewerList).append(`<li><a href="detail.html?no=${value}&path=${path}">${value}</a></li>`);
    });
  });
}

const setViewerImages = () => {
  console.log(window.location.search);

  let no = getUrlVars()["no"];
  let path = decodeURI(getUrlVars()["path"]);

  console.log(no);
  console.log(path);
  
  let viewerImages = document.getElementById("viewer_images");
  fs.readdir(path, (err, files) => {
    if(err) {
      console.error(err);
      return;
    }
    let imageArray = new Array;
    for(let i = 0; i < files.length; i++) {
      if(files[i].split('-')[0] === no) {
        imageArray.push(files[i]);
      }
    }

    imageArray.forEach((value, i) => {
      $(viewerImages).append(`<img class="viewer_image" src="${path+'\\'+value}" style="display: inherit; margin: 0 auto;"></img>`);
    });
  });
}

const setTopBottomMenu = () => {
  let topPrev = document.getElementById("top_prev");
  let topNext = document.getElementById("top_next");
  let topList = document.getElementById("top_list");
  let bottomPrev = document.getElementById("bottom_prev");
  let bottomNext = document.getElementById("bottom_next");
  let bottomList = document.getElementById("bottom_list");

  let no = parseInt(paddingNumber("0000", getUrlVars()["no"]), 10);
  let path = decodeURI(getUrlVars()["path"]);
  console.log(no);
  
  $(topPrev).append(`<a href="detail.html?no=${paddingNumber("0000", no-1)}&path=${path}">이전화</a>`);
  $(topNext).append(`<a href="detail.html?no=${paddingNumber("0000", no+1)}&path=${path}">다음화</a>`);
  $(topList).append(`<a href="list.html?path=${path}">목록으로</a>`);
  $(bottomPrev).append(`<a href="detail.html?no=${paddingNumber("0000", no-1)}&path=${path}">이전화</a>`);
  $(bottomNext).append(`<a href="detail.html?no=${paddingNumber("0000", no+1)}&path=${path}">다음화</a>`);
  $(bottomList).append(`<a href="list.html?path=${path}">목록으로</a>`);
}

const getUrlVars = () => {
  let vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

const paddingNumber = (padString, number) => {
  let pad = padString;
  let numberString = "" + number;
  return pad.substring(0, pad.length - numberString.length) + numberString;
};