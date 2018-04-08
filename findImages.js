const request = require('request');
const cheerio = require('cheerio');
const downloadImages = require('./downloadImages.js')

const findWebToonImages = (titleId, no) => { // titleId is Webtoon's id, no is Sequence's id
  request({
    uri:`http://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}`,
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      const $ = cheerio.load(body);

      let endNumber = $('.wt_viewer img').length;
      let uri = $('.wt_viewer img')[0].attribs.src.split('1.jpg')[0];
      // [ 'http://imgcomic.naver.net/webtoon/570503/163/20170118234836_ae150a0a5f1de3051579f72a0e1b27bb_IMAG01_', '' ]

      downloadImages.downloadWebToonImages(
        uri,
        '.',
        1,
        endNumber
      );
    } else {
      console.log(error);
    }
  });
}

// ex)
// findWebToonImages(
//   570503,
//   163
// );
