var dmap = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  // BaseLayer.js
  // Define BaseLayer class and basic methods here.
  // @class BaseLayer
  // Base class of all dmap.layer.
  var BaseLayer =
  /*#__PURE__*/
  function () {
    function BaseLayer(options) {
      _classCallCheck(this, BaseLayer);

      if ((this instanceof BaseLayer ? this.constructor : void 0) === BaseLayer) {
        throw new Error('Class BaseLayer cannot be initialized.');
      }

      this._data = []; // {}

      this._layer_group = undefined;
      this.setOption(options);
    } // @method on
    // @parameter event_type: event
    // @parameter callback: function
    // 
    // Bind callback function to every element.


    _createClass(BaseLayer, [{
      key: "on",
      value: function on(event_type, callback) {
        var _this = this;

        if (this._layer_group !== undefined) {
          (function () {
            var layers = _this._layer_group.getLayers();

            var _loop = function _loop(i) {
              layers[i].on(event_type, function () {
                callback(this._data[i], i, layers[i]);
              }, _this); //bind
            };

            for (var i = 0; i < layers.length; ++i) {
              _loop(i);
            }
          })();
        }

        return this;
      } // @method setOption
      // @parameter options: object
      // 
      // Set layer option.

    }, {
      key: "setOption",
      value: function setOption(options) {
        // TODO
        return this;
      } // @method setElementOption
      // @parameter data: Array
      // @parameter fn: function(d, i, a)
      // 
      // Set options of each element by data and mapping-function fn.
      // 
      // e.g:
      // '''
      // var pl = new dmap.PolygonLayer();
      // ...
      // pl.setElementOption(['black', 'aqua'], function(d, i){return {color: d};}).enter();
      // pl.addTo(map);
      // '''
      // 

    }, {
      key: "setElementOption",
      value: function setElementOption(data, fn) {
        var array_options = data.map(fn),
            i = 0;

        for (i = 0; i < this._data.length; ++i) {
          this._data[i].options = this._data[i].options || {};

          if (i < data.length) {
            Object.assign(this._data[i].options, array_options[i]);
          }
        }

        return this;
      } // @method data
      // @parameter data: Array
      // @parameter fn: function(d, i, a)
      // 
      // Set this._data by data and mapping-function fn.

    }, {
      key: "data",
      value: function data(_data, fn) {
        this._data = _data.map(fn);
        return this;
      } // @method addTo
      // @parameter leaflet_map: L.map
      // 
      // Add all elements in this layer to L.map.

    }, {
      key: "addTo",
      value: function addTo(leaflet_map) {
        //this._map = leaflet_map; // for ODLayer update
        this._layer_group.addTo(leaflet_map);

        return this;
      } // @method enter
      // 
      // Update this._layer_group.

    }, {
      key: "enter",
      value: function enter() {
        if (this._layer_group !== undefined) {
          this.remove();
        } // maybe delete this._layer_group ? 


        this._layer_group = L.layerGroup(this.generate() // rename would fit well
        );
        return this;
      } // @method exit
      // 
      // Quit binding this layer on the L.map.

    }, {
      key: "exit",
      value: function exit() {
        this.remove();
        return this;
      } // @method generate
      // 注意 BaseLayer 的 generate() 方法不应调用，enter() 中应该调用对应子类的方法。

    }, {
      key: "generate",
      value: function generate() {
        return [];
      } // @method remove
      // 
      // Remove all elements from L.map.

    }, {
      key: "remove",
      value: function remove() {
        if (this._layer_group !== undefined) {
          this._layer_group.remove();
        }

        return this; // return what??
      }
    }]);

    return BaseLayer;
  }();

  var PointLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PointLayer, _BaseLayer);

    function PointLayer(options) {
      _classCallCheck(this, PointLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PointLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.circle.


    _createClass(PointLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.circleMarker(data.coordination, data.options);
        });
      }
    }]);

    return PointLayer;
  }(BaseLayer);

  var PolygonLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PolygonLayer, _BaseLayer);

    function PolygonLayer(options) {
      _classCallCheck(this, PolygonLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PolygonLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.polygon


    _createClass(PolygonLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.polygon(data.coordinations, data.options);
        });
      }
    }]);

    return PolygonLayer;
  }(BaseLayer);

  var MarkerLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(MarkerLayer, _BaseLayer);

    function MarkerLayer(options) {
      _classCallCheck(this, MarkerLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(MarkerLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.Marker.


    _createClass(MarkerLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.marker(data.coordination, data.options);
        });
      }
    }]);

    return MarkerLayer;
  }(BaseLayer);

  /*
   * @class OD
   * @inherits L.Path
   *
   * A class for drawing OD-trail overlays on a map. Extends `L.Path`.
   *
   * @example
   *
   * ```js
   * // create a red OD-trail(Bezier curve) from an array of LatLng points
   * var trial = dmap.OD([45.51, -122.68], 
   *              [37.77, -122.43], {color: 'red'}).addTo(map);
   * ```
   */
  var OD = L.Path.extend({
    // @section
    // @aka OD options
    options: {
      color: '#4682B4',
      opacity: 0.5,
      weight: '3',
      icon: {
        iconUrl: "plane.png"
      },
      // @option curvature: Number = 4.0
      // How much to simplify the trial on map. More means less curved the 
      // trial is, and less means more curved the trial is.
      // Note that curvature have to be greater than 4.0.
      curvature: 4.0,
      // @option leftSide: Boolean = false.
      // Make the trial on the right side of line from origin to destination. 
      leftSide: false,
      // @option popup: Boolean = false.
      // Bind popup of latlng to the origin and destination points.
      popup: false,
      // @option trailAnimate: Boolean = false.
      // Setup animation of trial by using the icon in options.
      trailAnimate: false
    },
    initialize: function initialize(origin, destination, options) {
      L.setOptions(this, options);
      this._initialUpdate = true;
      this.setPath(L.latLng(origin), L.latLng(destination));
    },
    onAdd: function onAdd(map) {
      this._renderer._initPath(this);

      this._reset(); // _project() + _update()


      this._renderer._addPath(this); // add path on map
      // map.on('click', function(){
      //     this._latlngs.org
      // });

    },
    animateIcon: function animateIcon(path) {
      // make icon move along the trail
      if (this.spaceship_img) this.spaceship_img.remove();
      var SnapSvg = Snap('.leaflet-overlay-pane>svg');
      var spaceship_img = this.spaceship_img = SnapSvg.image(this.options.icon.iconUrl).attr({
        visibility: "hidden"
      });
      var spaceship = SnapSvg.group(spaceship_img);
      var flight_path = SnapSvg.path(path).attr({
        'fill': 'none',
        'stroke': 'none'
      });
      var full_path_length = Snap.path.getTotalLength(flight_path);
      var half_path_length = full_path_length / 2;
      var forth_path_length = full_path_length / 4;

      var width = forth_path_length / this._map.getZoom();

      var height = forth_path_length / this._map.getZoom();

      width = Math.min(Math.max(width, 30), 64);
      height = Math.min(Math.max(height, 30), 64);
      this.on('click', function (e) {
        Snap.animate(0, forth_path_length, function (step) {
          //show image when plane start to animate
          spaceship_img.attr({
            visibility: "visible"
          });
          spaceship_img.attr({
            width: width,
            height: height
          }); //last_step = step;

          var moveToPoint = Snap.path.getPointAtLength(flight_path, step);
          var x = moveToPoint.x - width / 2;
          var y = moveToPoint.y - height / 2;
          spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
        }, 2500, mina.easeout, function () {
          Snap.animate(forth_path_length, half_path_length, function (step) {
            //last_step = step;
            var moveToPoint = Snap.path.getPointAtLength(flight_path, step);
            var x = moveToPoint.x - width / 2;
            var y = moveToPoint.y - height / 2;
            spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
          }, 7000, mina.easein, function () {
            //done
            spaceship_img.attr({
              visibility: "hidden"
            });
          });
        });
      });
    },
    setPointPopup: function setPointPopup() {
      var markerOptins = {
        color: '#00C5CD',
        //Turquoise3
        radius: 2,
        opacity: 0.5
      };
      var orgMarker = L.circleMarker(this._latlngs.org, markerOptins).addTo(this._map).bindPopup(this._latlngs.org.toString());
      orgMarker.on('mouseover', function (e) {
        orgMarker.openPopup();
      });
      orgMarker.on('mouseout', function (e) {
        orgMarker.closePopup();
      });
      var dstMarker = L.circleMarker(this._latlngs.dst, markerOptins).addTo(this._map).bindPopup(this._latlngs.dst.toString());
      dstMarker.on('mouseover', function (e) {
        dstMarker.openPopup();
      });
      dstMarker.on('mouseout', function (e) {
        dstMarker.closePopup();
      });
    },
    getPath: function getPath() {
      return this._latlngs;
    },
    setPath: function setPath(org, dst) {
      var middlePoint = this.getMidPoint(org, dst, this.options.curvature, this.options.leftSide);

      this._setPath(org, dst, middlePoint);

      return this.redraw();
    },
    getBounds: function getBounds() {
      return this._bounds;
    },
    getMidPoint: function getMidPoint(org, dst, deep) {
      var round_side = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'LEFT_ROUND';
      var offset = 3.14;

      if (deep < 3.0) {
        // straighten the trail if deep is less than 3
        deep = 1.0;
      }

      if (round_side === 'RIGHT_ROUND') offset = offset * -1;
      var latlng1 = org,
          latlng2 = dst;
      var offsetX = latlng2.lng - latlng1.lng,
          offsetY = latlng2.lat - latlng1.lat;
      var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
          theta = Math.atan2(offsetY, offsetX);
      var thetaOffset = offset / (deep ? deep : 4);
      var r2 = r / 2 / Math.cos(thetaOffset),
          theta2 = theta + thetaOffset;
      var midpointX = r2 * Math.cos(theta2) + latlng1.lng,
          midpointY = r2 * Math.sin(theta2) + latlng1.lat;
      var midpointLatLng = [midpointY, midpointX];
      return midpointLatLng;
    },
    _setPath: function _setPath(org, dst, mid) {
      this._latlngs = {
        org: org,
        dst: dst,
        mid: mid
      };
      this._bounds = this._computeBounds();
    },
    _computeBounds: function _computeBounds() {
      var bound = new L.LatLngBounds();
      bound.extend(this._latlngs.org);
      bound.extend(this._latlngs.dst);
      bound.extend(this._latlngs.mid);
      return bound;
    },
    getCenter: function getCenter() {
      return this._bounds.getCenter();
    },
    _update: function _update() {
      if (!this._map) {
        return;
      }

      this._updatePath();
    },
    trailHighlight: function trailHighlight() {
      // highlight trail
      var trial = this._path; //get svgpath

      this.on('mouseover', function (e) {
        trial.setAttribute('stroke-dasharray', 1);
        trial.setAttribute('stroke-width', this.options.weight * 1.25);
        trial.setAttribute('stroke-opacity', 1.0);
      });
      this.on('mouseout', function (e) {
        trial.setAttribute('stroke-dasharray', this.options.dashArray);
        trial.setAttribute('stroke-width', this.options.weight);
        trial.setAttribute('stroke-opacity', this.options.opacity);
      });
    },
    _updatePath: function _updatePath() {
      var latlngs = this._renderer._updateTrail(this); //Bind popup of latlng to the points.


      if (this.options.popup) {
        this.setPointPopup();
      }

      this.trailHighlight(); // highlight the trail
      //animated plane after update trail

      if (this.options.trailAnimate) {
        this.animateIcon(latlngs);
      }
    },
    _project: function _project() {
      this._points = [];

      this._points.push('M');

      var curPoint = this._map.latLngToLayerPoint(this._latlngs.org);

      this._points.push(curPoint);

      if (this._latlngs.mid) {
        this._points.push('Q');

        curPoint = this._map.latLngToLayerPoint(this._latlngs.mid);

        this._points.push(curPoint);
      }

      curPoint = this._map.latLngToLayerPoint(this._latlngs.dst);

      this._points.push(curPoint);
    }
  }); // @factory L.od(latlng: origin, latlng: destination, options?: OD options)
  // Instantiates an OD object given two geographical points (i.e. origin point 
  // and destination point) and optionally an options object.

  function od(origin, destination, options) {
    return new OD(origin, destination, options);
  }
  /* @namespace L.SVG
   * @section Layer events
   *
   * @event _updateOD: LayerEvent
   * Fired when there is a need to update the layer on the map.
   *
   *
   * @section Methods for Layers and Controls
   */

  L.SVG.include({
    _updateTrail: function _updateTrail(layer) {
      var svgPath = this._trailPointsToPath(layer._points);

      this._setPath(layer, svgPath);

      if (layer.options.dashHandle) {
        var path = layer._path;
        var length = path.getTotalLength();

        if (!layer.options.dashArray) {
          path.style.strokeDasharray = length + ' ' + length;
        }

        if (layer._initialUpdate) {
          path.animate([{
            strokeDashoffset: length
          }, {
            strokeDashoffset: 0
          }], layer.options.dashHandle);
          layer._initialUpdate = false;
        }
      }

      return svgPath;
    },
    _trailPointsToPath: function _trailPointsToPath(points) {
      var point,
          curCommand,
          str = '';

      for (var i = 0, len = points.length; i < len; i++) {
        point = points[i];

        if (typeof point === 'string' || point instanceof String) {
          curCommand = point;
          str += curCommand;
        } else str += point.x + ',' + point.y + ' ';
      }

      return str || 'M0 0';
    }
  });

  /*
   * @class ODLayer
   * @inherits BaseLayer
   *
   */

  var ODLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(ODLayer, _BaseLayer);

    function ODLayer(options) {
      _classCallCheck(this, ODLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(ODLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.circle.


    _createClass(ODLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return od(data.origin, data.destination, data.options);
        });
      } // trailAnimate() {
      //     var animateLayer = this._layer_group;
      //     var trails = animateLayer.getLayers();
      //     // 点哪个删除哪个，其余的都不变的
      //     //animateLayer.clearLayers();
      //     for(let k = 0, kLen = trails.length; k < kLen; k++){
      //         // show OD coordinations
      //         // show the plane
      //         var path = trails[k].getPath();
      //         var opts = trails[k].getOptions();
      //         var trail = trails[k].on("click", function(e){
      //             opts.icon = {
      //                 iconUrl: "plane.png"
      //             };
      //             animateLayer.removeLayer(trails[k]);
      //             var newTrail = od(path.org, path.dst, opts);
      //             newTrail.addTo(animateLayer);
      //         })
      //     }
      // }

    }]);

    return ODLayer;
  }(BaseLayer);

  var PolylineLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PolylineLayer, _BaseLayer);

    function PolylineLayer(options) {
      _classCallCheck(this, PolylineLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PolylineLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.Marker.


    _createClass(PolylineLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.polyline(data.coordinations, data.options);
        });
      }
    }]);

    return PolylineLayer;
  }(BaseLayer);

  /**
   *  Simple regular cell in a raster
   */
  var Cell =
  /*#__PURE__*/
  function () {
    /**
     * A simple cell with a numerical value
     * @param {L.LatLng} center
     * @param {Number|Vector} value
     * @param {Number} xSize
     * @param {Number} ySize
     */
    function Cell(center, value, xSize) {
      var ySize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : xSize;

      _classCallCheck(this, Cell);

      this.center = center;
      this.value = value;
      this.xSize = xSize;
      this.ySize = ySize;
    }

    _createClass(Cell, [{
      key: "equals",
      value: function equals(anotherCell) {
        return this.center.equals(anotherCell.center) && this._equalValues(this.value, anotherCell.value) && this.xSize === anotherCell.xSize && this.ySize === anotherCell.ySize;
      }
    }, {
      key: "_equalValues",
      value: function _equalValues(value, anotherValue) {
        var type = value.constructor.name;
        var answerFor = {
          Number: value === anotherValue,
          Vector: value.u === anotherValue.u && value.v === anotherValue.v
        };
        return answerFor[type];
      }
      /**
       * Bounds for the cell
       * @returns {LatLngBounds}
       */

    }, {
      key: "getBounds",
      value: function getBounds() {
        var halfX = this.xSize / 2.0;
        var halfY = this.ySize / 2.0;
        var cLat = this.center.lat;
        var cLng = this.center.lng;
        var ul = L.latLng([cLat + halfY, cLng - halfX]);
        var lr = L.latLng([cLat - halfY, cLng + halfX]);
        return L.latLngBounds(L.latLng(lr.lat, ul.lng), L.latLng(ul.lat, lr.lng));
      }
    }]);

    return Cell;
  }();

  /*
    1.0.1 (downloaded from https://github.com/Sumbera/gLayers.Leaflet/releases/tag/v1.0.1)

    Generic  Canvas Layer for leaflet 0.7 and 1.0-rc,
    copyright Stanislav Sumbera,  2016 , sumbera.com , license MIT
    originally created and motivated by L.CanvasOverlay  available here: https://gist.github.com/Sumbera/11114288
  */

  L.CanvasLayer = L.Layer.extend({
    // -- initialized is called on prototype
    initialize: function initialize(options) {
      this._map = null;
      this._canvas = null;
      this._frame = null;
      this._delegate = null;
      L.setOptions(this, options);
    },
    delegate: function delegate(del) {
      this._delegate = del;
      return this;
    },
    needRedraw: function needRedraw() {
      if (!this._frame) {
        this._frame = L.Util.requestAnimFrame(this.drawLayer, this);
      }

      return this;
    },
    //-------------------------------------------------------------
    _onLayerDidResize: function _onLayerDidResize(resizeEvent) {
      this._canvas.width = resizeEvent.newSize.x;
      this._canvas.height = resizeEvent.newSize.y;
    },
    //-------------------------------------------------------------
    _onLayerDidMove: function _onLayerDidMove() {
      var topLeft = this._map.containerPointToLayerPoint([0, 0]);

      L.DomUtil.setPosition(this._canvas, topLeft);
      this.drawLayer();
    },
    //-------------------------------------------------------------
    getEvents: function getEvents() {
      var events = {
        resize: this._onLayerDidResize,
        moveend: this._onLayerDidMove
      };

      if (this._map.options.zoomAnimation && L.Browser.any3d) {
        events.zoomanim = this._animateZoom;
      }

      return events;
    },
    //-------------------------------------------------------------
    onAdd: function onAdd(map) {
      this._map = map;
      this._canvas = L.DomUtil.create('canvas', 'leaflet-layer');
      this.tiles = {};

      var size = this._map.getSize();

      this._canvas.width = size.x;
      this._canvas.height = size.y;
      var animated = this._map.options.zoomAnimation && L.Browser.any3d;
      L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

      map._panes.overlayPane.appendChild(this._canvas);

      map.on(this.getEvents(), this);
      var del = this._delegate || this;
      del.onLayerDidMount && del.onLayerDidMount(); // -- callback

      this.needRedraw();
    },
    //-------------------------------------------------------------
    onRemove: function onRemove(map) {
      var del = this._delegate || this;
      del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback

      map.getPanes().overlayPane.removeChild(this._canvas);
      map.off(this.getEvents(), this);
      this._canvas = null;
    },
    //------------------------------------------------------------
    addTo: function addTo(map) {
      map.addLayer(this);
      return this;
    },
    // --------------------------------------------------------------------------------
    LatLonToMercator: function LatLonToMercator(latlon) {
      return {
        x: latlon.lng * 6378137 * Math.PI / 180,
        y: Math.log(Math.tan((90 + latlon.lat) * Math.PI / 360)) * 6378137
      };
    },
    //------------------------------------------------------------------------------
    drawLayer: function drawLayer() {
      // -- todo make the viewInfo properties  flat objects.
      var size = this._map.getSize();

      var bounds = this._map.getBounds();

      var zoom = this._map.getZoom();

      var center = this.LatLonToMercator(this._map.getCenter());
      var corner = this.LatLonToMercator(this._map.containerPointToLatLng(this._map.getSize()));
      var del = this._delegate || this;
      del.onDrawLayer && del.onDrawLayer({
        layer: this,
        canvas: this._canvas,
        bounds: bounds,
        size: size,
        zoom: zoom,
        center: center,
        corner: corner
      });
      this._frame = null;
    },
    //------------------------------------------------------------------------------
    _animateZoom: function _animateZoom(e) {
      var scale = this._map.getZoomScale(e.zoom);

      var offset = this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), e.zoom, e.center);

      L.DomUtil.setTransform(this._canvas, offset, scale);
    }
  });

  L.canvasLayer = function () {
    return new L.CanvasLayer();
  };
  /**
   * Abstract class for a Field layer on canvas, aka 'a Raster layer'
   * (ScalarField or a VectorField)
   */


  L.CanvasLayer.Field = L.CanvasLayer.extend({
    options: {
      mouseMoveCursor: {
        value: 'pointer',
        noValue: 'default'
      },
      opacity: 1,
      onClick: null,
      onMouseMove: null,
      inFilter: null
    },
    initialize: function initialize(field, options) {
      L.Util.setOptions(this, options);
      this._visible = true;

      if (field) {
        this.setData(field);
      }
    },
    getEvents: function getEvents() {
      var events = L.CanvasLayer.prototype.getEvents.call(this);
      events.zoomstart = this._hideCanvas.bind(this);
      events.zoomend = this._showCanvas.bind(this);
      return events;
    },
    onLayerDidMount: function onLayerDidMount() {
      this._enableIdentify();

      this._ensureCanvasAlignment();
    },
    show: function show() {
      this._visible = true;

      this._showCanvas();

      this._enableIdentify();
    },
    hide: function hide() {
      this._visible = false;

      this._hideCanvas();

      this._disableIdentify();
    },
    isVisible: function isVisible() {
      return this._visible;
    },
    _showCanvas: function _showCanvas() {
      if (this._canvas && this._visible) {
        this._canvas.style.visibility = 'visible';
      }
    },
    _hideCanvas: function _hideCanvas() {
      if (this._canvas) {
        this._canvas.style.visibility = 'hidden';
      }
    },
    _enableIdentify: function _enableIdentify() {
      this._map.on('click', this._onClick, this);

      this._map.on('mousemove', this._onMouseMove, this);

      this.options.onClick && this.on('click', this.options.onClick, this);
      this.options.onMouseMove && this.on('mousemove', this.options.onMouseMove, this);
    },
    _disableIdentify: function _disableIdentify() {
      this._map.off('click', this._onClick, this);

      this._map.off('mousemove', this._onMouseMove, this);

      this.options.onClick && this.off('click', this.options.onClick, this);
      this.options.onMouseMove && this.off('mousemove', this.options.onMouseMove, this);
    },
    _ensureCanvasAlignment: function _ensureCanvasAlignment() {
      var topLeft = this._map.containerPointToLayerPoint([0, 0]);

      L.DomUtil.setPosition(this._canvas, topLeft);
    },
    onLayerWillUnmount: function onLayerWillUnmount() {
      this._disableIdentify();
    },
    needRedraw: function needRedraw() {
      if (this._map && this._field) {
        L.CanvasLayer.prototype.needRedraw.call(this);
      }
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function onDrawLayer(viewInfo) {
      throw new TypeError('Must be overriden');
    },

    /* eslint-enable no-unused-vars */
    setData: function setData(field) {
      this.options.inFilter && field.setFilter(this.options.inFilter);
      this._field = field;
      this.needRedraw();
      this.fire('load');
    },
    setFilter: function setFilter(f) {
      this.options.inFilter = f;
      this._field && this._field.setFilter(f);
      this.needRedraw();
    },
    setOpacity: function setOpacity(opacity) {
      this.options.opacity = opacity;

      if (this._canvas) {
        this._updateOpacity();
      }

      return this;
    },
    getBounds: function getBounds() {
      var bb = this._field.extent();

      var southWest = L.latLng(bb[1], bb[0]),
          northEast = L.latLng(bb[3], bb[2]);
      var bounds = L.latLngBounds(southWest, northEast);
      return bounds;
    },
    _onClick: function _onClick(e) {
      var v = this._queryValue(e);

      this.fire('click', v);
    },
    _onMouseMove: function _onMouseMove(e) {
      var v = this._queryValue(e);

      this._changeCursorOn(v);

      this.fire('mousemove', v);
    },
    _changeCursorOn: function _changeCursorOn(v) {
      if (!this.options.mouseMoveCursor) return;
      var _this$options$mouseMo = this.options.mouseMoveCursor,
          value = _this$options$mouseMo.value,
          noValue = _this$options$mouseMo.noValue;

      var style = this._map.getContainer().style;

      style.cursor = v.value !== null ? value : noValue;
    },
    _updateOpacity: function _updateOpacity() {
      L.DomUtil.setOpacity(this._canvas, this.options.opacity);
    },
    _queryValue: function _queryValue(e) {
      var v = this._field ? this._field.valueAt(e.latlng.lng, e.latlng.lat) : null;
      var result = {
        latlng: e.latlng,
        value: v
      };
      return result;
    },
    _getDrawingContext: function _getDrawingContext() {
      var g = this._canvas.getContext('2d');

      g.clearRect(0, 0, this._canvas.width, this._canvas.height);
      return g;
    }
  });
  /**
   * ScalarField on canvas (a 'Raster')
   */

  var ScalarFieldMap = L.CanvasLayer.Field.extend({
    options: {
      type: 'colormap',
      // [colormap|vector]
      color: null,
      // function colorFor(value) [e.g. chromajs.scale],
      interpolate: false,
      // Change to use interpolation
      vectorSize: 20,
      // only used if 'vector'
      arrowDirection: 'from' // [from|towards]

    },
    initialize: function initialize(scalarField, options) {
      L.CanvasLayer.Field.prototype.initialize.call(this, scalarField, options);
      L.Util.setOptions(this, options);
    },
    _defaultColorScale: function _defaultColorScale() {
      return chroma.scale(['white', 'black']).domain(this._field.range);
    },
    setColor: function setColor(f) {
      this.options.color = f;
      this.needRedraw();
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function onDrawLayer(viewInfo) {
      if (!this.isVisible()) return;

      this._updateOpacity();

      var r = this._getRendererMethod(); //console.time('onDrawLayer');


      r(); //console.timeEnd('onDrawLayer');
    },

    /* eslint-enable no-unused-vars */
    _getRendererMethod: function _getRendererMethod() {
      switch (this.options.type) {
        case 'colormap':
          return this._drawImage.bind(this);

        case 'vector':
          return this._drawArrows.bind(this);

        default:
          throw Error("Unkwown renderer type: ".concat(this.options.type));
      }
    },
    _ensureColor: function _ensureColor() {
      if (this.options.color === null) {
        this.setColor(this._defaultColorScale());
      }
    },
    _showCanvas: function _showCanvas() {
      L.CanvasLayer.Field.prototype._showCanvas.call(this);

      this.needRedraw(); // TODO check spurious redraw (e.g. hide/show without moving map)
    },

    /**
     * Draws the field in an ImageData and applying it with putImageData.
     * Used as a reference: http://geoexamples.com/d3-raster-tools-docs/code_samples/raster-pixels-page.html
     */
    _drawImage: function _drawImage() {
      this._ensureColor();

      var ctx = this._getDrawingContext();

      var width = this._canvas.width;
      var height = this._canvas.height;
      var img = ctx.createImageData(width, height);
      var data = img.data;

      this._prepareImageIn(data, width, height);

      ctx.putImageData(img, 0, 0);
    },

    /**
     * Prepares the image in data, as array with RGBAs
     * [R1, G1, B1, A1, R2, G2, B2, A2...]
     * @private
     * @param {[[Type]]} data   [[Description]]
     * @param {Numver} width
     * @param {Number} height
     */
    _prepareImageIn: function _prepareImageIn(data, width, height) {
      var f = this.options.interpolate ? 'interpolatedValueAt' : 'valueAt';
      var pos = 0;

      for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
          var pointCoords = this._map.containerPointToLatLng([i, j]);

          var lon = pointCoords.lng;
          var lat = pointCoords.lat;

          var v = this._field[f](lon, lat); // 'valueAt' | 'interpolatedValueAt' || TODO check some 'artifacts'


          if (v !== null) {
            var color = this._getColorFor(v);

            var _color$rgba = color.rgba(),
                _color$rgba2 = _slicedToArray(_color$rgba, 4),
                R = _color$rgba2[0],
                G = _color$rgba2[1],
                B = _color$rgba2[2],
                A = _color$rgba2[3];

            data[pos] = R;
            data[pos + 1] = G;
            data[pos + 2] = B;
            data[pos + 3] = parseInt(A * 255); // not percent in alpha but hex 0-255
          }

          pos = pos + 4;
        }
      }
    },

    /**
     * Draws the field as a set of arrows. Direction from 0 to 360 is assumed.
     */
    _drawArrows: function _drawArrows() {
      var bounds = this._pixelBounds();

      var pixelSize = (bounds.max.x - bounds.min.x) / this._field.nCols;
      var stride = Math.max(1, Math.floor(1.2 * this.options.vectorSize / pixelSize));

      var ctx = this._getDrawingContext();

      ctx.strokeStyle = this.options.color;

      var currentBounds = this._map.getBounds();

      for (var y = 0; y < this._field.height; y = y + stride) {
        for (var x = 0; x < this._field.width; x = x + stride) {
          var _this$_field$_lonLatA = this._field._lonLatAtIndexes(x, y),
              _this$_field$_lonLatA2 = _slicedToArray(_this$_field$_lonLatA, 2),
              lon = _this$_field$_lonLatA2[0],
              lat = _this$_field$_lonLatA2[1];

          var v = this._field.valueAt(lon, lat);

          var center = L.latLng(lat, lon);

          if (v !== null && currentBounds.contains(center)) {
            var cell = new Cell(center, v, this.cellXSize, this.cellYSize);

            this._drawArrow(cell, ctx);
          }
        }
      }
    },
    _pixelBounds: function _pixelBounds() {
      var bounds = this.getBounds();

      var northWest = this._map.latLngToContainerPoint(bounds.getNorthWest());

      var southEast = this._map.latLngToContainerPoint(bounds.getSouthEast());

      var pixelBounds = L.bounds(northWest, southEast);
      return pixelBounds;
    },
    _drawArrow: function _drawArrow(cell, ctx) {
      var projected = this._map.latLngToContainerPoint(cell.center); // colormap vs. simple color


      var color = this.options.color;

      if (typeof color === 'function') {
        ctx.strokeStyle = color(cell.value);
      }

      var size = this.options.vectorSize;
      ctx.save();
      ctx.translate(projected.x, projected.y);
      var rotationRads = (90 + cell.value) * Math.PI / 180; // from, by default

      if (this.options.arrowDirection === 'towards') {
        rotationRads = rotationRads + Math.PI;
      }

      ctx.rotate(rotationRads);
      ctx.beginPath();
      ctx.moveTo(-size / 2, 0);
      ctx.lineTo(+size / 2, 0);
      ctx.moveTo(size * 0.25, -size * 0.25);
      ctx.lineTo(+size / 2, 0);
      ctx.lineTo(size * 0.25, size * 0.25);
      ctx.stroke();
      ctx.restore();
    },

    /**
     * Gets a chroma color for a pixel value, according to 'options.color'
     */
    _getColorFor: function _getColorFor(v) {
      var c = this.options.color; // e.g. for a constant 'red'

      if (typeof c === 'function') {
        c = this.options.color(v);
      }

      var color = chroma(c); // to be more flexible, a chroma color object is always created || TODO improve efficiency

      return color;
    }
  });
  var scalarFieldMap = function scalarFieldMap(scalarField, options) {
    return new ScalarFieldMap(scalarField, options);
  };
  /**
   *  Abstract class for a set of values (Vector | Scalar)
   *  assigned to a regular 2D-grid (lon-lat), aka 'a Raster source'
   */

  var Field =
  /*#__PURE__*/
  function () {
    function Field(params) {
      _classCallCheck(this, Field);

      this.params = params;
      this.nCols = params['nCols'];
      this.nRows = params['nRows']; // alias

      this.width = params['nCols'];
      this.height = params['nRows']; // ll = lower-left

      this.xllCorner = params['xllCorner'];
      this.yllCorner = params['yllCorner']; // ur = upper-right

      this.xurCorner = params['xllCorner'] + params['nCols'] * params['cellXSize'];
      this.yurCorner = params['yllCorner'] + params['nRows'] * params['cellYSize'];
      this.cellXSize = params['cellXSize'];
      this.cellYSize = params['cellYSize'];
      this.grid = null; // to be defined by subclasses

      this.isContinuous = this.xurCorner - this.xllCorner >= 360;
      this.longitudeNeedsToBeWrapped = this.xurCorner > 180; // [0, 360] --> [-180, 180]

      this._inFilter = null;
      this._spatialMask = null;
    }
    /**
     * Builds a grid with a value at each point (either Vector or Number)
     * Original params must include the required input values, following
     * x-ascending & y-descending order (same as in ASCIIGrid)
     * @abstract
     * @private
     * @returns {Array.<Array.<Vector|Number>>} - grid[row][column]--> Vector|Number
     */


    _createClass(Field, [{
      key: "_buildGrid",
      value: function _buildGrid() {
        throw new TypeError('Must be overriden');
      }
    }, {
      key: "_updateRange",
      value: function _updateRange() {
        this.range = this._calculateRange();
      }
      /**
       * Number of cells in the grid (rows * cols)
       * @returns {Number}
       */

    }, {
      key: "numCells",
      value: function numCells() {
        return this.nRows * this.nCols;
      }
      /**
       * A list with every cell
       * @returns {Array<Cell>} - cells (x-ascending & y-descending order)
       */

    }, {
      key: "getCells",
      value: function getCells() {
        var stride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var cells = [];

        for (var j = 0; j < this.nRows; j = j + stride) {
          for (var i = 0; i < this.nCols; i = i + stride) {
            var _this$_lonLatAtIndexe = this._lonLatAtIndexes(i, j),
                _this$_lonLatAtIndexe2 = _slicedToArray(_this$_lonLatAtIndexe, 2),
                lon = _this$_lonLatAtIndexe2[0],
                lat = _this$_lonLatAtIndexe2[1];

            var center = L.latLng(lat, lon);

            var value = this._valueAtIndexes(i, j);

            var c = new Cell(center, value, this.cellXSize, this.cellYSize);
            cells.push(c); // <<
          }
        }

        return cells;
      }
      /**
       * Apply a filter function to field values
       * @param   {Function} f - boolean function
       */

    }, {
      key: "setFilter",
      value: function setFilter(f) {
        this._inFilter = f;

        this._updateRange();
      }
      /**
       * Apply a spatial mask to field values
       * @param {L.GeoJSON} m 
       */

    }, {
      key: "setSpatialMask",
      value: function setSpatialMask(m) {
        this._spatialMask = m;
      }
      /**
       * Grid extent
       * @returns {Number[]} [xmin, ymin, xmax, ymax]
       */

    }, {
      key: "extent",
      value: function extent() {
        var _this$_getWrappedLong = this._getWrappedLongitudes(),
            _this$_getWrappedLong2 = _slicedToArray(_this$_getWrappedLong, 2),
            xmin = _this$_getWrappedLong2[0],
            xmax = _this$_getWrappedLong2[1];

        return [xmin, this.yllCorner, xmax, this.yurCorner];
      }
      /**
       * [xmin, xmax] in [-180, 180] range
       */

    }, {
      key: "_getWrappedLongitudes",
      value: function _getWrappedLongitudes() {
        var xmin = this.xllCorner;
        var xmax = this.xurCorner;

        if (this.longitudeNeedsToBeWrapped) {
          if (this.isContinuous) {
            xmin = -180;
            xmax = 180;
          } else {
            // not sure about this (just one particular case, but others...?)
            xmax = this.xurCorner - 360;
            xmin = this.xllCorner - 360;
            /* eslint-disable no-console */
            // console.warn(`are these xmin: ${xmin} & xmax: ${xmax} OK?`);
            // TODO: Better throw an exception on no-controlled situations.

            /* eslint-enable no-console */
          }
        }

        return [xmin, xmax];
      }
      /**
       * Returns whether or not the grid contains the point, considering
       * the spatialMask if it has been previously set
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */

    }, {
      key: "contains",
      value: function contains(lon, lat) {
        if (this._spatialMask) {
          return this._pointInMask(lon, lat);
        }

        return this._pointInExtent(lon, lat);
      }
      /**
       * Checks if coordinates are inside the Extent (considering wrapped longitudes if needed)
       * @param {Number} lon 
       * @param {Number} lat 
       */

    }, {
      key: "_pointInExtent",
      value: function _pointInExtent(lon, lat) {
        var _this$_getWrappedLong3 = this._getWrappedLongitudes(),
            _this$_getWrappedLong4 = _slicedToArray(_this$_getWrappedLong3, 2),
            xmin = _this$_getWrappedLong4[0],
            xmax = _this$_getWrappedLong4[1];

        var longitudeIn = lon >= xmin && lon <= xmax;
        var latitudeIn = lat >= this.yllCorner && lat <= this.yurCorner;
        return longitudeIn && latitudeIn;
      }
      /**
       * Check if coordinates are inside the spatialMask (Point in Polygon analysis)
       * @param {Number} lon 
       * @param {Number} lat 
       */

    }, {
      key: "_pointInMask",
      value: function _pointInMask(lon, lat) {
        var pt = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lon, lat] // geojson, lon-lat order !

          },
          properties: {}
        };
        var poly = this._spatialMask;
        return this._inside(pt, poly);
      }
      /**
       * Check if point is inside the polygon.
       * @param {Object} pt 
       * @param {Object} poly 
       */

    }, {
      key: "_inside",
      value: function _inside(pt, poly) {
        var inside = false;
        var x = pt.geometry.coordinates[1],
            y = pt.geometry.coordinates[0];

        for (var ii = 0; ii < poly.getLatLngs().length; ii++) {
          var polyPoints = poly.getLatLngs()[ii];

          for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i].lat,
                yi = polyPoints[i].lng;
            var xj = polyPoints[j].lat,
                yj = polyPoints[j].lng;
            var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
            if (intersect) inside = !inside;
          }
        }

        return inside;
      }
    }, {
      key: "notContains",

      /**
       * Returns if the grid doesn't contain the point
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */
      value: function notContains(lon, lat) {
        return !this.contains(lon, lat);
      }
      /**
       * Interpolated value at lon-lat coordinates (bilinear method)
       * @param   {Number} longitude
       * @param   {Number} latitude
       * @returns {Vector|Number} [u, v, magnitude]
       *                          
       * Source: https://github.com/cambecc/earth > product.js
       */

    }, {
      key: "interpolatedValueAt",
      value: function interpolatedValueAt(lon, lat) {
        if (this.notContains(lon, lat)) return null;

        var _this$_getDecimalInde = this._getDecimalIndexes(lon, lat),
            _this$_getDecimalInde2 = _slicedToArray(_this$_getDecimalInde, 2),
            i = _this$_getDecimalInde2[0],
            j = _this$_getDecimalInde2[1];

        return this.interpolatedValueAtIndexes(i, j);
      }
      /**
       * Interpolated value at i-j indexes (bilinear method)
       * @param   {Number} i
       * @param   {Number} j
       * @returns {Vector|Number} [u, v, magnitude]
       *
       * Source: https://github.com/cambecc/earth > product.js
       */

    }, {
      key: "interpolatedValueAtIndexes",
      value: function interpolatedValueAtIndexes(i, j) {
        //         1      2           After converting λ and φ to fractional grid indexes i and j, we find the
        //        fi  i   ci          four points 'G' that enclose point (i, j). These points are at the four
        //         | =1.4 |           corners specified by the floor and ceiling of i and j. For example, given
        //      ---G--|---G--- fj 8   i = 1.4 and j = 8.3, the four surrounding grid points are (1, 8), (2, 8),
        //    j ___|_ .   |           (1, 9) and (2, 9).
        //  =8.3   |      |
        //      ---G------G--- cj 9   Note that for wrapped grids, the first column is duplicated as the last
        //         |      |           column, so the index ci can be used without taking a modulo.
        var indexes = this._getFourSurroundingIndexes(i, j);

        var _indexes = _slicedToArray(indexes, 4),
            fi = _indexes[0],
            ci = _indexes[1],
            fj = _indexes[2],
            cj = _indexes[3];

        var values = this._getFourSurroundingValues(fi, ci, fj, cj);

        if (values) {
          var _values = _slicedToArray(values, 4),
              g00 = _values[0],
              g10 = _values[1],
              g01 = _values[2],
              g11 = _values[3];

          return this._doInterpolation(i - fi, j - fj, g00, g10, g01, g11);
        }

        return null;
      }
      /**
       * Get decimal indexes
       * @private
       * @param {Number} lon
       * @param {Number} lat
       * @returns {Array}    [[Description]]
       */

    }, {
      key: "_getDecimalIndexes",
      value: function _getDecimalIndexes(lon, lat) {
        if (this.longitudeNeedsToBeWrapped && lon < this.xllCorner) {
          lon = lon + 360;
        }

        var i = (lon - this.xllCorner) / this.cellXSize;
        var j = (this.yurCorner - lat) / this.cellYSize;
        return [i, j];
      }
      /**
       * Get surrounding indexes (integer), clampling on borders
       * @private
       * @param   {Number} i - decimal index
       * @param   {Number} j - decimal index
       * @returns {Array} [fi, ci, fj, cj]
       */

    }, {
      key: "_getFourSurroundingIndexes",
      value: function _getFourSurroundingIndexes(i, j) {
        var fi = Math.floor(i);
        var ci = fi + 1; // duplicate colum to simplify interpolation logic (wrapped value)

        if (this.isContinuous && ci >= this.nCols) {
          ci = 0;
        }

        ci = this._clampColumnIndex(ci);

        var fj = this._clampRowIndex(Math.floor(j));

        var cj = this._clampRowIndex(fj + 1);

        return [fi, ci, fj, cj];
      }
      /**
       * Get four surrounding values or null if not available,
       * from 4 integer indexes
       * @private
       * @param   {Number} fi
       * @param   {Number} ci
       * @param   {Number} fj
       * @param   {Number} cj
       * @returns {Array} 
       */

    }, {
      key: "_getFourSurroundingValues",
      value: function _getFourSurroundingValues(fi, ci, fj, cj) {
        var row;

        if (row = this.grid[fj]) {
          // upper row ^^
          var g00 = row[fi]; // << left

          var g10 = row[ci]; // right >>

          if (this._isValid(g00) && this._isValid(g10) && (row = this.grid[cj])) {
            // lower row vv
            var g01 = row[fi]; // << left

            var g11 = row[ci]; // right >>

            if (this._isValid(g01) && this._isValid(g11)) {
              return [g00, g10, g01, g11]; // 4 values found!
            }
          }
        }

        return null;
      }
      /**
       * Nearest value at lon-lat coordinates
       * @param   {Number} longitude
       * @param   {Number} latitude
       * @returns {Vector|Number}
       */

    }, {
      key: "valueAt",
      value: function valueAt(lon, lat) {
        if (this.notContains(lon, lat)) return null;

        var _this$_getDecimalInde3 = this._getDecimalIndexes(lon, lat),
            _this$_getDecimalInde4 = _slicedToArray(_this$_getDecimalInde3, 2),
            i = _this$_getDecimalInde4[0],
            j = _this$_getDecimalInde4[1];

        var ii = Math.floor(i);
        var jj = Math.floor(j);

        var ci = this._clampColumnIndex(ii);

        var cj = this._clampRowIndex(jj);

        var value = this._valueAtIndexes(ci, cj);

        if (this._inFilter) {
          if (!this._inFilter(value)) return null;
        }

        return value;
      }
      /**
       * Returns whether or not the field has a value at the point
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */

    }, {
      key: "hasValueAt",
      value: function hasValueAt(lon, lat) {
        var value = this.valueAt(lon, lat);
        var hasValue = value !== null;
        var included = true;

        if (this._inFilter) {
          included = this._inFilter(value);
        }

        return hasValue && included;
      }
      /**
       * Returns if the grid has no value at the point
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */

    }, {
      key: "notHasValueAt",
      value: function notHasValueAt(lon, lat) {
        return !this.hasValueAt(lon, lat);
      }
      /**
       * Gives a random position to 'o' inside the grid
       * @param {Object} [o] - an object (eg. a particle)
       * @returns {{x: Number, y: Number}} - object with x, y (lon, lat)
       */

    }, {
      key: "randomPosition",
      value: function randomPosition() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var i = Math.random() * this.nCols | 0;
        var j = Math.random() * this.nRows | 0;
        o.x = this._longitudeAtX(i);
        o.y = this._latitudeAtY(j);
        return o;
      }
      /**
       * Value for grid indexes
       * @param   {Number} i - column index (integer)
       * @param   {Number} j - row index (integer)
       * @returns {Vector|Number}
       */

    }, {
      key: "_valueAtIndexes",
      value: function _valueAtIndexes(i, j) {
        return this.grid[j][i]; // <-- j,i !!
      }
      /**
       * Lon-Lat for grid indexes
       * @param   {Number} i - column index (integer)
       * @param   {Number} j - row index (integer)
       * @returns {Number[]} [lon, lat]
       */

    }, {
      key: "_lonLatAtIndexes",
      value: function _lonLatAtIndexes(i, j) {
        var lon = this._longitudeAtX(i);

        var lat = this._latitudeAtY(j);

        return [lon, lat];
      }
      /**
       * Longitude for grid-index
       * @param   {Number} i - column index (integer)
       * @returns {Number} longitude at the center of the cell
       */

    }, {
      key: "_longitudeAtX",
      value: function _longitudeAtX(i) {
        var halfXPixel = this.cellXSize / 2.0;
        var lon = this.xllCorner + halfXPixel + i * this.cellXSize;

        if (this.longitudeNeedsToBeWrapped) {
          lon = lon > 180 ? lon - 360 : lon;
        }

        return lon;
      }
      /**
       * Latitude for grid-index
       * @param   {Number} j - row index (integer)
       * @returns {Number} latitude at the center of the cell
       */

    }, {
      key: "_latitudeAtY",
      value: function _latitudeAtY(j) {
        var halfYPixel = this.cellYSize / 2.0;
        return this.yurCorner - halfYPixel - j * this.cellYSize;
      }
      /**
       * Apply the interpolation
       * @abstract
       * @private
       */

      /* eslint-disable no-unused-vars */

    }, {
      key: "_doInterpolation",
      value: function _doInterpolation(x, y, g00, g10, g01, g11) {
        throw new TypeError('Must be overriden');
      }
      /* eslint-disable no-unused-vars */

      /**
       * Check the column index is inside the field,
       * adjusting to min or max when needed
       * @private
       * @param   {Number} ii - index
       * @returns {Number} i - inside the allowed indexes
       */

    }, {
      key: "_clampColumnIndex",
      value: function _clampColumnIndex(ii) {
        var i = ii;

        if (ii < 0) {
          i = 0;
        }

        var maxCol = this.nCols - 1;

        if (ii > maxCol) {
          i = maxCol;
        }

        return i;
      }
      /**
       * Check the row index is inside the field,
       * adjusting to min or max when needed
       * @private
       * @param   {Number} jj index
       * @returns {Number} j - inside the allowed indexes
       */

    }, {
      key: "_clampRowIndex",
      value: function _clampRowIndex(jj) {
        var j = jj;

        if (jj < 0) {
          j = 0;
        }

        var maxRow = this.nRows - 1;

        if (jj > maxRow) {
          j = maxRow;
        }

        return j;
      }
      /**
       * Is valid (not 'null' nor 'undefined')
       * @private
       * @param   {Object} x object
       * @returns {Boolean}
       */

    }, {
      key: "_isValid",
      value: function _isValid(x) {
        return x !== null && x !== undefined;
      }
    }]);

    return Field;
  }();
  /**
   * Scalar Field
   */


  var ScalarField =
  /*#__PURE__*/
  function (_Field) {
    _inherits(ScalarField, _Field);

    _createClass(ScalarField, null, [{
      key: "fromASCIIGrid",

      /**
       * Creates a ScalarField from the content of an ASCIIGrid file
       * @param   {String}   asc
       * @returns {ScalarField}
       */
      value: function fromASCIIGrid(asc) {
        var scaleFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        //console.time('ScalarField from ASC');
        var lines = asc.split('\n'); // Header

        var header = ScalarField._parseASCIIGridHeader(lines.slice(0, 6)); // Data (left-right and top-down)


        var zs = [];

        for (var i = 6; i < lines.length; i++) {
          var line = lines[i].trim();
          if (line === '') break;
          var items = line.split(' ');
          items.forEach(function (it) {
            var floatItem = parseFloat(it);
            var v = floatItem !== header.noDataValue ? floatItem * scaleFactor : null;
            zs.push(v);
          });
        }

        var p = header;
        p.zs = zs; //console.timeEnd('ScalarField from ASC');

        return new ScalarField(p);
      }
      /**
       * Parse an ASCII Grid header, made with 6 lines
       * It allows the use of XLLCORNER/YLLCORNER or XLLCENTER/YLLCENTER conventions
       * @param {Array.String} headerLines
       */

    }, {
      key: "_parseASCIIGridHeader",
      value: function _parseASCIIGridHeader(headerLines) {
        try {
          var headerItems = headerLines.map(function (line) {
            var items = line.split(' ').filter(function (i) {
              return i != '';
            });
            var param = items[0].trim().toUpperCase();
            var value = param === 'CELLSIZE' ? items.slice(1, 3) : parseFloat(items[1].trim());
            return _defineProperty({}, param, value);
          }); // headerItems: [{ncols: xxx}, {nrows: xxx}, ...]

          var usesCorner = 'XLLCORNER' in headerItems[2];
          var cellXSize, cellYSize;

          if (headerItems[4]['CELLSIZE'].length == 2) {
            cellXSize = parseFloat(headerItems[4]['CELLSIZE'][0].trim());
            cellYSize = parseFloat(headerItems[4]['CELLSIZE'][1].trim());
          } else {
            cellXSize = cellYSize = parseFloat(headerItems[4]['CELLSIZE'][0].trim());
          } // const cellSize = headerItems[4]['CELLSIZE'];


          var header = {
            nCols: parseInt(headerItems[0]['NCOLS']),
            nRows: parseInt(headerItems[1]['NROWS']),
            xllCorner: usesCorner ? headerItems[2]['XLLCORNER'] : headerItems[2]['XLLCENTER'] - cellXSize,
            yllCorner: usesCorner ? headerItems[3]['YLLCORNER'] : headerItems[3]['YLLCENTER'] - cellYSize,
            cellXSize: cellXSize,
            cellYSize: cellYSize,
            noDataValue: headerItems[5]['NODATA_VALUE']
          };
          return header;
        } catch (err) {
          throw new Error("Not a valid ASCIIGrid Header: ".concat(err));
        }
      }
      /**
       * Creates a ScalarField from the content of a GeoTIFF file
       * @param   {ArrayBuffer}   data
       * @param   {Number}   bandIndex
       * @returns {ScalarField}
       */

    }, {
      key: "fromGeoTIFF",
      value: function fromGeoTIFF(data) {
        var bandIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return ScalarField.multipleFromGeoTIFF(data, [bandIndex])[0];
      }
      /**
       * Creates a ScalarField array (one per band) from the content of a GeoTIFF file
       * @param   {ArrayBuffer}   data
       * @param   {Array}   bandIndexes - if not provided all bands are returned
       * @returns {Array.<ScalarField>}
       */

    }, {
      key: "multipleFromGeoTIFF",
      value: function multipleFromGeoTIFF(data, bandIndexes) {
        //console.time('ScalarField from GeoTIFF');
        var tiff = GeoTIFF.parse(data); // geotiff.js

        var image = tiff.getImage();
        var rasters = image.readRasters();
        var tiepoint = image.getTiePoints()[0];
        var fileDirectory = image.getFileDirectory();

        var _fileDirectory$ModelP = _slicedToArray(fileDirectory.ModelPixelScale, 2),
            xScale = _fileDirectory$ModelP[0],
            yScale = _fileDirectory$ModelP[1];

        if (typeof bandIndexes === 'undefined' || bandIndexes.length === 0) {
          bandIndexes = _toConsumableArray(Array(rasters.length).keys());
        }

        var scalarFields = [];
        scalarFields = bandIndexes.map(function (bandIndex) {
          var zs = rasters[bandIndex]; // left-right and top-down order

          if (fileDirectory.GDAL_NODATA) {
            var noData = parseFloat(fileDirectory.GDAL_NODATA); // console.log(noData);

            var simpleZS = Array.from(zs); // to simple array, so null is allowed | TODO efficiency??

            zs = simpleZS.map(function (z) {
              return z === noData ? null : z;
            });
          }

          var p = {
            nCols: image.getWidth(),
            nRows: image.getHeight(),
            xllCorner: tiepoint.x,
            yllCorner: tiepoint.y - image.getHeight() * yScale,
            cellXSize: xScale,
            cellYSize: yScale,
            zs: zs
          };
          return new ScalarField(p);
        }); //console.timeEnd('ScalarField from GeoTIFF');

        return scalarFields;
      }
    }]);

    function ScalarField(params) {
      var _this;

      _classCallCheck(this, ScalarField);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ScalarField).call(this, params));
      _this.zs = params['zs'];
      _this.grid = _this._buildGrid();

      _this._updateRange(); //console.log(`ScalarField created (${this.nCols} x ${this.nRows})`);


      return _this;
    }
    /**
     * Builds a grid with a Number at each point, from an array
     * 'zs' following x-ascending & y-descending order
     * (same as in ASCIIGrid)
     * @private
     * @returns {Array.<Array.<Number>>} - grid[row][column]--> Number
     */


    _createClass(ScalarField, [{
      key: "_buildGrid",
      value: function _buildGrid() {
        var grid = this._arrayTo2d(this.zs, this.nRows, this.nCols);

        return grid;
      }
    }, {
      key: "_arrayTo2d",
      value: function _arrayTo2d(array, nRows, nCols) {
        var grid = [];
        var p = 0;

        for (var j = 0; j < nRows; j++) {
          var row = [];

          for (var i = 0; i < nCols; i++, p++) {
            var z = array[p];
            row[i] = this._isValid(z) ? z : null; // <<<
          }

          grid[j] = row;
        }

        return grid;
      }
    }, {
      key: "_newDataArrays",
      value: function _newDataArrays(params) {
        params['zs'] = [];
      }
    }, {
      key: "_pushValueToArrays",
      value: function _pushValueToArrays(params, value) {
        params['zs'].push(value);
      }
    }, {
      key: "_makeNewFrom",
      value: function _makeNewFrom(params) {
        return new ScalarField(params);
      }
      /**
       * Calculate min & max values
       * @private
       * @returns {Array} - [min, max]
       */

    }, {
      key: "_calculateRange",
      value: function _calculateRange() {
        var data = this.zs;

        if (this._inFilter) {
          data = data.filter(this._inFilter);
        }

        return [d3.min(data), d3.max(data)];
      }
      /**
       * Bilinear interpolation for Number
       * https://en.wikipedia.org/wiki/Bilinear_interpolation
       * @param   {Number} x
       * @param   {Number} y
       * @param   {Number} g00
       * @param   {Number} g10
       * @param   {Number} g01
       * @param   {Number} g11
       * @returns {Number}
       */

    }, {
      key: "_doInterpolation",
      value: function _doInterpolation(x, y, g00, g10, g01, g11) {
        var rx = 1 - x;
        var ry = 1 - y;
        return g00 * rx * ry + g10 * x * ry + g01 * rx * y + g11 * x * y;
      }
    }]);

    return ScalarField;
  }(Field);

  // import * as BaseLayer from "./layers/index.js";

  exports.PointLayer = PointLayer;
  exports.PolygonLayer = PolygonLayer;
  exports.MarkerLayer = MarkerLayer;
  exports.ODLayer = ODLayer;
  exports.PolylineLayer = PolylineLayer;
  exports.ScalarFieldMap = ScalarFieldMap;
  exports.scalarFieldMap = scalarFieldMap;
  exports.ScalarField = ScalarField;
  exports.BaseLayer = BaseLayer;
  exports.OD = OD;
  exports.od = od;

  return exports;

}({}));
