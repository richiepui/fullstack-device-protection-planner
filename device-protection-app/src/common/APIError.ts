export interface APIError {
    code: number;
    message: string;
    description: string;
  }
  
  export const generateApiError = (
    code: number,
    message: string,
    description = '',
  ): APIError => ({
    code,
    message,
    description,
  });