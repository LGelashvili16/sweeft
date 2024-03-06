export class CustomError extends Error {
  code?: number;
  info?: string[];

  constructor(message?: string, code?: number, info?: string[]) {
    super(message);
    this.code = code;
    this.info = info;
  }
}

export type PhotoType = {
  [key: string]: any;
};
