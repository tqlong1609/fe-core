import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export type ExampleState = {
  value: number | null;
};

const initialState: ExampleState = { value: null };

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    handleExample: (state, action: PayloadAction<any>) => {},
  },
  extraReducers: (builder) => {},
});

export const { handleExample } = exampleSlice.actions;

export const selectExample = (state: AppState) => state.example;
