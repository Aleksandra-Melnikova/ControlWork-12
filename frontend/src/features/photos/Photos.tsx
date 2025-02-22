import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import PhotoItem from "./PhotoItem.tsx";
import { selectFetchLoading, selectPhotoItems } from './photosSlice.ts';
import {
  deletePhoto, fetchPhotos, fetchPhotosForOneUser,

} from './photosThunk.ts';
import { selectUser } from "../users/UserSlice.ts";
import Loader from '../../components/UI/Loader/Loader.tsx';

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotoItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userID");
  const user = useAppSelector(selectUser);


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
      <div className="col-12 mx-auto text-center">
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
                  <p className={'text-center mt-5 fs-3'}> No photos</p>
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
