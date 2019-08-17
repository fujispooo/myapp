$(function(){
  var cropper;
  var croppable = false;
  function initIconCrop(){
    cropper = new Cropper(crop_img, {
      dragMode: 'move',
      aspectRatio: 1,
      restore: false,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      minCropBoxWidth: 280,
      minCropBoxHeight: 280,
      ready: function(){
        croppable = true;
      }
    });
  }

  var croppedCanvas;
  function iconCropping(){
    if (!croppable) {
      alert('トリミングする画像が設定されていません。');
      return false;
    }
    croppedCanvas = cropper.getCroppedCanvas({
      width: 280,
      height: 280,
    });
    var croppedImage = document.createElement('img');
    croppedImage.src = croppedCanvas.toDataURL();
    img_field.innerHTML = '';
    img_field.appendChild(croppedImage);
  };

  var blob;
  function blobing(){
    if (croppedCanvas && croppedCanvas.toBlob){
      croppedCanvas.toBlob(function(b){
        blob = b;
        sending();
      });
    }else if(croppedCanvas && croppedCanvas.msToBlob){
      blob = croppedCanvas.msToBlob();
      sending();
    }else{
      blob = null;
      sending();
    };
  };


  function sending(){
    var formData = new FormData();
    const route = $('#route').val();
    const id = $('#idParams').val();
    const action = $('#action').val();

    $.ajaxPrefilter(function(options, originalOptions, jqXHR){
      var token;
      if (!options.crossDomain){
        token = $('meta[name="csrf-token"]').attr('content');

        if (token){
          return jqXHR.setRequestHeader('X-CSRF-Token', token);
        };
      };
    });
    usersVal(formData);
    if (action == "new"){
      $.ajax({
        url: '/' + route,
        datatype: 'json',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
      });
    }else if (action == "edit"){
      $.ajax({
        url: '/' + route + '/' + id,
        datatype: 'json',
        type: 'patch',
        data: formData,
        processData: false,
        contentType: false,
      });
    }
  };
  function usersVal(formData){
    name = $('#name').val();
    email = $('#email').val();
    twitter = $('#twitter').val();
    facebook = $('#facebook').val();
    content = $('#content').val();
    want_to_advertise = $(':radio[name="want_to_advertise"]:checked').val();
    want_to_be_advertised = $(':radio[name="want_to_be_advertised"]:checked').val();

    if (blob != null){
      formData.append('icon', blob);
    }
    formData.append('name', name);
    formData.append('email', email);
    formData.append('twitter', twitter);
    formData.append('facebook', facebook);
    formData.append('content', content);
    if (want_to_advertise != null){
      formData.append('want_to_advertise', want_to_advertise);
    }
    if (want_to_be_advertised != null){
      formData.append('want_to_be_advertised', want_to_be_advertised);
    }
    return formData
  }

  $('#upicon').on('change', function(e){
    file = e.target.files[0];
    reader = new FileReader();

    if(file.type.indexOf('image') < 0){
      return false;
    };
    reader.onload = (function(e){
      $('.overlay').fadeIn();
      $('.crop_modal').append($('<img>').attr({
        src: e.target.result,
        height: "100%",
        class: "preview",
        id: "crop_img",
        title: file.name
      }));
      initIconCrop();
    });
    reader.readAsDataURL(file);
  });

  $('.select_icon_btn').on('click', function(){
    iconCropping();
    $('.overlay').fadeOut();
    $('#crop_img').remove();
    $('.cropper-container').remove();
  });

  $('.close_btn').on('click', function(){
    $('.overlay').fadeOut();
    $('#crop_img').remove();
    $('.cropper-container').remove();
  });

  $('.submit_btn').on('click', function(){
    blobing();
  });
});