import { COMMIT_PARAMETER, FIND_PARAMETER, FIND_PARAMETER_LIST } from '@/graphql/parameter';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { IParameter, TParameterQuery, TParametersQuery } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';

/**
 * 分页+条件查询系统参数集
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

/**
 * 更新系统参数
 */
export const useEditParameterInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_PARAMETER);

  const handleEdit = async (
    id: number,
    params: IParameter,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitParameterInfo.code === 200) {
      message.success(res.data.commitParameterInfo.message);
      callback(true);
      return;
    }
    message.error(res.data.commitParameterInfo.message);
  };

  return [handleEdit, loading];
};

export const useParameterInfo = (id?: number) => {
  const { data, loading, refetch } = useQuery<TParameterQuery>(FIND_PARAMETER, {
    skip: !id,
    variables: {
      id,
    },
  });

  return { data: data?.findParameter.data, loading, refetch };
};
