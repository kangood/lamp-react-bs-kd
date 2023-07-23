import {
  Button, Col, Drawer, Form, Input, Radio, Row, Space, Spin,
} from 'antd';
import { useState } from 'react';

import { useEditParameterInfo, useParameterInfo } from '@/services/parameter';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  id?: number;
  onClose: (isReload?: boolean) => void;
}

/**
* 新增/编辑 系统参数
*/
const EditParameter = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditParameterInfo();
  const { data, loading } = useParameterInfo(id);
  const [open, setOpen] = useState(true);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const newValues = {
        ...values,
      };
      edit(id, newValues, onClose);
    }
  };

  return (
    <Drawer
      title={id ? '编辑参数' : '新建参数'}
      width={720}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            提交
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        {(data || !id) && (
        <Form
          form={form}
          initialValues={data}
        >
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                style={{ width: '100%' }}
                label="参数键"
                name="key"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="参数名称"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="参数值"
                name="value"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                label="描述"
                name="describe"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="状态"
                name="state"
                rules={[{ required: true }]}
              >
                <Radio.Group defaultValue>
                  <Radio.Button value>启用</Radio.Button>
                  <Radio.Button value={false}>禁用</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="内置"
                name="readonly"
                rules={[{ required: true }]}
              >
                <Radio.Group defaultValue={false}>
                  <Radio.Button value>是</Radio.Button>
                  <Radio.Button value={false}>否</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        )}
      </Spin>
    </Drawer>
  );
};

export default EditParameter;
