import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import viewTrailerSLice from '../data/viewTrailerSlice'
import YouTubePlayer from './YoutubePlayer';

import '../styles/modal.scss';

const Modal = () => {
    const dispatch = useDispatch();
    const videoKey = useSelector(state => state.viewTrailer.key);
    const { closeViewTrailerModal } = viewTrailerSLice.actions;
    const handleOnClose = useCallback(() => dispatch(closeViewTrailerModal()), [closeViewTrailerModal, dispatch]);
    const stopPropagation = useCallback(e => e.stopPropagation(), []);

    return (
        <div className="modal-backdrop" onClick={handleOnClose}>
            <div className="modal-content">
                <div className="modal-video" data-testid="modal-video" onClick={stopPropagation}>
                    {videoKey ? (
                        <YouTubePlayer videoKey={videoKey} />
                    ) : (
                        <div className="no-trailer">
                            <h6>No trailer available. Try another movie</h6>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Modal;
