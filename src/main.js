import $ from "jquery";

import './style.less';

$.fn.bullet = function (options) {
  options = $.extend({
    content: '',        // 内容文字
    avatar: '',         // 头像图片 URL (可选)
    url: '',            // 链接 (可选)
    color: '',          // 字体颜色 (可选)
    bgColor: '',        // 背景颜色 (可选)
    speed: 20,          // 动画时间(秒)
    top: 0,             // 距离顶部位置(默认随机)
    safeTop: 0,         // 顶部安全距离(范围内不显示)
    safeBottom: 0,      // 底部安全距离(范围内不显示)
    hasClose: true,     // 开启关闭按钮
    escapeContent: true // 内容HTML转义(默认开启)
  }, options);

  const containerEl = $(this);
  const containerWidth = containerEl.width();
  const containerHeight = containerEl.height();

  const availableWidth = window.innerWidth > containerWidth ? containerWidth : window.innerWidth;
  const availableHeight = window.innerHeight > containerHeight ? containerHeight : window.innerHeight;

  // check position
  if (containerEl.css('position') === 'static') {
    containerEl.css('position', 'relative');
  }

  // wrapper
  const bulletId = 'bullet-' + Math.random().toString(36).substr(2, 6);
  let bulletWrapperEl = null;
  let _needRemoveBulletWrapperEl = $('.bullet-wrapper[data-remove="true"]:eq(0)');
  if (_needRemoveBulletWrapperEl && _needRemoveBulletWrapperEl.length > 0) {
    _needRemoveBulletWrapperEl.removeAttr('data-remove');
    _needRemoveBulletWrapperEl.removeAttr('style');
    bulletWrapperEl = _needRemoveBulletWrapperEl;
  } else {
    bulletWrapperEl = $('<div class="bullet-wrapper" id="' + bulletId + '"></div>').appendTo(containerEl);
  }

  // inner
  const bulletInnerEl = $('<div class="bullet-inner"></div>');
  bulletWrapperEl.append(bulletInnerEl);

  let bulletInnerHTML = '';

  // avatar
  if (options.avatar) {
    bulletInnerHTML += '<div class="bullet-avatar"><img src="' + options.avatar + '" alt="avatar"></div>';
  }

  // content
  var bulletContent = !!options.escapeContent ? $('<div />').text(options.content).html() : options.content;
  bulletInnerHTML += '<div class="bullet-text">';
  bulletInnerHTML += options.url ? '<a href="' + options.url + '" target="_blank" >' + bulletContent + '</a>' : bulletContent;
  bulletInnerHTML += '</div>';

  // has close
  if (options.hasClose) {
    bulletWrapperEl.addClass('has-close');
    bulletInnerHTML += '<div class="bullet-close"></div>';
  }

  // render
  bulletInnerEl.html(bulletInnerHTML);
  if (options.color) {
    bulletInnerEl.css('color', options.color);
  }
  if (options.bgColor) {
    bulletInnerEl.css('background-color', options.bgColor);
  }

  // set top
  const bulletHeight = bulletWrapperEl.height();
  const maxTop = availableHeight - bulletHeight - options.safeBottom;
  const minTop = options.safeTop;
  const offsetTop = options.top || Math.floor(Math.random() * (maxTop - minTop) + minTop);
  bulletWrapperEl.css('top', offsetTop + "px");

  // insert keyframes
  const bulletStyle = document.createElement('style');
  document.head.appendChild(bulletStyle);
  const keyframesFrom = 'from { transform: translate3d(' + availableWidth + 'px, 0, 0); }';
  const keyframesTo = 'to { transform: translate3d(-100%, 0, 0); }';
  bulletStyle.sheet.insertRule('@keyframes right-to-left { ' + keyframesFrom + keyframesTo + ' }', 0);

  // set animation
  bulletWrapperEl.css('visibility', 'visible');
  bulletWrapperEl.css('animation-iteration-count', 1);
  bulletWrapperEl.css('animation-delay', 0);
  bulletWrapperEl.css('animation-direction', 'normal');
  bulletWrapperEl.css('animation-timing-function', 'linear');
  bulletWrapperEl.css('will-change', 'transform'); // optimize performance
  bulletWrapperEl.css('animation-name', 'right-to-left');
  bulletWrapperEl.css('animation-duration', options.speed + 's');

  // start animation
  bulletWrapperEl.css('animation-play-state', 'running');

  const removeBulletWrapperEl = function () {
    bulletWrapperEl.html('');
    bulletWrapperEl.attr('data-remove', true);
    bulletWrapperEl.css('opacity', '0');
    bulletWrapperEl.css('visibility', 'hidden');
  };

  // listen animationend
  bulletWrapperEl.on('animationend', removeBulletWrapperEl);

  // handle click close
  bulletWrapperEl.on('click', '.bullet-close', removeBulletWrapperEl);
};

$.fn.bullet.clear = function () {
  $('.bullet-wrapper').remove();
};
