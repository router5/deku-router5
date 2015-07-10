define(['exports', './link-factory', './segment-decorator-factory', './router-plugin'], function (exports, _linkFactory, _segmentDecoratorFactory, _routerPlugin) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _linkFactory2 = _interopRequireDefault(_linkFactory);

  var _segmentDecoratorFactory2 = _interopRequireDefault(_segmentDecoratorFactory);

  var _routerPlugin2 = _interopRequireDefault(_routerPlugin);

  exports.routerPlugin = _routerPlugin2['default'];
  exports.linkFactory = _linkFactory2['default'];
  exports.segmentDecoratorFactory = _segmentDecoratorFactory2['default'];
});