/**
 * warning：本组件 不支持 IE (所有版本)！
 */


class Banner {
  constructor(props) {
    this.props = props
    this.bannerItems = []
    this.nowIndex = 0

    this.prevButton = document.createElement('div')
    this.prevButton.className = 'banner-controller-item'
    this.prevButton.innerHTML = '<span style="margin:0 2px;line-height:12px;"><<</span>'
    this.prevButton.id = 'prev'
    this.prevButton.onclick = () => {
      let toIndex = this.nowIndex - 1
      if (toIndex < 0) toIndex = this.bannerItems.length - 1
      this.jumpTo(toIndex)
    }

    this.nextButton = document.createElement('div')
    this.nextButton.className = 'banner-controller-item'
    this.nextButton.innerHTML = '<span style="margin:0 2px">>></span>'
    this.nextButton.id = 'next'
    this.nextButton.onclick = () => {
      let toIndex = this.nowIndex + 1
      if (toIndex >= (this.bannerItems.length)) toIndex = 0
      this.jumpTo(toIndex)
    }

    this._addStyle()
  }

  jumpTo(index) {
    let contentOffset = this.props.width * index
    this.imageContent.style.left = `-${contentOffset}px`
    this.controller.childNodes.forEach((el, i) => {
      if (i == index + 1) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    });
    this.nowIndex = index
  }

  render() {
    let { images, height = 300, width = 500, interval = 3000 } = this.props
    this.bannerView = document.createElement('div')
    this.controller = document.createElement('div')
    this.imageContent = document.createElement('div')

    this.imageContent.className = 'banner-image-content'
    this.controller.className = 'banner-controller'

    this.bannerView.className = 'banner'
    this.bannerView.style.width = width + 'px'
    this.bannerView.style.height = height + 'px'
    this.imageContent.style.height = height + 'px'


    this.controller.appendChild(this.prevButton)
    this.bannerView.appendChild(this.imageContent)
    this.bannerView.appendChild(this.controller)

    this.bannerItems = images.map(this._renderItem.bind(this))

    this.controller.appendChild(this.nextButton)

    if (interval) this.interval = setInterval(() => {
      this.nextButton.onclick()
    }, interval)

    return this.bannerView
  }

  _renderItem(val, i) {
    let { width, defaultIndex = 0 } = this.props

    let itemView = document.createElement('div')
    itemView.className = 'banner-item'
    itemView.style.backgroundImage = `url(${val})`
    itemView.style.left = width * i + 'px'

    let controllerItem = document.createElement('div')
    controllerItem.className = 'banner-controller-item'
    controllerItem.innerHTML = i + 1
    if (defaultIndex == i) controllerItem.classList.add('active')
    controllerItem.onclick = () => {
      this.jumpTo(i)
    }

    this.controller.appendChild(controllerItem)
    this.imageContent.appendChild(itemView)

    return itemView
  }

  _addStyle() {
    const styleTag = document.createElement('style')
    styleTag.type = 'text/css'
    styleTag.rel = 'stylesheet'
    styleTag.innerHTML = `
    .banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      margin-top: 16px; }
      .banner .banner-image-content {
        left: 0;
        position: relative;
        transition: all 0.8s cubic-bezier(0.175, 0.82, 0.265, 1); }
      .banner .banner-item {
        width: 100%;
        height: 100%;
        background-position: 50%;
        background-size: cover;
        position: absolute;
        top: 0; }
        
      .banner .banner-controller {
        position: absolute;
        z-index: 20;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        bottom: 0; }
        .banner .banner-controller .banner-controller-item {
          transition: all 0.2s ease-in-out;
          background-color: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.95);
          cursor: pointer;
          border-radius: 20px;
          padding: 0 6px;
          margin: 5px 5px;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.55); }
          .banner .banner-controller .banner-controller-item:hover, .banner .banner-controller .banner-controller-item.active {
            padding: 0 15px;
            background-color: rgba(255, 255, 255, 0.95); }
    `
    document.head.appendChild(styleTag)
  }
}