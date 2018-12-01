const request = require('request');
const cheerio = require('cheerio');
const downloadImages = require('./downloadImages.js')

const findWebToonImages = (titleId, no) => { // titleId is Webtoon's id, no is Sequence's id
  console.log(`${i}화 저장중..`);
  request({
    uri:`http://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}`,
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);

      let endNumber = $('.wt_viewer img').length;
      let uriArr = $('.wt_viewer img');

      // [ 'http://imgcomic.naver.net/webtoon/570503/163/20170118234836_ae150a0a5f1de3051579f72a0e1b27bb_IMAG01_1.jpg',
      // 'http://imgcomic.naver.net/webtoon/570503/163/20170118234836_ae150a0a5f1de3051579f72a0e1b27bb_IMAG01_2.jpg' , ...]
      downloadImages.downloadWebToonImages(
        uriArr,
        no,
        `.\\images`,
        1,
        endNumber
      );
    } else {
      console.log('err ' + no + "화. 재시도 합니다. 남은 재시도 횟수 : 3");
      retryFindWebToonImages(titleId, no);
      console.log(error);
    }
  });
}

const retryFindWebToonImages = (titleId, no, retryCount) => { // titleId is Webtoon's id, no is Sequence's id
  request({
    uri:`http://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}`,
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);

      let endNumber = $('.wt_viewer img').length;
      let uriArr = $('.wt_viewer img');

      // [ 'http://imgcomic.naver.net/webtoon/570503/163/20170118234836_ae150a0a5f1de3051579f72a0e1b27bb_IMAG01_1.jpg',
      // 'http://imgcomic.naver.net/webtoon/570503/163/20170118234836_ae150a0a5f1de3051579f72a0e1b27bb_IMAG01_2.jpg' , ...]
      downloadImages.downloadWebToonImages(
        uriArr,
        no,
        `.\\images`,
        1,
        endNumber
      );
    } else {
      console.log('err ' + no + "화. 재시도 합니다. 남은 재시도 횟수 : " + --retryCount);
      retryFindWebToonImages(titleId, no, retryCount);
      console.log(error);
    }
  });
}

// ex)
// findWebToonImages(
//   570503,
//   163
// );

for(let i = 1; i <= 273; i++)
  setTimeout(() => {
    findWebToonImages(570503, i);
  }, i * 2 * 1000);
// }, 0);
  

module.exports = {
  findWebToonImages: findWebToonImages
}