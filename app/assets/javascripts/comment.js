$(function(){
  function buildHTML(comment){
    var html =  `<div class='comment__list--box'>
                  <div class='commented__user'>${comment.user_name}</div>
                  <div class='commented__text'>${comment.text}</div>
                </div>
                <form class="new_comment" id="new__reply" action="/tweets/${comment.tweet_id}/comments" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="q6Hj/dCeittBppzX+ToTFRMqG1wa/4QejJ7j4fjS+WlA3CHPCtBxJ5QNChfWgxUKE5eQCLwX371WewrI76tEfw=="><input value="${comment.id}" type="hidden" name="comment[parent_id]" id="comment_parent_id">
                  <input class="reply__comment" type="text" name="comment[text]" id="comment_text">
                  <input type="submit" name="commit" value="Create Comment" class="form_submit" data-disable-with="Create Comment">
                </form>`
    return html;
  }
  function reply_buildHTML(reply_comment){
    var html =  `<div class='reply__list--box'>
                  <div class='commented__user'>${reply_comment.user_name}</div>
                  <div class='commented__text'>${reply_comment.text}</div>
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
    .done(function(comment){
      if (comment.text.length !== 0){
        var html = buildHTML(comment);
        $('.comment__list').prepend(html);
        $('.comment--box__text input').val('');
        $('.form_submit').prop('disabled', false);
        $('.comment__list').animate({ scrollTop: 0});
      } 
      else {
        alert('コメントを入力してください');
        $('.form_submit').prop('disabled', false);
      }
    })
  })
  $('#new__reply').on('submit', function(e){
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
    .done(function(reply_comment){
      if (reply_comment.text.length !== 0){
        var html = reply_buildHTML(reply_comment);
        $('.reply__list').prepend(html);
        $('.reply__comment').val('');
        $('.form_submit').prop('disabled', false);
        // $('.comment__list').animate({ scrollTop: 0});
      } 
      else {
        alert('コメントを入力してください');
        $('.form_submit').prop('disabled', false);
      }
    })
  })
});