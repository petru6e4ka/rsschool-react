import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export type Countries = string[];

export const countriesInitialState: Countries = ['USA', 'UK', 'France', 'Germany', 'Canada'];

export type RequestParams = string;

const countriesSlice = createSlice({
  name: 'countries',
  initialState: countriesInitialState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
export const useCountriesSelector = () => useSelector((state: { countries: Countries }) => state.countries);
