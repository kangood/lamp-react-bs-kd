import { gql } from '@apollo/client';

export const FIND_PARAMETER_LIST = gql`
query findParameterList($parameterQueryDto: ParameterQueryDto!) {
  findParameterList(parameterQueryDto: $parameterQueryDto) {
    code
    message
    data {
      id
      key
      value
      name
      describe
      state
      readonly
      createdAt
    }
    page {
      pageNum
      pageSize
      total
    }
  }
}
`;

export const COMMIT_PARAMETER = gql`
mutation commitParameterInfo($params: ParameterInput!, $id: Float) {
  commitParameterInfo(params: $params, id: $id) {
    code
    message
  }
}
`;

export const FIND_PARAMETER = gql`
query findParameter($id: Float!) {
  findParameter(id: $id) {
    code
    message
    data {
      id
      key
      value
      name
      describe
    }
  }
}
`;
