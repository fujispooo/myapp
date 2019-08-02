$(function(){
  function buildHTML(comment){
    var html =  `<div class='comment__list--box'>
                  <div class='commented__user'>${comment.user_name}</div>
                  <div class='commented__text'>${comment.text}</div>
                </div>`
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href + '/comments'
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.comment__list').prepend(html);
      $('.comment--box__text input').val('');
      $('.form_submit').prop('disabled', false);
    })
  })
});