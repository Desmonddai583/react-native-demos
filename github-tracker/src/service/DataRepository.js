import { 
  AsyncStorage
} from 'react-native';
import HttpUtils from '../utils/HttpUtils';

class DataRepository {
  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalRepository(url)
        .then(result => {
          if (result) {
            resolve(result);
          } else {
            this.fetchNetRepository(url)
              .then(netResult => {
                resolve(netResult);
              })
              .catch(e => {
                reject(e);
              });
          }
        })
        .catch(() => {
          this.fetchNetRepository(url)
              .then(netResult => {
                resolve(netResult);
              })
              .catch(netError => {
                reject(netError);
              });
        });
    });
  }

  fetchLocalRepository(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }        
        } else {
          reject(error);
        }
      });
    });
  }

  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      HttpUtils.get(url)
        .then(result => {
          if (!result) {
            reject(new Error('responseData is null'));
            return;
          }
          resolve(result.items);
          this.saveRepository(url, result.items);
        })
        .catch(e => {
          reject(e);
        });
    }); 
  }

  saveRepository(url, items, callBack) {
    if (!url || !items) return;
    const wrapData = { items, update_date: new Date().getTime() };
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
  }

  checkDate(longTime) {
    const cDate = new Date();
    const tDate = new Date();
    tDate.setTime(longTime);
    if (cDate.getMonth() !== tDate.getMonth()) return false;
    if (cDate.getDay() !== tDate.getDay()) return false;
    if (cDate.getHours() - tDate.getHours() > 4) return false;
    return true;
  }
}

export default DataRepository;
