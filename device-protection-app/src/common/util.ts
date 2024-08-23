import { UseToastOptions } from "@chakra-ui/react";

export const generateSuccessToast = (
  title: React.ReactNode,
  description: React.ReactNode | null = null,
): UseToastOptions => ({
  position: 'top',
  title: title,
  description: description,
  status: 'success',
  isClosable: true,
});


export const generateErrorToast = (
    title: React.ReactNode,
    description: React.ReactNode | null = null,
  ): UseToastOptions => ({
    position: 'top',
    title: title,
    description: description,
    status: 'error',
    isClosable: true,
  });