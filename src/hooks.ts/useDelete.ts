import { QueryClient, useMutation } from '@tanstack/react-query';
import deleteServices from '../services/deleteUsers';
import { format } from '../utils/format';

const useDelete = (
  authContext: AuthContextValue,
  queryClient: QueryClient,
  selectedIds: number[]
) => {
  const deletion = useMutation({
    mutationFn: () =>
      deleteServices.deleteUsers(authContext.token, selectedIds),
    onSuccess: (response) => {
      if (!response || !authContext.user)
        throw new Error('Error deleting users');

      const exists = authContext.userExists(
        authContext.user.id,
        response.data.users
      );

      if (!exists) {
        authContext.logout();
      }

      queryClient.setQueryData(
        ['todos', authContext.user?.id],
        format(response.data.users)
      );
    },
  });

  return deletion;
};

export default useDelete;
