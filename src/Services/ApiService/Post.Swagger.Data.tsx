import React from 'react';
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../Api/index';

interface UsePostDataOptions {
  url: string;
  queryKey?: string | string[];
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
}

export const usePostSwaggerData = ({ url, queryKey, onSuccess, onError, onSettled }: UsePostDataOptions): UseMutationResult<any, unknown, any> => {
  const queryClient = useQueryClient();

 return useMutation({
    mutationFn: async(newTodo) => {
      const response: AxiosResponse<any> = await api.post(url, newTodo);
      return response.data;
  },
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries(queryKey);
      }
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
    onSettled: (data, error) => {
      if (onSettled) {
        onSettled(data, error);
      }
    },

  })
};