(function() {
  var local_window;
  local_window = this;
  return this.barcodelib = {
    BarCodeDrawer: (function() {
      function _Class(params) {
        if (params.createCanvas != null) {
          this.canvas = params.createCanvas();
        } else {
          this.canvas = local_window.document.createElement('canvas');
        }
        this.default_params = params;
      }

      _Class.prototype.prepare = function() {
        this.white = this.default_params.background != null ? this.default_params.background : this.white != null ? this.white : '#ffffff';
        this.black = this.default_params.foreground != null ? this.default_params.foreground : this.black != null ? this.black : '#000000';
        return this.color = '#ff00ff';
      };

      _Class.prototype.clear = function(image_width, image_height, height) {
        this.canvas.width = image_width;
        this.canvas.height = image_height;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = (this.default_params.color != null) && this.default_params.color ? this.color : this.white;
        this.context.fillRect(0, 0, image_width, image_height);
        this.height = height;
        return this.position = 0;
      };

      _Class.prototype.draw_bar = function(params) {
        var rect_height, rect_top;
        if (!((params.none != null) && params.none)) {
          if (params.color === 'white') {
            this.context.fillStyle = this.white;
          } else if (params.color === 'black') {
            this.context.fillStyle = this.black;
          } else {
            this.context.fillStyle = this.color;
          }
          rect_top = 5;
          if (params.height === 0) {
            rect_height = this.height - rect_top * (1 - params.height);
          } else if (params.height === 1) {
            rect_height = this.height;
          } else if (params.height === 2) {
            rect_top = 5 + this.height / 2;
            rect_height = this.height - rect_top;
          }
          this.context.fillRect(this.position, rect_top, params.width, rect_height);
        }
        if (params.number != null) {
          this.context.font = "bold 10px Trebuchet MS, sans-serif";
          this.context.fillStyle = this.black;
          this.context.textAlign = "center";
          this.context.textBaseline = "middle";
          if (this.context.fillText != null) {
            this.context.fillText(params.number, this.position + 4, this.height + 6);
          }
        }
        return this.position = this.position + params.width;
      };

      return _Class;

    })(),
    create_canvas: function(args) {
      var addon_key, bar_coding, barcode_drawer, basecode, canvas, code, codelen, draw_elements, element_coding_addon_ean15, element_coding_addon_ean18, element_coding_ean13, element_coding_ean8, height, image_height, image_width, index, key, params, type, val, _i, _j, _k, _l, _m, _n, _ref;
      if (typeof args === typeof "") {
        params = {
          code: args
        };
      } else {
        params = {};
        for (key in args) {
          val = args[key];
          params[key] = val;
        }
      }
      if ('canvas' in params) {
        barcode_drawer = params.canvas.drawer;
      } else {
        barcode_drawer = new this.BarCodeDrawer(params);
        barcode_drawer.prepare();
      }
      bar_coding = {
        w: [3, 2, 2, 1, 1, 1, 1, 1, 1, 3],
        x: [2, 2, 1, 4, 1, 2, 1, 3, 2, 1],
        y: [1, 2, 2, 1, 3, 3, 1, 1, 1, 1],
        z: [1, 1, 2, 1, 2, 1, 4, 2, 3, 2]
      };
      element_coding_ean8 = ['A', 'A', 'A', 'A', 'C', 'C', 'C', 'C'];
      element_coding_ean13 = [['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'], ['A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B'], ['A', 'B', 'B', 'B', 'A', 'B', 'B', 'A', 'A', 'B'], ['A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A'], ['A', 'B', 'A', 'B', 'B', 'A', 'A', 'A', 'B', 'B'], ['A', 'B', 'B', 'A', 'B', 'B', 'A', 'B', 'A', 'A'], ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'], ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'], ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'], ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'], ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'], ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C']];
      element_coding_addon_ean15 = [['A', 'A', 'B', 'B'], ['A', 'B', 'A', 'B']];
      element_coding_addon_ean18 = [['B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A'], ['B', 'A', 'A', 'A', 'B', 'A', 'A', 'B', 'B', 'A'], ['A', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'B'], ['A', 'A', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A'], ['A', 'A', 'A', 'B', 'A', 'A', 'B', 'A', 'B', 'B']];
      draw_elements = {
        A: (function(_this) {
          return function(index, height) {
            if (height === void 0) {
              height = 0;
            }
            barcode_drawer.draw_bar({
              width: bar_coding.w[index],
              color: 'white',
              height: height,
              number: index
            });
            barcode_drawer.draw_bar({
              width: bar_coding.x[index],
              color: 'black',
              height: height
            });
            barcode_drawer.draw_bar({
              width: bar_coding.y[index],
              color: 'white',
              height: height
            });
            return barcode_drawer.draw_bar({
              width: bar_coding.z[index],
              color: 'black',
              height: height
            });
          };
        })(this),
        B: (function(_this) {
          return function(index, height) {
            if (height === void 0) {
              height = 0;
            }
            barcode_drawer.draw_bar({
              width: bar_coding.z[index],
              color: 'white',
              height: height,
              number: index
            });
            barcode_drawer.draw_bar({
              width: bar_coding.y[index],
              color: 'black',
              height: height
            });
            barcode_drawer.draw_bar({
              width: bar_coding.x[index],
              color: 'white',
              height: height
            });
            return barcode_drawer.draw_bar({
              width: bar_coding.w[index],
              color: 'black',
              height: height
            });
          };
        })(this),
        C: (function(_this) {
          return function(index, height) {
            if (height === void 0) {
              height = 0;
            }
            barcode_drawer.draw_bar({
              width: bar_coding.w[index],
              color: 'black',
              height: height,
              number: index
            });
            barcode_drawer.draw_bar({
              width: bar_coding.x[index],
              color: 'white',
              height: height
            });
            barcode_drawer.draw_bar({
              width: bar_coding.y[index],
              color: 'black',
              height: height
            });
            return barcode_drawer.draw_bar({
              width: bar_coding.z[index],
              color: 'white',
              height: height
            });
          };
        })(this),
        NORMAL_GUARD: (function(_this) {
          return function() {
            barcode_drawer.draw_bar({
              width: 1,
              color: 'black',
              height: 1
            });
            barcode_drawer.draw_bar({
              width: 1,
              color: 'white',
              height: 1
            });
            return barcode_drawer.draw_bar({
              width: 1,
              color: 'black',
              height: 1
            });
          };
        })(this),
        CENTER_GUARD: (function(_this) {
          return function() {
            barcode_drawer.draw_bar({
              width: 1,
              color: 'white',
              height: 1
            });
            barcode_drawer.draw_bar({
              width: 1,
              color: 'black',
              height: 1
            });
            barcode_drawer.draw_bar({
              width: 1,
              color: 'white',
              height: 1
            });
            barcode_drawer.draw_bar({
              width: 1,
              color: 'black',
              height: 1
            });
            return barcode_drawer.draw_bar({
              width: 1,
              color: 'white',
              height: 1
            });
          };
        })(this),
        EAN_18_SEP: (function(_this) {
          return function() {
            return barcode_drawer.draw_bar({
              width: 7,
              color: 'white',
              height: 1
            });
          };
        })(this),
        ADDON_GUARD: (function(_this) {
          return function() {
            barcode_drawer.draw_bar({
              width: 1,
              color: 'black',
              height: 2
            });
            barcode_drawer.draw_bar({
              width: 1,
              color: 'white',
              height: 2
            });
            return barcode_drawer.draw_bar({
              width: 2,
              color: 'black',
              height: 2
            });
          };
        })(this),
        ADDON_DELINEATOR: (function(_this) {
          return function() {
            barcode_drawer.draw_bar({
              width: 1,
              color: 'white',
              height: 2
            });
            return barcode_drawer.draw_bar({
              width: 1,
              color: 'black',
              height: 2
            });
          };
        })(this),
        NONE: (function(_this) {
          return function(index) {
            return barcode_drawer.draw_bar({
              width: 7,
              none: true,
              number: index
            });
          };
        })(this)
      };
      if (params.type == null) {
        params.type = 'ean';
      }
      type = params.type;
      if (type === 'ean' && params.code.length <= 8) {
        type = 'ean8';
      }
      if (type === 'ean' && params.code.length <= 13) {
        type = 'ean13';
      }
      if (type === 'ean' && params.code.length <= 15) {
        type = 'ean15';
      }
      if (type === 'ean') {
        type = 'ean18';
      }
      if (type === 'ean8') {
        params.code = '00000000'.substr(0, 8 - params.code.length) + params.code;
      }
      if (type === 'ean13') {
        params.code = '0000000000000'.substr(0, 13 - params.code.length) + params.code;
      }
      if (type === 'ean15') {
        params.code = '000000000000000'.substr(0, 15 - params.code.length) + params.code;
      }
      if (type === 'ean18') {
        params.code = '000000000000000000'.substr(0, 18 - params.code.length) + params.code;
      }
      if (type === 'ean8' && params.code.length > 8) {
        params.code = params.code.substr(0, 8);
      }
      if (type === 'ean13' && params.code.length > 13) {
        params.code = params.code.substr(0, 13);
      }
      if (type === 'ean15' && params.code.length > 15) {
        params.code = params.code.substr(0, 15);
      }
      if (type === 'ean18' && params.code.length > 18) {
        params.code = params.code.substr(0, 18);
      }
      if ((type === 'ean13' || type === 'ean15' || type === 'ean18') && params.replacekey) {
        key = 0;
        for (index = _i = 0; _i <= 11; index = ++_i) {
          key += parseInt(params.code.substr(index, 1)) * (1 + 2 * (index % 2));
        }
        key = (10 - (key % 10)) % 10;
        params.code = params.code.substr(0, 12) + key + params.code.substr(13);
      }
      codelen = params.code.length;
      height = (codelen > 13 ? 13 : codelen) * 8;
      image_width = codelen * 7 + 3 * (codelen > 13) * (codelen - 13 + 1) + 25;
      image_height = height + 13;
      this.width = image_width;
      this.height = image_height;
      barcode_drawer.clear(this.width, this.height, height);
      barcode_drawer.position = 7;
      if (type === 'ean8') {
        draw_elements.NORMAL_GUARD();
        for (index = _j = 0, _ref = params.code.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; index = 0 <= _ref ? ++_j : --_j) {
          code = parseInt(params.code.substr(index, 1));
          draw_elements[element_coding_ean8[index]](code);
          if (index === 3) {
            draw_elements.CENTER_GUARD();
          }
        }
        draw_elements.NORMAL_GUARD();
      } else {
        basecode = parseInt(params.code.substr(0, 1));
        draw_elements.NONE(basecode);
        draw_elements.NORMAL_GUARD();
        for (index = _k = 1; _k <= 12; index = ++_k) {
          code = parseInt(params.code.substr(index, 1));
          draw_elements[element_coding_ean13[index - 1][basecode]](code);
          if (index === 6) {
            draw_elements.CENTER_GUARD();
          }
        }
        draw_elements.NORMAL_GUARD();
        if (type === 'ean15') {
          addon_key = parseInt(params.code.substr(13, 2));
          addon_key %= 4;
          draw_elements.EAN_18_SEP();
          for (index = _l = 0; _l <= 1; index = ++_l) {
            if (index === 0) {
              draw_elements.ADDON_GUARD();
            } else {
              draw_elements.ADDON_DELINEATOR();
            }
            code = parseInt(params.code.substr(index + 13, 1));
            draw_elements[element_coding_addon_ean15[index][addon_key]](code, 2);
          }
        }
        if (type === 'ean18') {
          addon_key = 0;
          for (index = _m = 0; _m <= 4; index = ++_m) {
            addon_key += parseInt(params.code.substr(13 + index, 1)) * 3 * (1 + 2 * (index % 2));
          }
          addon_key %= 10;
          draw_elements.EAN_18_SEP();
          for (index = _n = 0; _n <= 4; index = ++_n) {
            if (index === 0) {
              draw_elements.ADDON_GUARD();
            } else {
              draw_elements.ADDON_DELINEATOR();
            }
            code = parseInt(params.code.substr(index + 13, 1));
            draw_elements[element_coding_addon_ean18[index][addon_key]](code, 2);
          }
        }
      }
      canvas = barcode_drawer.canvas;
      canvas.drawer = barcode_drawer;
      canvas.title = params.code;
      canvas.draw_barcode = (function(_this) {
        return function(args) {
          var local_params;
          local_params = {};
          local_params.canvas = canvas;
          for (key in args) {
            val = args[key];
            if (!(key in local_params)) {
              local_params[key] = val;
            }
          }
          for (key in params) {
            val = params[key];
            if (!(key in local_params)) {
              local_params[key] = val;
            }
          }
          return _this.create_canvas(local_params);
        };
      })(this);
      return canvas;
    },
    draw_barcodes: function($, params) {
      var $barcode_element, barcode_element, current_params, elements, key, val, _i, _len;
      if (params == null) {
        params = {};
      }
      if ('target' in params) {
        elements = $(params.target).find('.barcode');
      } else {
        elements = $('.barcode');
      }
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        barcode_element = elements[_i];
        $barcode_element = $(barcode_element);
        current_params = {};
        for (key in params) {
          val = params[key];
          current_params[key] = val;
        }
        if (barcode_element.draw_barcode === void 0) {
          barcode_element.draw_barcode = (function(_this) {
            return function(params) {
              var canvas, local_params, type;
              local_params = {};
              if (params == null) {
                params = {};
              }
              for (key in params) {
                val = params[key];
                if (!(key in local_params)) {
                  local_params[key] = val;
                }
              }
              for (key in current_params) {
                val = current_params[key];
                if (!(key in local_params)) {
                  local_params[key] = val;
                }
              }
              if (!('code' in local_params)) {
                local_params.code = $barcode_element.attr('barcode');
              }
              if ($barcode_element[0].canvas != null) {
                return $barcode_element[0].canvas.draw_barcode(local_params);
              } else {
                $barcode_element.html('');
                type = $barcode_element.attr('type');
                if (!('type' in local_params)) {
                  if (type == null) {
                    local_params.type = type;
                  }
                }
                canvas = _this.create_canvas(local_params);
                $barcode_element.append(canvas);
                return $barcode_element[0].canvas = canvas;
              }
            };
          })(this);
        }
        barcode_element.draw_barcode(current_params);
      }
    }
  };
});
