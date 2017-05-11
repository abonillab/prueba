'use strict';

function takePicture(id) {
  $('#' + id).click();
}

function changeLabelsWhenInputIsFocused() {

  $('body').on('focus', 'input', function() {
    var error = document.getElementsByClassName('pointing');
    var id = $(this).prop('id');

    if(error.length==0){
    removeActiveLabelClassFromEveryLabel();
    }
    $('label[for=' + id + ']').addClass('active-label');

  });

  $('body').on('focusout', 'input', removeActiveLabelClassFromEveryLabel);

}

function removeActiveLabelClassFromEveryLabel() {
  $('label').removeClass('active-label');
}

function setFocusOnInputOfActiveLabel() {
  var id = $('.active-label').prop('for');
  $('#' + id).focus();
}

$(changeLabelsWhenInputIsFocused);

// TODO: find a better solution for this
setTimeout(setFocusOnInputOfActiveLabel, 100);
