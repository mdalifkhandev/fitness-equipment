import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store'; 

const initialState: string[] = [];

const myCardSlice = createSlice({
  name: 'mycard',
  initialState,
  reducers: {
    setMyCard: (state, action: PayloadAction<string[]>) => {
      state.push(...action.payload); 
    },
  },
});

export const { setMyCard } = myCardSlice.actions;

export default myCardSlice.reducer;

// Selector to get the number array
export const selectMyCard = (state: RootState) => state.MyCard;
