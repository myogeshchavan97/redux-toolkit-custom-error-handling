import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPost = createAsyncThunk(
  'posts/getPost',
  async ({ post_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${post_id}`
      );
      return data;
    } catch (error) {
      console.log('response', error.response);
      if (error.response?.status === 404) {
        return rejectWithValue('Invalid post id.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLoading: false,
    errorMsg: '',
    post: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMsg = '';
      state.post = action.payload;
    }),
    builder.addCase(getPost.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMsg =
        action.payload || 'Error while getting a post. Try again later.';
    });
    // [getPost.pending]: (state) => {
    //   state.isLoading = true;
    //   state.errorMsg = '';
    // },
    // [getPost.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.errorMsg = '';
    //   state.post = action.payload;
    // },
    // [getPost.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.errorMsg =
    //     action.payload || 'Error while getting a post. Try again later.';
    // },
  },
});

export default postSlice.reducer;
