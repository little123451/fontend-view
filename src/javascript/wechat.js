/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
import React from 'react';
import ReactDOM from 'react-dom';
import API from './utils/api';

class Index extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            shareObj: {
                title:'互联网之子',
                desc:'在长大的过程中，我才慢慢发现，我身边的所有事，是可以改变的。',
                imgUrl:'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg'
            },
            images: {
                localId: [],
                serverId: []
            },
            voice: {
                localId: '',
                serverId: ''
            },
            codes: [],
            user: {},
            cardExt: {}
        }
    }

    componentDidMount(){
        // 初始化接口
        let self = this, list = [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ];

        API.wechat.userinfo().then((res)=>{
            console.log(res);
            self.setState({user: res});
        });

        API.wechat.cardSignature('pytl205xYi_sTjmJLMAjThi-mReg').then((res) =>{
            console.log(res);
            self.setState({cardExt: res});
        });

        API.wechat.signature(list);
        wx.error(function(res){console.error(res)});
    }

    /* 判断当前客户端版本是否支持指定JS接口 */
    checkJsApi(){
        wx.checkJsApi({
            jsApiList: ['getNetworkType', 'previewImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: (res) => {
                alert(JSON.stringify(res));
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });
    }

    /* 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口 */
    onMenuShareTimeline(){
        console.log(this)
        let share = this.state.shareObj;
        wx.onMenuShareTimeline({
            title: share.title, // 分享标题
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击分享到朋友圈');
            },
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('已分享');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        alert('已注册获取“分享到朋友圈”状态事件');
    }

    /* 获取“分享给朋友”按钮点击状态及自定义分享内容接口 */
    onMenuShareAppMessage(){
        let share = this.state.shareObj;
        wx.onMenuShareAppMessage({
            title: share.title, // 分享标题
            desc: share.desc,// 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击发送给朋友');
            },
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('已分享');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        alert('已注册获取“发送给朋友”状态事件');
    }

    /* 获取“分享到QQ”按钮点击状态及自定义分享内容接口 */
    onMenuShareQQ(){
        let share = this.state.shareObj;
        wx.onMenuShareQQ({
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: '', // 分享链接
            imgUrl: share.imgUrl, // 分享图标
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击分享到QQ');
            },
            complete: function (res) {
                alert(JSON.stringify(res));
            },
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('已分享');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        alert('已注册获取“分享到 QQ”状态事件');
    }

    /* 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口 */
    onMenuShareWeibo(){
        let share = this.state.shareObj;
        wx.onMenuShareWeibo({
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: '', // 分享链接
            imgUrl: share.imgUrl, // 分享图标
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击分享到微博');
            },
            complete: function (res) {
                alert(JSON.stringify(res));
            },
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('已分享');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        alert('已注册获取“分享到微博”状态事件');
    }

    /* 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口 */
    onMenuShareQZone(){
        let share = this.state.shareObj;
        wx.onMenuShareQZone({
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: '', // 分享链接
            imgUrl: share.imgUrl, // 分享图标
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击分享到QQ空间');
            },
            complete: function (res) {
                alert(JSON.stringify(res));
            },
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('已分享');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        alert('已注册获取“分享到QQ空间”状态事件');
    }

    /* 拍照或从手机相册中选图接口 */
    chooseImage(){
        let self = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                let images = self.state.images;
                images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                alert('已选择 ' + res.localIds.length + ' 张图片');
                self.setState({images:images});
            }
        });
    }

    /* 预览图片接口 */
    previewImage(){
        wx.previewImage({
            current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg', // 当前显示图片的http链接
            urls: [ // 需要预览的图片http链接列表
                'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
                'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
                'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
            ]
        });
    }

    /**
     *  上传图片接口
     *
     *  上传图片有效期3天，
     *  可用微信多媒体接口下载图片到自己的服务器，
     *  此处获得的 serverId 即 media_id。
     **/
    uploadImage(){
        let images = this.state.images;
        if (images.localId.length == 0) {
            alert('请先使用 chooseImage 接口选择图片');
            return;
        }
        let i = 0, length = images.localId.length;
        function upload() {
            wx.uploadImage({
                localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: (res) => {
                    images.serverId.push(res.serverId); // 返回图片的服务器端ID
                    i++; alert('已上传：' + i + '/' + length);
                    if (i < length) upload();
                     else alert(JSON.stringify(images.serverId))
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        }
        upload();
    }

    /* 下载图片接口 */
    downloadImage(){
        let images = this.state.images;
        if (images.serverId.length === 0) {
            alert('请先使用 uploadImage 上传图片');
            return;
        }
        let i = 0, length = images.serverId.length;
        images.localId = [];
        function download() {
            wx.downloadImage({
                serverId: images.serverId[i], // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    images.localId.push(res.localId); // 返回图片下载后的本地ID
                    i++; alert('已下载：' + i + '/' + length);
                    if (i < length) download();
                        else alert(JSON.stringify(images.localId))
                }
            });
        }
        download();
    }

    /* 开始录音接口 */
    startRecord(){
        wx.startRecord({
            cancel: function () {
                alert('用户拒绝授权录音');
            }
        });
    }

    /* 停止录音接口 */
    stopRecord(){
        let self = this;
        wx.stopRecord({
            success: function (res) {
                let voice = self.state.voice;
                voice.localId = res.localId;
                self.setState({voice:voice});
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    /* 监听录音自动停止接口 */
    onVoiceRecordEnd(){
        let self = this;
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                let voice = self.state.voice;
                voice.localId = res.localId;
                self.setState({voice: voice});
                alert('录音时间已超过一分钟');
            }
        });
    }

    /* 播放语音接口 */
    playVoice(){
        let voice = this.state.voice;
        if (voice.localId == '') {
            alert('请先使用 startRecord 接口录制一段声音');
            return;
        }
        wx.playVoice({
            // 需要播放的音频的本地ID，由stopRecord接口获得
            localId: voice.localId
        });
    }

    /* 暂停播放接口 */
    pauseVoice(){
        let voice = this.state.voice;
        wx.pauseVoice({
            // 需要暂停的音频的本地ID，由stopRecord接口获得
            localId: voice.localId
        });
    }

    /* 停止播放接口 */
    stopVoice(){
        let voice = this.state.voice;
        wx.stopVoice({
            // 需要停止的音频的本地ID，由stopRecord接口获得
            localId: voice.localId
        });
    }

    /* 监听语音播放完毕接口 */
    onVoicePlayEnd(){
        wx.onVoicePlayEnd({
            success: function (res) {
                let localId = res.localId; // 返回音频的本地ID
            },
            complete: function (res) {
                alert('录音（' + res.localId + '）播放结束');
            }
        });
    }

    /**
     *  上传语音接口
     *
     *  上传语音有效期3天，可用微信多媒体接口下载语音到自己的服务器，
     *  此处获得的 serverId 即 media_id，参考文档 .
     *  目前多媒体文件下载接口的频率限制为10000次/天，
     *  如需要调高频率，请登录微信公众平台，
     *  在开发 - 接口权限的列表中，申请提高临时上限。
     **/
    uploadVoice(){
        let voice = this.state.voice;
        if (voice.localId == '') {
            alert('请先使用 startRecord 接口录制一段声音');
            return;
        }
        wx.uploadVoice({
            localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                // 返回音频的服务器端ID
                alert('上传语音成功，serverId 为' + res.serverId);
                voice.serverId = res.serverId;
            }
        });
    }

    /* 下载语音接口 */
    downloadVoice(){
        let voice = this.state.voice;
        if (voice.serverId == '') {
            alert('请先使用 uploadVoice 上传声音');
            return;
        }
        wx.downloadVoice({
            serverId: voice.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                // 返回音频的本地ID
                alert('下载语音成功，localId 为' + res.localId);
                voice.localId = res.localId;
            }
        });
    }

    /* 识别音频并返回识别结果 */
    translateVoice(){
        let voice = this.state.voice;
        if (voice.localId == '') {
            alert('请先使用 startRecord 接口录制一段声音');
            return;
        }
        wx.translateVoice({
            localId: voice.localId, // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            complete: function (res) {
                if (res.hasOwnProperty('translateResult')) {
                    // 语音识别的结果
                    alert('识别结果：' + res.translateResult);
                } else {
                    alert('无法识别');
                }
            }
        });
    }

    /* 获取网络状态接口 */
    getNetworkType(){
        wx.getNetworkType({
            success: function (res) {
                // 返回网络类型2g，3g，4g，wifi
                alert(res.networkType);
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    /* 使用微信内置地图查看位置接口 */
    openLocation(){
        wx.openLocation({
            latitude: 23.13730, // 纬度，浮点数，范围为90 ~ -90
            longitude: 113.33445, // 经度，浮点数，范围为180 ~ -180。
            name: '麦当劳地球总部',  // 位置名
            address: '超级板烧鸡腿汉堡大厦C座507', // 地址详情说明
            scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: 'http://weixin.qq.com' // 在查看位置界面底部显示的超链接,可点击跳转
        });
    }

    /* 获取地理位置接口 */
    getLocation(){
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                let speed = res.speed; // 速度，以米/每秒计
                let accuracy = res.accuracy; // 位置精度
                alert(JSON.stringify(res));
            },
            cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
            }
        });
    }

    /* 关闭当前网页窗口接口 */
    closeWindow(){
        wx.closeWindow();
    }

    /* 批量隐藏功能按钮接口 */
    hideMenuItems(){
        wx.hideMenuItems({
            menuList: [ // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                'menuItem:readMode', // 阅读模式
                'menuItem:share:timeline', // 分享到朋友圈
                'menuItem:copyUrl' // 复制链接
            ],
            success: function (res) {
                alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    /* 批量显示功能按钮接口 */
    showMenuItems(){
        wx.showMenuItems({
            menuList: [// 要显示的菜单项，所有menu项见附录3
                'menuItem:readMode', // 阅读模式
                'menuItem:share:timeline', // 分享到朋友圈
                'menuItem:copyUrl' // 复制链接
            ],
            success: function (res) {
                alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    /* 隐藏所有非基础按钮接口 */
    hideAllNonBaseMenuItem(){
        // “基本类”按钮详见附录3
        wx.hideAllNonBaseMenuItem({
            success: function () {
                alert('已隐藏所有非基本菜单项');
            }
        });
    }

    /* 显示所有功能按钮接口 */
    showAllNonBaseMenuItem(){
        wx.showAllNonBaseMenuItem({
            success: function () {
                alert('已显示所有非基本菜单项');
            }
        });
    }

    /* 隐藏右上角菜单 */
    hideOptionMenu(){
        wx.hideOptionMenu();
    }

    /* 显示右上角菜单 */
    showOptionMenu(){
        wx.showOptionMenu();
    }

    /* 扫描二维码并返回结果 */
    scanQRCode_WeChat(){
        wx.scanQRCode();
    }

    /* 扫描二维码并返回结果 */
    scanQRCode_Own(){
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            desc: 'scanQRCode desc',
            success: function (res) {
                let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                alert(JSON.stringify(res));
            }
        });
    }

    /* 跳转微信商品页接口 */
    openProductSpecificView(){
        wx.openProductSpecificView({
            productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw', // 商品id
            extInfo: '123',
            viewType: '' // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
        });
    }

    /* 添加卡券 */
    addCard(){
        let cardExt = this.state.cardExt;
        cardExt.nonce_str = cardExt.nonceStr;
        wx.addCard({
            cardList: [
                {
                    cardId: 'pytl205xYi_sTjmJLMAjThi-mReg',
                    cardExt: JSON.stringify(cardExt)
                },
                {
                    cardId: 'pytl205xYi_sTjmJLMAjThi-mReg',
                    cardExt: JSON.stringify(cardExt)
                }
            ],// 需要添加的卡券列表
            success: function (res) {
                console.log(res);
                // 添加的卡券列表信息
                alert('已添加卡券：' + JSON.stringify(res.cardList));
            },
            cancel: function (res) {
                alert(JSON.stringify(res))
            },
            fail: function(err){
                alert(JSON.stringify(res));
            }
        });
    }

    /* 选择卡券 */
    chooseCard(){
        let ext = this.state.cardExt;
        wx.chooseCard({
            //shopId: '', // 门店Id
            //cardType: 'GROUPON', // 卡券类型
            cardId: 'pytl205xYi_sTjmJLMAjThi-mReg', // 卡券Id
            timestamp: ext.timestamp, // 卡券签名时间戳
            nonceStr: ext.nonceStr, // 卡券签名随机串
            signType: 'SHA1', // 签名方式，默认'SHA1'
            cardSign: ext.signature, // 卡券签名
            success: function (res) {
                res.cardList = JSON.parse(res.cardList);// 用户选中的卡券列表信息
                encrypt_code = res.cardList[0]['encrypt_code'];
                alert('已选择卡券：' + JSON.stringify(res.cardList));
            },
            cancel: function (res) {
                alert(JSON.stringify(res))
            },
            fail: function(err){
                alert(JSON.stringify(err))
            }
        });
    }

    /* 查看卡券 */
    openCard(){
        let cardList = [], codes = this.state.codes;
        if (codes.length < 1) {
            alert('请先使用 chooseCard 接口选择卡券。');
            return false;
        }
        for (let i = 0; i < codes.length; i++) {
            cardList.push({
                cardId: 'pytl205xYi_sTjmJLMAjThi-mReg',
                code: codes[i]
            });
        }
        wx.openCard({
            cardList: cardList,
            cancel: function (res) {
                alert(JSON.stringify(res))
            }
        });
    }

    renderCell(summary, btn, event){
        return (
            <div className="cell">
                <div className="summary">{summary}</div>
                <button className="weui-btn weui-btn_primary" onClick={event.bind(this)}>{btn}</button>
            </div>
        )
    }

    renderFrame(title, cells){
        return(
            <div className="frame">
                <div className="frame-title">{title}</div>
                {cells}
            </div>
        )
    }

    renderUser(){
        let user = this.state.user;
        return(
            <div className="user">
                <img className="avatar" src={user.headimgurl} />
                <div className="name">{user.nickname}</div>
            </div>
        )
    }

    render(){
        let cells = [], frames = [], user = this.renderUser();

        // 基础接口
        cells.push(this.renderCell('判断当前客户端版本是否支持指定JS接口','checkJsApi', this.checkJsApi))
        frames.push(this.renderFrame('基础接口', cells)); cells = [];

        // 分享接口
        cells.push(this.renderCell('获取“分享到朋友圈”按钮点击状态及自定义分享内容接口','onMenuShareTimeline', this.onMenuShareTimeline));
        cells.push(this.renderCell('获取“分享给朋友”按钮点击状态及自定义分享内容接口','onMenuShareAppMessage', this.onMenuShareAppMessage));
        cells.push(this.renderCell('获取“分享到QQ”按钮点击状态及自定义分享内容接口','onMenuShareQQ', this.onMenuShareQQ));
        cells.push(this.renderCell('获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口','onMenuShareWeibo', this.onMenuShareWeibo));
        cells.push(this.renderCell('获取“分享到QQ空间”按钮点击状态及自定义分享内容接口','onMenuShareQZone', this.onMenuShareQZone));
        frames.push(this.renderFrame('分享接口', cells)); cells = [];

        // 图像接口
        cells.push(this.renderCell('拍照或从手机相册中选图接口','chooseImage', this.chooseImage))
        cells.push(this.renderCell('预览图片接口','previewImage', this.previewImage))
        cells.push(this.renderCell('上传图片接口','uploadImage', this.uploadImage))
        cells.push(this.renderCell('下载图片接口','downloadImage', this.downloadImage))
        frames.push(this.renderFrame('图像接口', cells)); cells = [];

        // 音频接口
        cells.push(this.renderCell('开始录音接口','startRecord', this.startRecord))
        cells.push(this.renderCell('停止录音接口','stopRecord', this.stopRecord))
        cells.push(this.renderCell('监听录音自动停止接口','onVoiceRecordEnd', this.onVoiceRecordEnd))
        cells.push(this.renderCell('播放语音接口','playVoice', this.playVoice))
        cells.push(this.renderCell('暂停播放接口','pauseVoice', this.pauseVoice))
        cells.push(this.renderCell('停止播放接口','stopVoice', this.stopVoice))
        cells.push(this.renderCell('监听语音播放完毕接口','onVoicePlayEnd', this.onVoicePlayEnd))
        cells.push(this.renderCell('上传语音接口','uploadVoice', this.uploadVoice))
        cells.push(this.renderCell('下载语音接口','downloadVoice', this.downloadVoice))
        frames.push(this.renderFrame('音频接口', cells)); cells = [];

        // 智能接口
        cells.push(this.renderCell('识别音频并返回识别结果','translateVoice', this.translateVoice))
        frames.push(this.renderFrame('智能接口', cells)); cells = [];

        // 设备信息接口
        cells.push(this.renderCell('获取网络状态接口','getNetworkType', this.getNetworkType))
        frames.push(this.renderFrame('设备信息接口', cells)); cells = [];

        // 地理位置
        cells.push(this.renderCell('使用微信内置地图查看位置接口','openLocation', this.openLocation))
        cells.push(this.renderCell('获取地理位置接口','getLocation', this.getLocation))
        frames.push(this.renderFrame('地理位置', cells)); cells = [];

        //todo 微信摇一摇周边

        // 界面操作接口
        cells.push(this.renderCell('关闭当前网页窗口接口','closeWindow', this.closeWindow))
        cells.push(this.renderCell('批量隐藏功能按钮接口','hideMenuItems', this.hideMenuItems))
        cells.push(this.renderCell('批量显示功能按钮接口','showMenuItems', this.showMenuItems))
        cells.push(this.renderCell('隐藏所有非基础按钮接口','hideAllNonBaseMenuItem', this.hideAllNonBaseMenuItem))
        cells.push(this.renderCell('显示所有功能按钮接口','showAllNonBaseMenuItem', this.showAllNonBaseMenuItem))
        cells.push(this.renderCell('隐藏右上角菜单','hideOptionMenu', this.hideOptionMenu))
        cells.push(this.renderCell('显示右上角菜单','showOptionMenu', this.showOptionMenu))
        frames.push(this.renderFrame('界面操作接口', cells)); cells = [];

        // 微信扫一扫
        cells.push(this.renderCell('调起微信扫一扫接口','scanQRCode(微信处理结果)', this.scanQRCode_WeChat))
        cells.push(this.renderCell('','scanQRCode(直接返回结果)', this.scanQRCode_Own))
        frames.push(this.renderFrame('微信扫一扫', cells)); cells = [];

        // 微信小店接口
        cells.push(this.renderCell('跳转微信商品页接口','openProductSpecificView', this.openProductSpecificView))
        frames.push(this.renderFrame('微信小店接口', cells)); cells = [];

        // 微信卡券
        cells.push(this.renderCell('批量添加卡券接口','addCard', this.addCard))
        cells.push(this.renderCell('拉取适用卡券列表并获取用户选择信息','chooseCard', this.chooseCard))
        cells.push(this.renderCell('查看微信卡包中的卡券接口','openCard', this.openCard))
        frames.push(this.renderFrame('微信卡券', cells)); cells = [];

        return(
            <div className="p-wechat">
                {user}
                {frames}
            </div>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root'));