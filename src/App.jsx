import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from './redux/features/postSlice';

const App = () => {
  const { isLoading, errorMsg, post } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPost({
        post_id: 2,
      })
    );
  }, []);

  if (isLoading) {
    return <p className='loading'>Loading...</p>;
  }
  if (errorMsg) {
    return <p className='error-msg'>{errorMsg}</p>;
  }

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </div>
  );
};

export default App;
