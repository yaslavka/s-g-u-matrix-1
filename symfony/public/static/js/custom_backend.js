$(document).ready(function () {
    var $markdownInputs = $('.js-markdown-input .form-control')

    $markdownInputs.after('<div class="markdown-preview"></div>');

    $markdownInputs.on('keyup', function (e) {
        e.target.nextElementSibling.innerHTML = snarkdown(e.target.value);
    });

    $markdownInputs.trigger('keyup');

    $('.js-delete-scientist').on('click', function(e) {
        e.preventDefault();

        alert('todo');
    });
});
