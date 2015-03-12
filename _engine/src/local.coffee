$ ($) ->
  barcodelib.draw_barcodes $, replacekey: 1
  on_code_changed = ->
    $('#main-code').attr 'barcode', $('#input-code').val()
    $('#main-code')[0].draw_barcode()
  on_name_changed = ->
    $('#main-name').text $('#input-name').val()
  $('#input-code').on 'input', on_code_changed
  $('#input-name').on 'input', on_name_changed
  on_code_changed()
  on_name_changed()
  

