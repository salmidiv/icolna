 function quilljs_textarea(elem = null, options = null) {
    if(elem) {
        var editorElems = Array.prototype.slice.call(document.querySelectorAll(elem));
    } else {
        var editorElems = Array.prototype.slice.call(document.querySelectorAll('[data-quilljs]'));
    }
    editorElems.forEach(function(el) {
    if(elem && el.hasAttribute("data-quilljs")) {
        return;
    }
    var elemType = el.type;
    if(elemType == 'textarea') {
        elemValue = el.value;
        editorDiv = document.createElement('div');
        editorDiv.innerHTML = elemValue;
        el.parentNode.insertBefore(editorDiv, el.nextSibling);
        el.style.display = "none";
        var placeholder = el.placeholder;
    } else {
        var placeholder = null;
        editorDiv = el;   
    }
    if(!options) {
        var default_options = {
        theme: 'snow',
        placeholder: placeholder,
        };
    } else {
        if(!options.placeholder) {
        options.placeholder = placeholder;
        }
        var default_options = options;
    }

    var editor = new Quill(editorDiv, default_options);
    editor.on('text-change', function(delta, oldDelta, source) {
        var editor_value = editor.root.innerHTML;
        el.value = editor_value;
    });
    });
}
(function() {
    quilljs_textarea();
})();



 var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
var IMGUR_API_URL = 'https://api.imgur.com/3/image';

function imageHandler(image, callback) {
  var data = new FormData();
  data.append('image', image);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', IMGUR_API_URL, true);
  xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === 200 && response.success) {
        callback(response.data.link);
      } else {
        var reader = new FileReader();
        reader.onload = function(e) {
          callback(e.target.result);
        };
        reader.readAsDataURL(image);
      }
    }
  }
  xhr.send(data);
}