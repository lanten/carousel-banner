## carousel-banner 图片轮播组件

- 不支持 IE (所有版本) (有需要可以使用 babel 编译成 es5)
- ES6 语法,原生无依赖

## 示例 : http://lanten.github.io/carousel-banner/index.html

```js
  let imageUrls = [
    'http://lanten.fun/image-swipe/images/1.png',
    'http://lanten.fun/image-swipe/images/2.png',
    'http://lanten.fun/image-swipe/images/3.png',
  ]


  let banner = new Banner({
    images: imageUrls,
    width: 1000,
    interval: 5000, // 默认值 3000 单位 ms 设为 0 不自动滚动
  })

  document.body.appendChild(banner.render())
```

## API

| API      | 说明                       | 类型   | 默认值 |
| -------- | -------------------------- | ------ | ------ |
| images   | 图片列表                   | Array  | -      |
| width    | 容器宽度                   | number | 500    |
| height   | 容器高度                   | number | 300    |
| interval | 切换速度 (设为0不自动滚动) | number | 3000   |

## 方法

- `render()` 渲染组件
- `jumpTo(index)` 跳转到特定场景 
