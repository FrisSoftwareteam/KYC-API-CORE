import { useRecoilState } from 'recoil';
import { AgentVerificationFilterState } from '../store/agentverification/filter';
import { useGetAgentVerificationApi } from '../api/get-agent-verifications';
import { useParams } from 'react-router-dom';
import { IAgentVerification } from '@/shared/interface/agent';
import { useAuth } from '@/app/auth/hooks/useAuth';

export const useAgentVerificationHook = () => {
  const { id } = useParams();
  const [filter, setFilter] = useRecoilState(AgentVerificationFilterState);
  const { data: GAVapi, isLoading: GAVloading } = useGetAgentVerificationApi(
    id as string,
    {
      enabled: Boolean(id),
    }
  );
  const { permissionIsLoading, userHasPermission } = useAuth();

  const arrayData: Array<Partial<IAgentVerification>> | undefined =
    GAVapi?.data?.addresses?.map((item) => ({
      status: item?.status,
      _id: item?._id,
      createdAt: item?.createdAt,
      cost: item?.cost,
      category: item?.category,
      candidate: item.candidate,
    }));

  return {
    filter,
    setFilter,
    userHasPermission,
    data: GAVapi,
    isLoading: GAVloading || permissionIsLoading,
    arrayData,
  };
};
