const wiki = require("wikipedia");
const { fetchJson, fetchText } = require('../../util/fetcher')

const wikien = async (query) => {
  try {
    const page = await wiki.page(query);
    const summary = await page.summary();
    const picUrl = summary.originalimage.source || summary.thumbnail.source;
    const caption = `_*Judul* : ${summary.title}_\n_*Deskripsi* : ${summary.description}_\n_*Link* : ${summary.content_urls.desktop.page}_\n_*Ringkasan* : ${summary.extract}_`;
    return { picUrl, caption };
  } catch (ex) {
    return console.log("Error Wikipedia: ", ex);
  }
};

const wikiid = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetchJson(`https://st4rz.herokuapp.com/api/wiki?q=${query}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
    } catch (ex) {
      return console.log("Error Wikipedia: ", ex);
    }
  })
};

module.exports = {
  wikien,
  wikiid
};