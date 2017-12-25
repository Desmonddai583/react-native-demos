import DataRepository, { FLAG_STORAGE } from './DataRepository';

export default class RepositoryUtils {
  constructor(aboutCommon) {
    this.aboutCommon = aboutCommon;
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_my);
    this.itemMap = new Map();
  }

  updateData(k, v) {
    this.itemMap.set(k, v);
    const arr = [];
    for (const value of this.itemMap.values()) {
      arr.push(value);
    }
    this.aboutCommon.onNotifyDataChanged(arr);
  }

  fetchRepository(url) {
    this.dataRepository.fetchRepository(url)
      .then(result => {
        if (result) {
          this.updateData(url, result);
          if (!this.dataRepository.checkDate(result.update_date)) {
            return this.dataRepository.fetchNetRepository(url);
          }
        } else {
          return this.dataRepository.fetchNetRepository(url);
        }
      })
      .then((item) => {
        if (item) {
          this.updateData(url, item);
        }
      }).catch(e => {
        console.log(e);
      });
  }

  fetchRepositories(urls) {
    for (let i = 0, l = urls.length; i < l; i++) {
      const url = urls[i];
      this.fetchRepository(url);
    }
  }
}
