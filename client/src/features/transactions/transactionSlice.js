import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const calculateSettlements = createAsyncThunk(
  'transactions/calculateSettlements',
  async (transactions, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/transactions`);
      for (const t of transactions) {
        await axios.post(`${API_URL}/transaction`, t);
      }
      const response = await axios.get(`${API_URL}/settlements`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearAllTransactions = createAsyncThunk(
  'transactions/clearAll',
  async () => {
    await axios.delete(`${API_URL}/transactions`);
    return [];
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    localTransactions: [],
    settlements: [],
    view: 'form',
    status: 'idle',
    error: null,
  },
  reducers: {
    addLocalTransaction: (state, action) => {
      state.localTransactions.push(action.payload);
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    clearLocal: (state) => {
        state.localTransactions = [];
        state.settlements = [];
        state.view = 'form';
        state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateSettlements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(calculateSettlements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settlements = action.payload;
        state.view = 'results';
      })
      .addCase(calculateSettlements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(clearAllTransactions.fulfilled, (state) => {
        state.localTransactions = [];
        state.settlements = [];
        state.view = 'form';
        state.status = 'idle';
      });
  },
});

export const { addLocalTransaction, setView, clearLocal } = transactionSlice.actions;
export default transactionSlice.reducer;