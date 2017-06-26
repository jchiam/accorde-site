import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';

import PageLoader from 'components/PageLoader';
import { fetchGallery } from 'actions/firebase';
import { generateImageUrl } from 'utils';
import DataStates from 'constants/dataStates';

class GalleryPage extends Component {
  static prepareImageUrls(photos) {
    const images = [];
    photos.forEach((photo) => {
      images.push({
        original: generateImageUrl(photo, 'q_30,ar_16:9,c_fill'),
        thumbnail: generateImageUrl(photo, 'w_100,h_67,c_thumb')
      });
    });
    return images;
  }

  componentDidMount() {
    const { fetchPhotos } = this.props;
    fetchPhotos();
  }

  render() {
    const { gallery, dataState } = this.props;
    return (
      <div className="gallery">
        <PageLoader loaded={dataState === DataStates.Fetched}>
          <ImageGallery
            items={GalleryPage.prepareImageUrls(gallery)}
            showFullscreenButton={false}
            showPlayButton={false}
            lazyLoad
          />
        </PageLoader>
      </div>
    );
  }
}

GalleryPage.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataState: PropTypes.string.isRequired,
  fetchPhotos: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    gallery: state.gallery.photos,
    dataState: state.gallery.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhotos: () => dispatch(fetchGallery())
  };
}

const Gallery = connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryPage);
export default Gallery;
