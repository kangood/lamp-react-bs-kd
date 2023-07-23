import { useState, useEffect } from 'react';

/**
*
*/
const EditParameter = ({
  // eslint-disable-next-line react/prop-types
  onClose,
  // eslint-disable-next-line react/prop-types
  id,
}) => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return (
    <div title={id ? '编辑课程' : '新建课程'} onClick={() => onClose()}>333</div>
  );
};

export default EditParameter;
