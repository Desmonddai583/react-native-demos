import { 
  AsyncStorage
} from 'react-native';

export const FLAG_LANGUAGE = {
  flag_language: 'flag_language_language',
  flag_key: 'flag_language_key'
};

const FAVORITE_KEY_PREFIX = 'favorite_';

class FavoriteService {
  constructor(flag) {
    this.flag = flag;
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  saveFavoriteItem(key, value) {
    AsyncStorage.setItem(key, value, (error) => {
      if (!error) {
        this.updateFavoriteKeys(key, true);
      }
    });
  }

  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key, (error) => {
      if (!error) {
        this.updateFavoriteKeys(key, false);
      }
    });
  }

  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        const index = favoriteKeys.indexOf(key);
        if (isAdd) {
          if (index === -1) favoriteKeys.push(key);
        } else if (index !== -1) {
          favoriteKeys.splice(index, 1);
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    });
  }

  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
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

  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys()
        .then(keys => {
          const items = [];
          if (keys) {
            AsyncStorage.multiGet(keys, (err, stores) => {
              try {
                stores.each((result, i, store) => {
                  const value = store[i][0];
                  if (value) {
                    items.push(value);
                  }
                });
                resolve(items);
              } catch (e) {
                reject(e);
              }
            });
          } else {
            resolve(items);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

export default FavoriteService;
