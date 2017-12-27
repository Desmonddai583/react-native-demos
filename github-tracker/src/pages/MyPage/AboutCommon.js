import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Platform
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import FavoriteService from '../../service/FavoriteService';
import RepositoryService from '../../service/RepositoryService';
import { FLAG_STORAGE } from '../../service/DataRepository';
import RepositoryCell from '../../components/RepositoryCell';

export const FLAG_ABOUT = {
  flag_about: 'about',
  flag_about_me: 'about_me'
};

class AboutCommon extends Component {
  constructor(props, updateState, flagAbout, config) {
    super(props);
    this.props = props;
    this.updateState = updateState;
    this.flag_about = flagAbout;
    this.repositories = [];
    this.favoriteKeys = null;
    this.config = config;
    this.favoriteService = new FavoriteService(FLAG_STORAGE.flag_popular);
    this.repositoryService = new RepositoryService(this);
  }

  componentDidMount() {
    if (this.flag_about === FLAG_ABOUT.flag_about) {
      this.repositoryService.fetchRepository(this.config.info.currentRepoUrl);
    } else {
      const urls = [];
      const items = this.config.items;
      for (let i = 0, l = items.length; i < l; i++) {
        urls.push(this.config.info.url + items[i]);
      }
      this.repositoryService.fetchRepositories(urls);
    }
  }

  onSelect(projectModel) {
    this.props.navigation.navigate('my_about_repo_detail', {
      projectModel,
      flag: FLAG_STORAGE.flag_popular,
      onUpdate: this.onUpdate,
      ...this.props
    });
  }

  onUpdate = () => {
    if (this.flag_about === FLAG_ABOUT.flag_about) {
      this.repositoryService.fetchRepository(this.config.info.currentRepoUrl);
    } else {
      const urls = [];
      const items = this.config.items;
      for (let i = 0, l = items.length; i < l; i++) {
        urls.push(this.config.info.url + items[i]);
      }
      this.repositoryService.fetchRepositories(urls);
    }
  }

  onFavorite(item, isFavorite) {
    if (isFavorite) {
      this.favoriteService.saveFavoriteItem(
        item.id.toString(), 
        JSON.stringify(item)
      );
    } else {
      this.favoriteService.removeFavoriteItem(item.id.toString());
    }
  }

  onNotifyDataChanged(items) {
    this.updateFavorite(items);
  }

  getParallaxRenderConfig(params) {
    const config = {};
    config.renderBackground = () => (
      <View key="background">
        <Image 
          source={{ uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                  }}
        />
        <View 
          style={{ position: 'absolute',
                   top: 0,
                   width: window.width,
                   backgroundColor: 'rgba(0,0,0,.4)',
                   height: PARALLAX_HEADER_HEIGHT
                }}
        />
      </View>
    );
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image 
          style={styles.avatar} 
          source={{
            uri: params.avatar,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE
          }}
        />
        <Text style={styles.sectionSpeakerText}>
          {params.name}
        </Text>
        <Text style={styles.sectionTitleText}>
          {params.description}
        </Text>
      </View>
    );
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        {ViewUtils.getLeftButton(() => this.props.navigation.goBack())}
      </View>
    );
    return config;
  }

  async updateFavorite(repositories) {
    if (repositories) {
      this.repositories = repositories;
    }
    if (!this.repositories) return;
    this.favoriteKeys = await this.favoriteService.getFavoriteKeys();
    const projectModels = [];
    for (let i = 0, len = this.repositories.length; i < len; i++) {
      const data = this.repositories[i];
      const item = data.item ? data.item : data;
      projectModels.push({
        isFavorite: ArrayUtils.checkExist(item, this.favoriteKeys || []),
        item
      });
    }
    this.updateState({
      projectModels
    });
  }

  renderRepository(projectModels) {
    if (!projectModels || projectModels.length === 0) return null;
    const views = [];
    for (let i = 0, l = projectModels.length; i < l; i++) {
      const projectModel = projectModels[i];
      views.push(
        <RepositoryCell
          key={i}
          projectModel={projectModel}
          onSelect={() => this.onSelect(projectModel)}
          onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
        />
      );
    }
    return views;
  }

  render(contentView, params) {
    const renderConfig = this.getParallaxRenderConfig(params);
    return (
      <ParallaxScrollView
        headerBackgroundColor="#333"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        backgroundColor='#2196F3'
        {...renderConfig}
      >
        {contentView}
      </ParallaxScrollView>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default AboutCommon;
