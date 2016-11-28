if (self.CavalryLogger) { CavalryLogger.start_js(["xsjWl"]); }

__d('SpotlightViewerBottomBar',['cx','LeftRight.react','React','joinClasses'],(function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){'use strict';var l=Array.isArray(this.props.children)?this.props.children:[this.props.children],m="_4_8n _51an";if(this.props.className)m=c('joinClasses')(m,this.props.className);if(l.length===1)return (c('React').createElement('div',{className:m},l[0]));m=c('joinClasses')(m,"_50-m");return (c('React').createElement(c('LeftRight.react'),{className:m},l[0],l[1]));};function k(){'use strict';i.apply(this,arguments);}f.exports=k;}),null);
__d('SpotlightViewerBottomBarGroup',['cx','React'],(function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){'use strict';var l=this.props.itemmargin||'right',m=(l=='left'?"marginLeft":'')+(l=='right'?' '+"marginRight":'')+(' '+"_4_8i");return (c('React').createElement('div',{className:m},this.props.children));};function k(){'use strict';i.apply(this,arguments);}f.exports=k;}),null);
__d('MessagingVideoViewer.react',['cx','fbt','ActorURI','ArbiterMixin','AsyncRequest','MessagingForwardingButtonNUX.react','React','ReactFragment','SpotlightViewer','SpotlightViewerBottomBar','SpotlightViewerBottomBarGroup','SpotlightViewerBottomBarLink','SpotlightViewerClose','SpotlightViewport','PageTransitionsRegistrar','PhotoViewerDimensions','XMessagingVideoAttachmentController','Vector','guid'],(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=c('React').PropTypes,k=200,l=c('React').createClass({displayName:'MessagingVideoViewer',propTypes:{disableForward:j.bool,forwardDialogComponent:j.func.isRequired,pageID:j.number,rootClassName:j.string,videoSize:j.instanceOf(c('Vector')).isRequired,videoID:j.string.isRequired,videoURI:j.string.isRequired},mixins:[c('ArbiterMixin')],getInitialState:function m(){var n=new (c('PhotoViewerDimensions'))({verticalPadding:k});return {dimensions:n.getStageDimensions(this.props.videoSize),loading:true,open:true,showForward:false};},componentWillMount:function m(){this._domID=c('guid')();},componentDidMount:function m(){this._loadVideoPlayer();c('PageTransitionsRegistrar').registerCompletionCallback(function(){this.close();return true;}.bind(this));},_loadVideoPlayer:function m(){var n=c('XMessagingVideoAttachmentController').getURIBuilder().setString('video_id',this.props.videoID).setString('video_container_id',this._domID).setInt('width',this.state.dimensions.x).setInt('height',this.state.dimensions.y).getURI();if(this.props.pageID)n=c('ActorURI').create(n,this.props.pageID);this.request=new (c('AsyncRequest'))().setMethod('GET').setURI(n).setReadOnly(true).setHandler(function(o){return this.setState({loading:false});}.bind(this)).send();},close:function m(){if(!this.state.open)return;this.setState({open:false},function(){this.inform('close');});},_showForwardDialog:function m(){this.setState({showForward:true});this.refs.forwardNUX.close();},_hideForwardDialog:function m(){this.setState({showForward:false});},renderLayers:function m(){if(this.props.disableForward)return null;var n=i._("Reenviar en mensaje separados"),o=this.props.forwardDialogComponent;return c('ReactFragment').create({forwardDialog:c('React').createElement(o,{attachmentID:this.props.videoID,onClose:this._hideForwardDialog,shown:this.state.showForward,title:n}),forwardButtonNUX:c('React').createElement(c('MessagingForwardingButtonNUX.react'),{contextRef:function(){return this.refs.forwardButton;}.bind(this),ref:'forwardNUX'},i._("Env\u00eda este video a otras personas en mensajes separados."))});},render:function m(){var n=c('React').createElement('div',{className:"rfloat",id:this._domID}),o;if(!this.props.disableForward)o=c('React').createElement(c('SpotlightViewerBottomBarLink'),{onClick:this._showForwardDialog,ref:'forwardButton'},i._("Reenviar"));return (c('React').createElement('span',null,c('React').createElement(c('SpotlightViewer'),{onHide:this.close,open:this.state.open,rootClassName:this.props.rootClassName},c('React').createElement(c('SpotlightViewport'),{active:true,className:"_39hc",media:n,showLoadingIndicator:this.state.loading,stageDimensions:this.state.dimensions,useWidth:true},c('React').createElement(c('SpotlightViewerClose'),{onClick:this.close}),c('React').createElement(c('SpotlightViewerBottomBar'),{className:"stat_elem"},c('React').createElement(c('SpotlightViewerBottomBarGroup'),null),c('React').createElement(c('SpotlightViewerBottomBarGroup'),null,o,c('React').createElement(c('SpotlightViewerBottomBarLink'),{s:'true',href:this.props.videoURI},i._("Descargar")))))),this.renderLayers()));}});f.exports=l;}),null);
__d('SpotlightMessagesViewer',['fbt','ActorURI','ArbiterMixin','MessagingForwardingButtonNUX.react','PageTransitionsRegistrar','React','ReactFragment','SpotlightViewer','SpotlightViewerAutoResize','SpotlightViewerBehaviorsMixin','SpotlightViewerBottomBar','SpotlightViewerBottomBarGroup','SpotlightViewerBottomBarLink','SpotlightViewerClose','SpotlightViewerCoreMixin','SpotlightViewerDimensionMixin','SpotlightViewerPagers','SpotlightViewerPageWithKeys','SpotlightViewerThumbnailMixin','SpotlightViewport','SubscriptionsHandler','XMessagingPhotoDownloadController'],(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').createClass({displayName:'SpotlightMessagesViewer',mixins:[c('ArbiterMixin'),c('SpotlightViewerBehaviorsMixin'),c('SpotlightViewerCoreMixin'),c('SpotlightViewerThumbnailMixin'),c('SpotlightViewerDimensionMixin')],behaviors:[c('SpotlightViewerPageWithKeys'),c('SpotlightViewerAutoResize')],componentWillUnmount:function j(){this._subscriptions&&this._subscriptions.release();this._subscriptions=null;},getViewerID:function j(){return this.props.setid;},getInitialState:function j(){this._subscriptions=new (c('SubscriptionsHandler'))();return {photoData:this._getInitialPhotoData(),open:true,showForward:false};},_enableSubscriptions:function j(){this.props.useloadingindicator&&this._subscriptions.addSubscriptions(this.viewState.subscribe('photo_fetch',function(){return this.setState({photoData:null});}.bind(this)));},_showForwardDialog:function j(){this.setState({showForward:true});this.refs.forwardNUX.close();},_hideForwardDialog:function j(){this.setState({showForward:false});},renderLayers:function j(){if(this.props.disableForward)return null;var k=h._("Reenviar en mensaje separados"),l=this.props.forwardDialogComponent;return c('ReactFragment').create({forwardDialog:c('React').createElement(l,{attachmentID:String(this.state.photoData.id),onClose:this._hideForwardDialog,shown:this.state.showForward,title:k}),forwardButtonNUX:c('React').createElement(c('MessagingForwardingButtonNUX.react'),{contextRef:function(){return this.refs.forwardButton;}.bind(this),ref:'forwardNUX'},h._("Env\u00eda esta imagen a otras personas en mensajes separados."))});},render:function j(){var k=this.getMedia(),l=this.props.snapToPhoto?this.getImageDimensions():this.getStageDimensions();l.x=Math.max(l.x,185);l.y=Math.max(l.y,185);var m=this.props.useloadingindicator&&!this.state.photoData;c('PageTransitionsRegistrar').registerCompletionCallback(function(){if(this.state.open)this.close();return true;}.bind(this));return (c('React').createElement('span',null,c('React').createElement(c('SpotlightViewer'),{rootClassName:this.props.rootClassName,open:this.state.open,onHide:this.close},c('React').createElement(c('SpotlightViewport'),{active:false,onClick:this._onClickViewport,stageDimensions:l,media:k,showLoadingIndicator:m,useWidth:true},c('React').createElement(c('SpotlightViewerClose'),{onClick:this.close}),this.props.disablepaging?null:c('React').createElement(c('SpotlightViewerPagers'),null),this._renderBottomBar())),this.renderLayers()));},_renderBottomBar:function j(){var k;if(!this.props.disableForward)k=c('React').createElement(c('SpotlightViewerBottomBarLink'),{onClick:this._showForwardDialog,ref:'forwardButton'},h._("Reenviar"));var l=c('XMessagingPhotoDownloadController').getURIBuilder().setString('photo_id',String(this.state.photoData.id)).getURI();if(this.props.actorid)l=c('ActorURI').create(l,this.props.actorid);return (c('React').createElement(c('SpotlightViewerBottomBar'),null,c('React').createElement(c('SpotlightViewerBottomBarGroup'),null),c('React').createElement(c('SpotlightViewerBottomBarGroup'),null,k,c('React').createElement(c('SpotlightViewerBottomBarLink'),{rel:'async',ajaxify:l},h._("Descargar")))));}});f.exports=i;}),null);