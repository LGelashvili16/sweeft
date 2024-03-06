import { PhotoType } from '../models/models';

export const splitData = (data: PhotoType[]) => {
  const length = Math.ceil(data.length / 3);

  return [
    data.slice(0, length),
    data.slice(length, 2 * length),
    data.slice(2 * length),
  ];
};

// This function iterates over the array, slicing it into portions. Each portion is then further divided into three parts. During each iteration, the function appends the previous data with new data into the created three chunked arrays.

export const splitChunkDataIntoThree = (
  data: PhotoType[],
  page = 1,
  per_page: number,
  columnsNum = 3
) => {
  const firstArr = [];
  const secondArr = [];
  const thirdArr = [];

  const oneThirdOfPerPage = Math.ceil(per_page / columnsNum);

  const dataSlice = data.slice((page - 1) * per_page, per_page * page);

  for (let i = 0; i < columnsNum; i++) {
    const newData = dataSlice.slice(
      i * oneThirdOfPerPage,
      oneThirdOfPerPage * (i + 1)
    );

    if (i % 3 === 0) {
      firstArr.push(...newData);
    }

    if (i % 3 === 1) {
      secondArr.push(...newData);
    }

    if (i % 3 === 2) {
      thirdArr.push(...newData);
    }
  }

  return [firstArr, secondArr, thirdArr];
};
