import {QueryCtrl} from 'app/plugins/sdk';
import './css/query-editor.css!'

export class GenericDatasourceQueryCtrl extends QueryCtrl {

  constructor($scope, $injector)  {
    super($scope, $injector);

    this.scope = $scope;
    this.target.target = this.target.target;
    this.target.type = 'timeserie';
    if(!this.target.raw) {
      this.target.raw = '';
    }
    if(!this.target.filters) {
      this.target.filters = [];
    }
    if(!this.target.aggregator) {
      this.target.aggregator = { name:"none", args:[{ index:0, type: "int", value: 1000 }], unit: "secs" };
    }
    console.log(this.target);
  }

  toggleEditorMode() {
    this.target.rawQuery = !this.target.rawQuery;
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  getOptions() {
    return this.datasource.metricFindQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
  }

  getTagOptions() {
   var res = this.datasource.tagFindQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
   return res;
  }

  getConditionOptions() {
    return this.datasource.conditionTypes(this.target).then(this.uiSegmentSrv.transformToSegments(false));
  }

  getFieldOptions() {
   return this.datasource.fieldOptionsQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
  }

  getAggregators() {
    return this.datasource.getAggregators(this.target).then(this.uiSegmentSrv.transformToSegments(false));
  }

  getUnits() {
    return this.datasource.getUnits(this.target).then(this.uiSegmentSrv.transformToSegments(false));
  }

  getAggregators() {
    this.target.aggregator = {};
  }

  addFilter() {
    if(this.target.filters.length>0) {
      this.target.filters.push({'type':'condition', 'value':'AND'});
    }
    this.target.filters.push({});
    this.panelCtrl.refresh();
  }

  addArgs() {
    if(this.target.aggregators.name && !this.target.aggregators.args) {
      this.target.aggregators.args = [];
    }
    this.target.aggregators.args.push({});
    this.panelCtrl.refresh();
  }

  removeFilter(index, segment) {
    this.target.filters.splice(index, 1)
    if(index>1 || (index==0 && this.target.filters.length>0)) {
      this.target.filters.splice(index, 1);
    }
    if(index>=this.target.filters.length) {
      this.target.filters.splice(this.target.filters.length-1, 1);
    }
    this.panelCtrl.refresh();
  }

  onChangeFilter(index, segment) {
    this.target.filters[index] = segment;
      this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}

GenericDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
