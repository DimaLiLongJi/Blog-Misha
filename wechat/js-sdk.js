// react HOC中
class GameContainer{
  constructor(props) {
    super(props);
    this.configedUrl = ''; // 初始化为''
  }

  componentWillReceiveProps(nextProps) { // 更改location时，重新config
    if (nextProps.location) {
      this.configWX();
    }
  }

  configWX = () => {
    const href = location.href.split('#').[0]; // #之后不要
    setTimeout(() => { // 判断是否是上次config的
      if (this.configedUrl === href) return;
      if (location.href.split('#').[0] !== href) return;
      const config = {
        link: location.href,
        title: '名企内推计划',
        desc: '你的好友正在解锁内推闯关get各项职场技能，而你却还在家吃鸡？',
        imgUrl: '/images/share.jpg',
        onSuccess: this.onShareSuccess, // 分享成功回调
      };
      setWxShareInfo(config);
      this.configedUrl = location.href.split('#').[0];
    }, 200);
  }
}

// service中
let configedUrlList = []; // 先定义一个数组，把东西放进去
export function setWxShareInfo(configObject) {
	const link = configObject.link;
	const title = configObject.title;
	const desc = configObject.desc;
	let imgUrl = configObject.imgUrl;
	const shareLink = configObject.shareLink || null;

	reConfig();

	function reConfig() {
		if (configedUrlList.indexOf(link) !== -1) return; // 判断是不是已经config的地址了
		const xhr = new XMLHttpRequest();
		imgUrl = encodeURI(imgUrl);
		xhr.addEventListener('load', configWX);
		xhr.open('GET', `http://careerfrog.com.cn/api/wechat/signature?pageUrl=${encodeURIComponent(link)}`);
		xhr.send();
	}

	function configWX() {
		const config = JSON.parse(this.responseText);
		const htmlReg = /<\/?[^>]*>/g;
		// config.debug = true;
		config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'scanQRCode'];

		wx.config(config);

		wx.ready(() => {
			configedUrlList.push(link); // config 之后会去更新数组
			console.log('configedUrls', configedUrlList);
			wx.onMenuShareAppMessage({
				title: title.replace(htmlReg, ''),
				desc: desc.replace(htmlReg, ''),
				link: shareLink || link,
				imgUrl,
				type: 'link',
				success() {
					if (configObject.onSuccess) {
						configObject.onSuccess();
					}
				},
				cancel() {
					if (configObject.onSuccess) {
						configObject.onCancel();
					}
				},
			});

			wx.onMenuShareTimeline({
				title,
				desc,
				link: shareLink || link,
				imgUrl,
				success() {
					if (configObject.onSuccess) {
						configObject.onSuccess();
					}
				},
				cancel() {
					if (configObject.onSuccess) {
						configObject.onCancel();
					}
				},
			});
		});

		wx.error((res) => {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			// wx.config(config);
			console.log('res', res);
		});
	}
}
