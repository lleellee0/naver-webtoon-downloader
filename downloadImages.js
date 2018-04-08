const request = require('request');
const fs = require('fs');

const downloadWebToonImages = (uri, downloadPath, startNumber, endNumber) => { // startNumber is mostly 1
  for(let i = startNumber; i <= endNumber; i++) {
    request({
      uri:uri + i +'.jpg',
      headers: {
        accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        acceptEncoding:'gzip, deflate, sdch',
        acceptLanguage:'ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4',
        connection:'keep-alive',
        host:'imgcomic.naver.net',
        referer:uri + startNumber +'.jpg',
        upgradeInsecureRequests:'1',
        userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
      },
      encoding: 'binary'
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fs.writeFile(`${downloadPath}\\${i}.jpg`, body, 'binary', (err) => {if(err) console.log(err)});
      } else {
        console.log(error);
      }
    });
  }
}

// ex)
// downloadWebToonImages(
//   'http://imgcomic.naver.net/webtoon/570503/163/20170118234836_ae150a0a5f1de3051579f72a0e1b27bb_IMAG01_',
//   '.',
//   1,
//   28);

module.exports = {
  downloadWebToonImages: downloadWebToonImages
}
