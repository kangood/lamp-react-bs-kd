import { FIND_PARAMETER_LIST } from '@/graphql/parameter';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { TParametersQuery } from '@/utils/types';
import { useQuery } from '@apollo/client';

/**
 * 分页+条件查询参数集
 */
export const useParameterList = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  // 请求后端API
  const { data, loading, refetch } = useQuery<TParametersQuery>(FIND_PARAMETER_LIST, {
    // skip可以跳过这个这个API的参数结构，由refetch覆盖
    skip: true,
    variables: {
      parameterQueryDtox: {
        pageNum,
        pageSize,
      },
    },
  });
  // 刷新查询的处理函数
  const refetchHandler = async (params: {
    name?: string;
    key?: string;
    value?: string;
    pageSize?: number;
    current?: number;
  }) => {
    // 会去请求上面useQuery的API
    const { data: res, errors } = await refetch({
      parameterQueryDto: {
        name: params.name || '',
        key: params.key || '',
        value: params.value || '',
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });

    if (errors) {
      return {
        success: false,
      };
    }
    // 返回ProTable指定的参数：{success,data,total}
    return {
      success: true,
      data: res?.findParameterList.data,
      total: res?.findParameterList.page.total,
    };
  };
  // 返回数据以及loading状态、刷新处理函数
  return {
    loading,
    refetch: refetchHandler,
    data: data?.findParameterList.data,
    page: data?.findParameterList.page,
  };
};
