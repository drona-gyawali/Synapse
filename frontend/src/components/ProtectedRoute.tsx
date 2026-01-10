import { useQuery } from '@tanstack/react-query';
import { CheckAuth } from '../api/auth';
import { Navigate } from 'react-router-dom';
import { LoaderCircleIcon } from 'lucide-react';

function ProtectedRoute({ children }: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: CheckAuth,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center m-[20%] text-gray-500">
        <LoaderCircleIcon className="animation-spin" size={29} />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
