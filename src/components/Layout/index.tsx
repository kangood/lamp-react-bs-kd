import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { routes } from '@/routes/menus';
import style from './index.module.less';

/**
 * 菜单切换
 */
const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;

/**
* 外层框架
*/
const Layout = () => {
  // 路由插槽，显示页面内容用的
  const outlet = useOutlet();
  // 导航操作
  const nav = useNavigate();

  return (
    // [高级布局]详见antd pro文档https://procomponents.ant.design/components/layout
    <ProLayout
      layout="mix"
      siderWidth={150}
      menuItemRender={menuItemRender}
      // 路由配置
      route={{
        path: '/',
        routes,
      }}
      // 个人头像设置
      avatarProps={{
        src: 'https://water-drop-resources.oss-cn-chengdu.aliyuncs.com/images/rc-upload-1689399273882-2.jpg',
        title: '个人头像',
        size: 'small',
      }}
      title={false}
      // logo设置
      logo={(
        <img
          src="https://water-drop-resources.oss-cn-chengdu.aliyuncs.com/images/logo-black.png"
          alt="logo"
          className={style.logo}
        />
      )}
      onMenuHeaderClick={() => nav('/home')}
    >
      <div>
        {outlet}
      </div>
    </ProLayout>
  );
};

export default Layout;
