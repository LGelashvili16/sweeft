import { QueryClient } from '@tanstack/react-query';
import { CustomError } from '../models/models';
import { ACCESS_KEY, GET_PHOTOS_URL, SEARCH_PHOTOS_URL } from './fetchUrls';

const PAGE_TOP_20 = 1;
export const PER_PAGE_20 = 20;

export const queryClient = new QueryClient();

export async function fetchTopPhotos() {
  const url =
    GET_PHOTOS_URL +
    `?page=${PAGE_TOP_20}&per_page=${PER_PAGE_20}&order_by=popular&client_id=${ACCESS_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    // const error = new Error('An error occurred while fetching the events');
    const error = new CustomError(
      'An error occurred while fetching the photos'
    );

    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function fetchSearchedPhotos(searchTerm: string, page = 1) {
  const url =
    SEARCH_PHOTOS_URL +
    `?page=${page}&per_page=${PER_PAGE_20}&query=${searchTerm}&client_id=${ACCESS_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    // const error = new Error('An error occurred while fetching the events');
    const error = new CustomError(
      'An error occurred while fetching the photos'
    );

    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function fetchPhotoStatistics(id: string) {
  const url = GET_PHOTOS_URL + `/${id}/statistics?client_id=${ACCESS_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    // const error = new Error('An error occurred while fetching the events');
    const error = new CustomError(
      'An error occurred while fetching the photos'
    );

    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function fetchPhoto(id: string) {
  const url = GET_PHOTOS_URL + `/${id}?client_id=${ACCESS_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    // const error = new Error('An error occurred while fetching the events');
    const error = new CustomError(
      'An error occurred while fetching the photos'
    );

    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}
