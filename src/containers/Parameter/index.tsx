import { useParameterList } from '@/services/parameter';
import { IParameter } from '@/utils/types';
import { PlusOutlined } from '@ant-design/icons';

import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { getColumns } from './constants';
import EditParameter from './components/EditParameter';

/**
* 参数管理
*/
const Parameter = () => {
  // Table action 的引用，便于自定义触发
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState<number>();
  const [showInfo, setShowInfo] = useState(false);
  // 分页+条件查询参数集
  const { refetch } = useParameterList();

  const onClickAddHandler = (id?: number) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId(undefined);
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false);
    if (isReload) {
      actionRef.current?.reload();
    }
  };

  return (
    <PageContainer>
      <ProTable<IParameter>
        rowKey="id"
        actionRef={actionRef}
        // 获取列表的键值定义，传入handler在内部标签中处理渲染
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          // onDeleteHandler: onClickDelHandler,
        })}
        // 分页
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        // 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-righ
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAddHandler()} type="primary" icon={<PlusOutlined />}>
            添加
          </Button>,
          // <Button
          // key="del" onClick={() => onClickDelHandler()} type="primary" icon={<PlusOutlined />}>
          //   删除
          // </Button>,
        ]}
        // 获取 dataSource 的方法
        request={refetch}
      />
      {showInfo && <EditParameter id={curId} onClose={closeAndRefetchHandler} />}
    </PageContainer>
  );
};

export default Parameter;
