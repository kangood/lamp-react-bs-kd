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
