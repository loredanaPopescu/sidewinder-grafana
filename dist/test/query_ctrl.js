'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericDatasourceQueryCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sdk = require('app/plugins/sdk');

require('./css/query-editor.css!');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericDatasourceQueryCtrl = exports.GenericDatasourceQueryCtrl = function (_QueryCtrl) {
  _inherits(GenericDatasourceQueryCtrl, _QueryCtrl);

  function GenericDatasourceQueryCtrl($scope, $injector) {
    _classCallCheck(this, GenericDatasourceQueryCtrl);

    var _this = _possibleConstructorReturn(this, (GenericDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(GenericDatasourceQueryCtrl)).call(this, $scope, $injector));

    _this.scope = $scope;
    _this.target.target = _this.target.target;
    _this.target.type = 'timeserie';
    if (!_this.target.raw) {
      _this.target.raw = '';
    }
    if (!_this.target.filters) {
      _this.target.filters = [];
    }
    if (!_this.target.aggregator) {
      _this.target.aggregator = { name: "none", args: [{ index: 0, type: "int", value: 1000 }], unit: "secs" };
    }
    console.log(_this.target);
    return _this;
  }

  _createClass(GenericDatasourceQueryCtrl, [{
    key: 'toggleEditorMode',
    value: function toggleEditorMode() {
      this.target.rawQuery = !this.target.rawQuery;
    }
  }, {
    key: 'onChangeInternal',
    value: function onChangeInternal() {
      this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.datasource.metricFindQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getTagOptions',
    value: function getTagOptions() {
      var res = this.datasource.tagFindQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
      return res;
    }
  }, {
    key: 'getConditionOptions',
    value: function getConditionOptions() {
      return this.datasource.conditionTypes(this.target).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getFieldOptions',
    value: function getFieldOptions() {
      return this.datasource.fieldOptionsQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getAggregators',
    value: function getAggregators() {
      return this.datasource.getAggregators(this.target).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getUnits',
    value: function getUnits() {
      return this.datasource.getUnits(this.target).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getAggregators',
    value: function getAggregators() {
      this.target.aggregator = {};
    }
  }, {
    key: 'addFilter',
    value: function addFilter() {
      if (this.target.filters.length > 0) {
        this.target.filters.push({ 'type': 'condition', 'value': 'AND' });
      }
      this.target.filters.push({});
      this.panelCtrl.refresh();
    }
  }, {
    key: 'addArgs',
    value: function addArgs() {
      if (this.target.aggregators.name && !this.target.aggregators.args) {
        this.target.aggregators.args = [];
      }
      this.target.aggregators.args.push({});
      this.panelCtrl.refresh();
    }
  }, {
    key: 'removeFilter',
    value: function removeFilter(index, segment) {
      this.target.filters.splice(index, 1);
      if (index > 1 || index == 0 && this.target.filters.length > 0) {
        this.target.filters.splice(index, 1);
      }
      if (index >= this.target.filters.length) {
        this.target.filters.splice(this.target.filters.length - 1, 1);
      }
      this.panelCtrl.refresh();
    }
  }, {
    key: 'onChangeFilter',
    value: function onChangeFilter(index, segment) {
      this.target.filters[index] = segment;
      this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }
  }]);

  return GenericDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

GenericDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
//# sourceMappingURL=query_ctrl.js.map
