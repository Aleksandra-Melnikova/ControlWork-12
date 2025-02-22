import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import PhotoItem from "./PhotoItem.tsx";
import { selectFetchLoading, selectPhotoItems } from './photosSlice.ts';
import {
  deletePhoto, fetchPhotos, fetchPhotosForOneUser,

} from './photosThunk.ts';
import { selectUser } from '../users/UserSlice.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useNavigate } from 'react-router-dom';

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotoItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userID");
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();


  const fetchAllPhotos = useCallback(() => {
    if (userId) {
      dispatch(fetchPhotosForOneUser(userId));
    } else {
      dispatch(fetchPhotos());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    void fetchAllPhotos();
  }, [fetchAllPhotos]);

  const deleteOnePhoto = async (id: string) => {
    await dispatch(deletePhoto(id));
    void fetchAllPhotos();
  };

  return (<>
    <div className="container row justify-content-center mt-0 pt-0 px-0">
      <div className="col-12 ">
        <div className="row justify-content-center align-items-center">
        {userId? <h3 className={'title col-3'}>{photos.length>0? photos[0].user.displayName: user?.displayName} gallery</h3>:null}
       {user?.token && user._id === userId? <button className={'btn-color-new w-25 ms-auto col-3 mt-0 text-white'} onClick={()=>navigate('/photos/add_photo')}>Add new Photo</button>: null}</div>
        <>
          {isFetchLoading ? (
            <Loader />
          ) : (
            <div className="d-flex flex-row gap-5 flex-wrap align-items-center mt-2">
              <>
                {photos.length > 0 ? (
                  user?.role === "admin" ? (
                    <>
                      {photos.map((photo) => (
                        <PhotoItem
                          onDelete={deleteOnePhoto}
                          key={photo._id}
                          title={photo.title}
                          image={photo.image}
                          id={photo._id}
                          userName={photo.user.displayName}
                          userID={photo.user._id}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {photos.map((photo) => (
                        <PhotoItem
                          userID={photo.user._id}
                          key={photo._id}
                          title={photo.title}
                          image={photo.image}
                          id={photo._id}
                          userName={photo.user.displayName}                        />
                      ))}
                    </>
                  )
                ) : (
                  <p className={' d-inline-block mx-auto mt-5 fs-3'}> No photos</p>
                )}
              </>
            </div>
          )}
        </>
      </div>
    </div>
    </>
  );
};

export default Photos;
