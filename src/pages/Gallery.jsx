import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import PageLoader from 'components/PageLoader';
import { fetchGallery } from 'actions/firebase';
import { generateImageUrl } from 'utils';
import DataStates from 'constants/dataStates';

const GALLERY_ERROR_MESSAGE = 'There seems to be an error. Please refresh or try again later.';

class GalleryPage extends Component {
  componentDidMount() {
    const { fetchPhotos } = this.props;
    fetchPhotos();
  }

  renderContents() {
    const { gallery, dataState } = this.props;
    const settings = {
      arrows: true,
      dots: true,
      infinite: true,
      lazyLoad: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    if (dataState === DataStates.Error) {
      return <div>{GALLERY_ERROR_MESSAGE}</div>;
    }

    return (
      <Slider {...settings}>
        {gallery.map(photo => (
          <div key={photo}>
            <img src={generateImageUrl(photo, 'q_50,w_1000,ar_16:9,c_fill')} alt="gallery" />
          </div>
        ))}
      </Slider>
    );
  }

  render() {
    const { dataState } = this.props;
    return (
      <div className="gallery">
        <div className="container">
          <PageLoader className="loader" loaded={dataState !== DataStates.Fetching}>
            {this.renderContents()}
          </PageLoader>
        </div>
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
