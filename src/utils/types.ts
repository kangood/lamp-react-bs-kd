export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface IParameter {
  id: number;
  key: string;
  name: string;
  value: string;
  describe: string | null; // 描述
  state: boolean | null; // 状态
  readonly: boolean | null; // 内置
  createAt: string | null; // 创建时间
}

export type TParametersQuery = { [key: string]: { __typename?: 'Query', data: IParameter[], page: IPage } };

export type TParameterQuery = { [key: string]: { __typename?: 'Query', data: IParameter, page: IPage } };
