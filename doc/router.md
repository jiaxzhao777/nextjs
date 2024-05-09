### App Router

首先是定义路由，文件夹被用来定义路由。每个文件夹都代表一个对应到 URL 片段的路由片段。创建嵌套的路由，只需要创建嵌套的文件夹。如`app/dashboard/settings`目录对应的路由地址就是 `/dashboard/settings`

- app/page.js 对应路由 /
- app/dashboard/page.js 对应路由 /dashboard
- app/dashboard/settings/page.js 对应路由/dashboard/settings
- analytics 目录下因为没有 page.js 文件，所以没有对应的路由。这个文件可以被用于存放组件、样式表、图片或者其他文件。
  当然不止 .js 文件，Next.js 默认是支持 React、TypeScript 的，所以 .js、.jsx、.tsx 都是可以的。

#### 布局与模版

同一文件夹下如果有 layout.js 和 page.js，page 会作为 children 参数传入 layout。
换句话说，layout 会包裹同层级的 page。

某些情况下，模板会比布局更适合：

依赖于 `useEffect` 和 `useState` 的功能，比如记录页面访问数（维持状态就不会在路由切换时记录访问数了）、用户反馈表单（每次重新填写）等

更改框架的默认行为，举个例子，布局内的 Suspense 只会在布局加载的时候展示一次 fallback UI，当切换页面的时候不会展示。但是使用模板，fallback 会在每次路由切换的时候展示

#### 定义加载界面（Loading UI）

```jsx
// 在 ProfilePage 组件处于加载阶段时显示 Spinner
<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```

简单的来说，ProfilePage 会 throw 一个数据加载的 promise，Suspense 会捕获这个 promise，追加一个 then 函数，then 函数中实现替换 fallback UI 。当数据加载完毕，promise 进入 resolve 状态，then 函数执行，于是更新替换 fallback UI。

同理，loading.js 关键在于 page.js 导出了一个 async 函数。

loading.js 的实现原理是将 page.js 和下面的 children 用 <Suspense> 包裹。因为 page.js 导出一个 async 函数，Suspense 得以捕获数据加载的 promise，借此实现了 loading 组件的关闭。

#### 定义错误处理

error.js。顾名思义，用来创建发生错误时的展示 UI。

其实现借助了 React 的 Error Boundary 功能。简单来说，就是给 page.js 和 children 包了一层 ErrorBoundary。

#### not-found

触发情况:

1. 当组件抛出了 notFound 函数的时候
2. 当路由地址不匹配的时候

所以 app/not-found.js 可以修改默认 404 页面的样式。但是，如果 not-found.js 放到了任何子文件夹下，它只能由 notFound 函数手动触发。比如这样：

// /dashboard/blog/page.js

```js
import { notFound } from "next/navigation";

export default function Page() {
  notFound();
  return <></>;
}
```

#### 层级关系

![image-20240331163049593](/Users/huzhihua/Library/Application Support/typora-user-images/image-20240331163049593.png)

#### 路由导航
1. 使用 <Link> 组件
2. 使用 useRouter Hook（客户端组件）
3. 使用 redirect 函数（服务端组件）
4. 使用浏览器原生 History API



