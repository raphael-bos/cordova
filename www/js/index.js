var MainController = (function(){

  var self = { };

  self.videoStream;

  self.Initialize = function(){

    InitMdc();
    if(typeof(cordova) !== "undefined"){
      document.addEventListener('deviceready', function(){
        RequestCameraPermission(RequestUserMedia, console.log);
      });
    }
    else{
      RequestUserMedia();
    }

  };

  var InitMdc = function(){
    
    mdc.autoInit()

    let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
    document.querySelector('.menu').addEventListener('click', () => drawer.open = true);
    // const slider = new mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
  };

  var RequestCameraPermission = function(callback, fallback){
    const permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.CAMERA, callback, fallback);
  };

  var RequestUserMedia = function(){
    var fallback = function(e) {
      console.log('Deu ruim!', e);
    };

    var callback = function(mediaStream){
      self.videoStream = mediaStream;
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(self.videoStream);
    };

    var constraints = { video: true};

    navigator.mediaDevices.getUserMedia(constraints).then(callback).catch(fallback);
    
    };

  return self;
})();