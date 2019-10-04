import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Slider, { LazyLoadTypes } from 'react-slick';

import PageLoader from 'components/PageLoader';
import { fetchGallery } from 'actions/firebase';
import { generateImageUrl } from 'utils';
import { DataStates } from 'constants/dataStates';
import { State } from 'typings/state';

const GALLERY_ERROR_MESSAGE = 'There seems to be an error. Please refresh or try again later.';

interface GalleryPageProps {
  gallery: Array<string>;
  dataState: string;
  fetchPhotos: () => void;
}

class GalleryPage extends Component<GalleryPageProps> {
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
      lazyLoad: 'ondemand' as LazyLoadTypes,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    if (dataState === DataStates.Error) {
      return GALLERY_ERROR_MESSAGE;
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

function mapStateToProps(state: State.AppState) {
  return {
    gallery: state.gallery.photos,
    dataState: state.gallery.dataState
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchPhotos: () => dispatch<any>(fetchGallery())
  };
}

const Gallery = connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryPage);
export default Gallery;
