import React, { useEffect } from 'react';
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

const GalleryPage = (props: GalleryPageProps) => {
  const { gallery, dataState, fetchPhotos } = props;

  useEffect(() => { fetchPhotos(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  const sliderSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const renderContents = () => {
    if (dataState === DataStates.Error) {
      return GALLERY_ERROR_MESSAGE;
    }
    return (
      <Slider {...sliderSettings}>
        {gallery.map(photo => (
          <div key={photo}>
            <img src={generateImageUrl(photo, 'q_50,w_1000,ar_16:9,c_fill')} alt="gallery" />
          </div>
        ))}
      </Slider>
    );
  }

  return (
    <div className="gallery">
      <div className="container">
        <PageLoader className="loader" loaded={dataState !== DataStates.Fetching}>
          {renderContents()}
        </PageLoader>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State.AppState) => ({
  gallery: state.gallery.photos,
  dataState: state.gallery.dataState
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPhotos: () => dispatch<any>(fetchGallery())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryPage);
