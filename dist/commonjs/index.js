'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _linkFactory = require('./link-factory');

var _linkFactory2 = _interopRequireDefault(_linkFactory);

var _segmentDecoratorFactory = require('./segment-decorator-factory');

var _segmentDecoratorFactory2 = _interopRequireDefault(_segmentDecoratorFactory);

var _routerPlugin = require('./router-plugin');

var _routerPlugin2 = _interopRequireDefault(_routerPlugin);

exports.routerPlugin = _routerPlugin2['default'];
exports.linkFactory = _linkFactory2['default'];
exports.segmentDecoratorFactory = _segmentDecoratorFactory2['default'];