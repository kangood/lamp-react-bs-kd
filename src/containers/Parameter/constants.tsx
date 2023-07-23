import { IParameter } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

interface IProps {
  onEditHandler: (id: number) => void
  // onDeleteHandler: (id: number) => void
}

/**
 * 列表的键值定义和处理
 */
export const getColumns: ({
  onEditHandler,
  // onDeleteHandler,
}: IProps) => ProColumns<IParameter, 'text'>[] = ({
  onEditHandler,
  // onDeleteHandler,
}) => [
  {
    title: '参数键',
    dataIndex: 'key',
    width: 100,
    colSize: 0.99,
    // 是否自动缩略
    ellipsis: true,
  },
  {
    title: '参数名称',
    dataIndex: 'name',
    width: 75,
    colSize: 0.99,
  },
  {
    title: '参数值',
    dataIndex: 'value',
    width: 75,
    colSize: 0.99,
  },
  {
    title: '描述',
    dataIndex: 'describe',
    width: 75,
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 75,
    search: false,
  },
  {
    title: '内置',
    dataIndex: 'readonly',
    width: 75,
    search: false,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 75,
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 75,
    // 生成复杂数据的渲染函数。text：当前行的值，entity：当前行数据
    render: (_text, entity) => (
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={() => onEditHandler(entity.id)}
        >
          编辑
        </Button>
        {/* <Button
          key="del"
          type="link"
          onClick={() => onDeleteHandler(entity.id)}
        >
          删除
        </Button> */}
      </Space>
    ),
  },
];
