componentWillMount() {
  if (this.context.isMobile) {
    this.metaContent = document.querySelector('meta[name=viewport]').content;
  }
}

componentDidMount() {
  if (this.context.isMobile) {
    const content = this.metaContent;
    const newContent = content.replace(/maximum-scale=(\d*(\.\d*)?),/g, 'maximum-scale=10,').replace(/user-scalable=no/g, 'user-scalable=yes');
    document.querySelector('meta[name=viewport]').content = newContent;
  }
}

componentWillUnmount() {
  if (this.context.isMobile) {
    document.querySelector('meta[name=viewport]').content = this.metaContent;
  }
}
