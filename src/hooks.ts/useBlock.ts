import { QueryClient, useMutation } from '@tanstack/react-query';
import { format } from '../utils/format';
import blockServices from '../services/block';

const useBlock = (
  authContext: AuthContextValue,
  queryClient: QueryClient,
  selectedIds: number[]
) => {
  const block = useMutation({
    mutationFn: () => blockServices.block(authContext.token, selectedIds),
    onSuccess: (response) => {
      if (!response || !authContext.user)
        throw new Error('Error blocking users');

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

  return block;
};

export default useBlock;
