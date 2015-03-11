@barcodelib =
    window : @
    mkbarcode : (params) ->
        if params.createCanvas?
            canvas = params.createCanvas()
        else
            canvas = @window.document.createElement('canvas')
        default_params = params
        canvas.drawcode = (args) ->
            if typeof(args) == typeof("")
                params = {code:args}
            else
                params = {}
                for key,val of args
                    params[key] = val
            for key,val of default_params
                params[key] = val unless params[key]?
                params[key] = val unless params[key]?
            @white = if params.background? then params.background else if @white? then @white else '#ffffff'
            @black = if params.foreground? then params.foreground else if @black? then @black else '#000000'
            @color = '#ff00ff'
            bar_coding =
                w : [ 3, 2, 2, 1, 1, 1, 1, 1, 1, 3 ]
                x : [ 2, 2, 1, 4, 1, 2, 1, 3, 2, 1 ]
                y : [ 1, 2, 2, 1, 3, 3, 1, 1, 1, 1 ]
                z : [ 1, 1, 2, 1, 2, 1, 4, 2, 3, 2 ]
            element_coding_ean8 = ['A','A','A','A','C','C','C','C']
            element_coding_ean13 =
                [ [ 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A' ],
                  [ 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B' ],
                  [ 'A', 'B', 'B', 'B', 'A', 'B', 'B', 'A', 'A', 'B' ],
                  [ 'A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A' ],
                  [ 'A', 'B', 'A', 'B', 'B', 'A', 'A', 'A', 'B', 'B' ],
                  [ 'A', 'B', 'B', 'A', 'B', 'B', 'A', 'B', 'A', 'A' ],
                  [ 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C' ],
                  [ 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C' ],
                  [ 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C' ],
                  [ 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C' ],
                  [ 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C' ],
                  [ 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C' ] ]
            element_coding_addon_ean15 =
                [ [ 'A', 'A', 'B', 'B' ],
                  [ 'A', 'B', 'A', 'B' ] ]
            element_coding_addon_ean18 =
                [ [ 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A' ],
                  [ 'B', 'A', 'A', 'A', 'B', 'A', 'A', 'B', 'B', 'A' ],
                  [ 'A', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'B' ],
                  [ 'A', 'A', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A' ],
                  [ 'A', 'A', 'A', 'B', 'A', 'A', 'B', 'A', 'B', 'B' ] ]
                  
            draw_elements =
                A : (index) =>
                    (draw_bar,height) =>
                        height = 0 if height == undefined
                        draw_bar width: bar_coding.w[index], color: @white, height: height, number: index
                        draw_bar width: bar_coding.x[index], color: @black, height: height
                        draw_bar width: bar_coding.y[index], color: @white, height: height
                        draw_bar width: bar_coding.z[index], color: @black, height: height
                B : (index) =>
                    (draw_bar,height) =>
                        height = 0 if height == undefined
                        draw_bar width: bar_coding.z[index], color: @white, height: height, number: index
                        draw_bar width: bar_coding.y[index], color: @black, height: height
                        draw_bar width: bar_coding.x[index], color: @white, height: height
                        draw_bar width: bar_coding.w[index], color: @black, height: height
                C : (index) =>
                    (draw_bar,height) =>
                        height = 0 if height == undefined
                        draw_bar width: bar_coding.w[index], color: @black, height: height, number: index
                        draw_bar width: bar_coding.x[index], color: @white, height: height
                        draw_bar width: bar_coding.y[index], color: @black, height: height
                        draw_bar width: bar_coding.z[index], color: @white, height: height
                NORMAL_GUARD : (draw_bar) =>
                    draw_bar width: 1, color: @black, height: 1
                    draw_bar width: 1, color: @white, height: 1
                    draw_bar width: 1, color: @black, height: 1
                CENTER_GUARD : (draw_bar) =>
                    draw_bar width: 1, color: @white, height: 1
                    draw_bar width: 1, color: @black, height: 1
                    draw_bar width: 1, color: @white, height: 1
                    draw_bar width: 1, color: @black, height: 1
                    draw_bar width: 1, color: @white, height: 1
                EAN_18_SEP :  (draw_bar) =>
                    draw_bar width: 7, color: @white, height: 1
                ADDON_GUARD : (draw_bar) =>
                    draw_bar width: 1, color: @black, height: 2
                    draw_bar width: 1, color: @white, height: 2
                    draw_bar width: 2, color: @black, height: 2
                ADDON_DELINEATOR : (draw_bar) =>
                    draw_bar width: 1, color: @white, height: 2
                    draw_bar width: 1, color: @black, height: 2
                NONE : (index) =>
                    (draw_bar) =>
                        draw_bar width: 7, none: true, number: index
            
            params.type = 'ean' unless params.type?
            params.type = 'ean8' if params.type == 'ean' and params.code.length <= 8
            params.type = 'ean13' if params.type == 'ean' and params.code.length <= 13
            params.type = 'ean15' if params.type == 'ean' and params.code.length <= 15
            params.type = 'ean18' if params.type == 'ean'
            params.code = '00000000'.substr(0,8-params.code.length) + params.code if params.type == 'ean8'
            params.code = '0000000000000'.substr(0,13-params.code.length) + params.code if params.type == 'ean13'
            params.code = '000000000000000'.substr(0,15-params.code.length) + params.code if params.type == 'ean15'
            params.code = '000000000000000000'.substr(0,18-params.code.length) + params.code if params.type == 'ean18'
            
            params.code = params.code.substr(0,8) if params.type == 'ean8' and params.code.length > 8
            params.code = params.code.substr(0,13) if params.type == 'ean13' and params.code.length > 13
            params.code = params.code.substr(0,15) if params.type == 'ean15' and params.code.length > 15
            params.code = params.code.substr(0,18) if params.type == 'ean18' and params.code.length > 18
            
            if (params.type == 'ean13' || params.type == 'ean15' || params.type == 'ean18') && params.replacekey
                key = 0
                for index in [0..11]
                    key += parseInt(params.code.substr(index,1))*(1+2*(index%2))
                key = (10-(key%10))%10
                params.code = params.code.substr(0,12) + key + params.code.substr(13)
            
            codelen = params.code.length
            height = (if codelen>13 then 13 else codelen)*8
            
            image_width = codelen*7+3*(codelen>13)*(codelen-13+1)+25
            image_height = height+13
            
            @width = image_width
            @height = image_height
            
            context = @getContext('2d')
            context.fillStyle = if params.color? and params.color then @color else @white
            context.fillRect(0,0,image_width,image_height)
            position = 7
            draw_bar = (params) =>
                unless ( params.none? and params.none )
                        context.fillStyle = params.color
                        rect_top = 5
                        if params.height == 0
                            rect_height = height-rect_top*(1-params.height)
                        else if params.height == 1
                            rect_height = height
                        else if params.height == 2
                            rect_top = 5+height/2
                            rect_height = height-rect_top
                        
                        context.fillRect(position,rect_top,params.width,rect_height)
                if params.number?
                    context.font = "bold 10px Trebuchet MS, sans-serif"
                    context.fillStyle = @black
                    context.textAlign = "center"
                    context.textBaseline = "middle"
                    context.fillText params.number, position+4, height+6 if context.fillText?
                position = position+params.width
            
            if params.type == 'ean8'
                draw_elements.NORMAL_GUARD(draw_bar)
                for index in [0..params.code.length-1]
                    code = parseInt(params.code.substr(index,1))
                    draw_elements[element_coding_ean8[index]](code)(draw_bar)
                    draw_elements.CENTER_GUARD(draw_bar) if index == 3
                draw_elements.NORMAL_GUARD(draw_bar)
            else
                basecode = parseInt(params.code.substr(0,1))
                draw_elements.NONE(basecode)(draw_bar)
                draw_elements.NORMAL_GUARD(draw_bar)
                for index in [1..12]
                    code = parseInt(params.code.substr(index,1))
                    draw_elements[element_coding_ean13[index-1][basecode]](code)(draw_bar)
                    draw_elements.CENTER_GUARD(draw_bar) if index == 6
                draw_elements.NORMAL_GUARD(draw_bar)
                if params.type == 'ean15'
                    addon_key = parseInt(params.code.substr(13,2))
                    addon_key %= 4
                    draw_elements.EAN_18_SEP(draw_bar)
                    for index in [0..1]
                        if index == 0
                            draw_elements.ADDON_GUARD(draw_bar)
                        else
                            draw_elements.ADDON_DELINEATOR(draw_bar)
                        code = parseInt(params.code.substr(index+13,1))
                        draw_elements[element_coding_addon_ean15[index][addon_key]](code)(draw_bar,2)
                if params.type == 'ean18'
                    addon_key = 0
                    (addon_key += parseInt(params.code.substr(13+index,1))*3*(1+2*(index%2))) for index in [0..4]
                    addon_key %= 10
                    draw_elements.EAN_18_SEP(draw_bar)
                    for index in [0..4]
                        if index == 0
                            draw_elements.ADDON_GUARD(draw_bar)
                        else
                            draw_elements.ADDON_DELINEATOR(draw_bar)
                        code = parseInt(params.code.substr(index+13,1))
                        draw_elements[element_coding_addon_ean18[index][addon_key]](code)(draw_bar,2)
                    
            @title = params.code
            return @
        canvas.drawcode(params)
        return canvas
    addbarcode : ($,params) ->
        for barcode_element in $('.barcode')
            $barcode_element = $(barcode_element)
            $barcode_element.html('')
            current_params = {}
            for key,val of params
                current_params[key] = val
            current_params.code = $barcode_element.attr('barcode')
            $barcode_element.append(@mkbarcode(current_params))
        return
