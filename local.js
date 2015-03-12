$(function($) {
  var on_code_changed, on_name_changed;
  barcodelib.draw_barcodes($, {
    replacekey: 1
  });
  on_code_changed = function() {
    $('#main-code').attr('barcode', $('#input-code').val());
    return $('#main-code')[0].draw_barcode();
  };
  on_name_changed = function() {
    return $('#main-name').text($('#input-name').val());
  };
  $('#input-code').on('input', on_code_changed);
  $('#input-name').on('input', on_name_changed);
  on_code_changed();
  return on_name_changed();
});
