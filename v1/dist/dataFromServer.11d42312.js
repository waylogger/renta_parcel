// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"static/state/dataFromServer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataFromServer = void 0;

var _month;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file dataFromServer.js
 * @module clietn/state/dataFromServer.js
*/

/**
 * @constant
*/
var month = (_month = {}, _defineProperty(_month, 1, 'Январь'), _defineProperty(_month, 2, 'Февраль'), _defineProperty(_month, 3, 'Март'), _defineProperty(_month, 4, 'Апрель'), _defineProperty(_month, 5, 'Май'), _defineProperty(_month, 6, 'Июнь'), _defineProperty(_month, 7, 'Июль'), _defineProperty(_month, 8, 'Август'), _defineProperty(_month, 9, 'Сентябрь'), _defineProperty(_month, 10, 'Октябрь'), _defineProperty(_month, 11, 'Ноябрь'), _defineProperty(_month, 12, 'Декабрь'), _month);
/**
 * @function
 * @param {string} monthStr
 * @returns {number}
*/

function translateMonth(monthStr) {
  return Object.keys(month).filter(function (item) {
    return month[item] === monthStr;
  })[0];
}
/**
 * @constant
 * @property {Array} placeToReceiveOrReturnCar=[]
*/


var dataFromServer = {
  placesToReceiveOrReturnCar: [],
  //fill by components/placeSelector.js
  carList: [],
  tariffsList: [],
  currentCar: '',
  carToBid: '',
  beginFetchPeriod: "".concat(new Date().getFullYear(), "-01-01 00:00"),
  endFetchPeriod: "".concat(new Date().getFullYear(), "-12-31 00:00"),
  freePeriods: [],
  operationCars: [],
  clickedCars: [],

  /**
   * @property {function} getPlaceId
   * @returns {number} 
   * @description фильтруем placeToReceiveOrReturnCar по полученному аргументу, возвращаем Id найденной записи
  */
  getPlaceId: function getPlaceId(place) {
    if (!place) return undefined;
    place = place.split(' + ');

    if (place.length != 2) {
      return dataFromServer.placesToReceiveOrReturnCar[0].place_id;
    }

    place = place[0];
    var id = dataFromServer.placesToReceiveOrReturnCar.filter(function (a) {
      return a.title === place;
    })[0].place_id;
    return id;
  },

  /**
   * @function
   * @returns {number} id of place with free delivery cost
  */
  getFreePlace: function getFreePlace() {
    var freePlace = dataFromServer.placesToReceiveOrReturnCar.filter(function (item) {
      return item.delivery_cost === 0;
    })[0];
    return freePlace.place_id;
  },
  getDeliveryCost: function getDeliveryCost(id) {
    var place = dataFromServer.placesToReceiveOrReturnCar.filter(function (a) {
      return a.place_id === id;
    })[0];
    return place ? place.delivery_cost : 0;
  },

  /**
   * @function
   * @param {string} carStr
   * @example
   * hyundai_creta -> id
  */

  /**
   * @function
   * @param {string} carHashStr
   * @returns carObject
  */
  getCurrentCar: function getCurrentCar() {
    var carHashStr = location.hash.slice(1, location.hash.length);
    var car = dataFromServer.carList.filter(function (item) {
      item = item.model.toString();
      item = item.replace(/\([^\s]+\)/, '');
      item = item.trim();
      item = item.replace(/\s/g, '_');
      item = item.toLocaleLowerCase();
      return item === carHashStr;
    });
    dataFromServer.currentCar = car;
    return car;
  },

  /**
   * @function
   * @param {number} carId
   * @returns {object} tarrrifs for it car
  */
  getTarrifs: function getTarrifs() {},

  /**
   * @constant
  */
  dataSent: false,

  /**
   * @function
  */
  currentMonth: function currentMonth() {
    var a = $("#dp-cal-month-text").text();
    return translateMonth(a);
  },

  /**
   * @function
   * @returns {Array}
  */
  currentMonths: function currentMonths() {
    var m = dataFromServer.currentMonth();
    var prevMonth = m - 1 === 0 ? 12 : m - 1;
    var lastMonth = m + 1 === 13 ? 1 : m + 1;
    return [prevMonth, m, lastMonth];
  },

  /**
   * @function
  */
  currentDay: function currentDay() {
    var d = $(".dp-current").text();
    if (d) return parseInt(d, 10);
    return;
  },

  /**
   * @function
   * @returns {Array} of days
  */
  currentDays: function currentDays() {
    var days = $(".dp-day").toArray();
    days = days.map(function (item, inx) {
      return item.id;
    });
    return days;
  },

  /**
   * @function
  */
  currentYear: function currentYear() {
    var y = $('.dp-cal-year').text();
    if (y) return parseInt(y, 10);
    return;
  },

  /**
   * @function
  */
  currentYears: function currentYears() {
    var y = dataFromServer.currentYear();
    return [y - 1, y, y + 1];
  },

  /**
   * @function
   * @param {String} dayId
   * @return {Boolean}
  */
  needToDisable: function needToDisable(dayId) {
    var dt = new Date();
    var year = dt.getFullYear();
    if (!dataFromServer.currentYear()) return undefined;
    if (year > dataFromServer.currentYear()) return true;
    return false;
  }
};
exports.dataFromServer = dataFromServer;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43117" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","static/state/dataFromServer.js"], null)
//# sourceMappingURL=/dataFromServer.11d42312.js.map