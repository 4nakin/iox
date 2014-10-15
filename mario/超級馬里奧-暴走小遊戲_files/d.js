window.shareData = {
    name: "超級馬里奧",
    link: "http://game.ioxapp.com/mario/?f=fb_app",
    picture: "http://game.ioxapp.com/mario/icon.png",
    caption: "超級馬里奧 - 不用多說，你懂得！",
    description: "超級馬里奧 - 不用多說，你懂得！"
};

window.ioxapp = {
	home: "http://game.ioxapp.com/"
};

window.fbAsyncInit = function() {
     FB.init({
          appId: '304417756396376',
          xfbml: true,
          version: 'v2.0'
     });
     FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
               console.log('Logged in.');
          } else {
               //FB.login();
          }
     });
};

(function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {
          return;
     }
     js = d.createElement(s);
     js.id = id;
     js.src = "http://connect.facebook.net/zh_TW/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

function fb_share(){
     FB.ui({
          method: 'feed',
          name: window.shareData.name,
          link: window.shareData.link,
          picture: window.shareData.picture,
          caption: window.shareData.caption,
          description: window.shareData.description,
     }, function(response) {});
}