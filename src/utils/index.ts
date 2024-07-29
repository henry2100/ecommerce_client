import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Alert from 'components/atoms/Alert';
import { removeValues, setValues } from 'services/storage';
import { BASE_URL, getRequest, postRequest } from '../services/http';
import { getValues } from '../services/storage';
// import { store } from '../redux/store';
import { StatusType } from 'types';
import { resetAppState } from '../redux/app/app.action';
import { resetAuthState } from '../redux/auth/auth.action';

import { store } from '../redux/store'

const state = store.getState();
const darkMode =  state.app.darkMode;

export const inputNum = /^[0-9]*$/;
export const inputFloat = /^\d*\.?(?:\d{1,2})?$/;
export const inputAlpha = /^[a-zA-Z]+$/;
export const inputEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const specialChar = /(?=.*?[#?!@$%^&*-])/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

export const appMode = () => {
  return 'development';
};

export const getSumation = (varObj: any[]) => {
  let sum = varObj.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
  }, 0);

  return sum.toFixed(2);
}

export function toMoney(value: string | any) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  return `₦${formatter.format(value).replace('NGN', '').trim()}`;
}


export const handleException = (error: any) => {
  try {
    if (error.response) {
      Alert('error', error.response.data.message, darkMode);
    } else {
      Alert('error', error.message, darkMode);
    }
  } catch (e) {
    Alert('error', 'We are unable to process your request at the moment.');
  }
};


export const commaSeparateNumber = (val: string) => {
  if (val.length > 3) {
    return (Number(val.replace(/\D/g, '')) || '').toLocaleString();
  }
  return val;
};


export const handleLogout = () => {
  resetAppState();
  resetAuthState();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/dashboard/home";
}


export const getBusinessInitials = (name): string => {
  const bnl: string[] = name.split(' ');
  let initials = bnl[0].charAt(0);
  if (bnl.length === 1) {
    initials = initials + bnl[0].charAt(1) + bnl[0].charAt(2);
  } else if (bnl.length > 1) {
    initials = initials + bnl[1].charAt(0) + bnl[1].charAt(1);
  }
  return initials.toLocaleUpperCase();
};


export function generateRandomAlphanumeric(n: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}


export const getStatus = (code: string): StatusType => {
  switch (code) {
    case '00':
      return 'SUCCESSFUL';
    case 'S20':
      return 'PENDING';
    default:
      return 'FAILED';
  }
};


export const getFileType = (fileName) => {
  return fileName.split('.').pop();
};

export const getRandomObjects = (arr, n) => {
  // Shuffle the array to randomize the order
  const shuffled = arr.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffle
  return shuffled.slice(0, n);
}