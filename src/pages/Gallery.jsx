import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import PageLoader from 'components/PageLoader';
import { fetchGallery } from 'actions/firebase';
import { generateImageUrl } from 'utils';
import DataStates from 'constants/dataStates';

class GalleryPage extends Component {
  componentDidMount() {
    const { fetchPhotos } = this.props;
    fetchPhotos();
  }

  render() {
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
    return (
      <div className="gallery">
        <div className="container">
          <PageLoader className="loader" loaded={dataState === DataStates.Fetched}>
            <Slider {...settings}>
              {gallery.map(photo => (
                <div key={photo}>
                  <img src={generateImageUrl(photo, 'q_30,ar_16:9,c_fill')} alt="gallery" />
                </div>
              ))}
            </Slider>
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
