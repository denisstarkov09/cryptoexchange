import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';

type State = {
  account: string;
}

const initialState: State = {
  account: '',
};

interface Reducers extends SliceCaseReducers<State> {
  setAccount: (state: State, action: PayloadAction<string>) => void;
}

export const selectAccount: (state: RootState) => string= (state: RootState) => state.auth.account;

const authSlice: Slice<State, Reducers, 'auth'> = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount: (state: State, action: PayloadAction<string>) => {
      state.account = action.payload;
    }
  },
});

export const { setAccount } = authSlice.actions;

export default authSlice.reducer;
