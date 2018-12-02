const request = require('request');
const cheerio = require('cheerio');
const downloadImages = require('./downloadImages.js')
const log = require('./log.js')

const findWebToonImages = (titleId, no, path, nid_aut, nid_ses) => { // titleId is Webtoon's id, no is Sequence's id
  console.log(`${no}화 저장중..`);
  log.addLog(`${titleId}의 ${no}화를 저장중입니다.`)
  let cookieJar = request.jar();  // 19세 이상 인증 웹툰에 대해서는 19세 이상인 네이버 아이디로 로그인 된 계정에서 쿠키를 가져와야함.
  cookieJar.setCookie(`NID_AUT=${nid_aut}; path=/; domain=naver.com`, 'http://comic.naver.com');
  cookieJar.setCookie(`NID_SES=${nid_ses}; path=/; domain=naver.com`, 'http://comic.naver.com');

  request({
    jar:cookieJar,
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
        path,
        1,
        endNumber
      );
    } else {
      console.log('err ' + titleId + " " + no + "화. 재시도 합니다. 남은 재시도 횟수 : 3");
      log.addErrorLog(`${titleId}의 ${no}화에서 이미지 링크를 추출하다가 실패했습니다. 남은 재시도 횟수 : 3`);
      retryFindWebToonImages(titleId, no, path, nid_aut, nid_ses, 3);
      console.log(error);
    }
  });
}

const retryFindWebToonImages = (titleId, no, path, nid_aut, nid_ses, retryCount) => { // titleId is Webtoon's id, no is Sequence's id
  let cookieJar = request.jar();  // 19세 이상 인증 웹툰에 대해서는 19세 이상인 네이버 아이디로 로그인 된 계정에서 쿠키를 가져와야함.
  cookieJar.setCookie(`NID_AUT=${nid_aut}; path=/; domain=naver.com`, 'http://comic.naver.com');
  cookieJar.setCookie(`NID_SES=${nid_ses}; path=/; domain=naver.com`, 'http://comic.naver.com');

  request({
    jar:cookieJar,
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
        path,
        1,
        endNumber
      );
    } else {
      console.log('err ' + titleId + " " + no + "화. 재시도 합니다. 남은 재시도 횟수 : " + --retryCount);
      log.addErrorLog(`${titleId}의 ${no}화에서 이미지 링크를 추출하다가 실패했습니다. 남은 재시도 횟수 : ${retryCount}`);
      if(retryCount > 0)
        retryFindWebToonImages(titleId, no, path, nid_aut, nid_ses, retryCount);
      console.log(error);
    }
  });
}

// ex)
// findWebToonImages(
//   570503,
//   163
// );

// for(let i = 1; i <= 273; i++)
//   setTimeout(() => {
//     findWebToonImages(570503, i);
//   }, i * 2 * 1000);
// // }, 0);
  

module.exports = {
  findWebToonImages: findWebToonImages
}