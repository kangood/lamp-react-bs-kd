import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './utils/apollo';
import { routes } from './routes/menus';
import Layout from './components/Layout';
import { ROUTE_COMPONENT } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    {/* 浏览器导航 */}
    <BrowserRouter>
      <Routes>
        {/* 内部为antd pro的ProLayout */}
        <Route
          path="/"
          element={<Layout />}
        >
          {/* 循环读取路由配置 */}
          {routes.map((item) => {
            // 把自己写的组件转换为Layout中识别的组件
            const Component = ROUTE_COMPONENT[item.key];
            return (
              <Route
                path={item.path}
                key={item.key}
                element={<Component />}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
);
