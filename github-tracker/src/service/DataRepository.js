import HttpUtils from '../utils/HttpUtils';

class DataRepository {
  fetchNetRepository(url) {
    return HttpUtils.get(url);
  }
}

export default DataRepository;
