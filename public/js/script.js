// VALIDATION CHECK FOR LOGIN FORM
const loginValidation = () => {
  const email = $('#email').val();
  const name = $('#name').val();
  const regexSimple = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
  if (name === '' || name === null) {
    $('#errorName').removeClass('hide');
    return false;
  } else {
    $('#errorName').removeClass('show');
    $('#errorName').addClass('hide');
  }
  if (email === '' || email === null) {
    $('#errorEmail').removeClass('hide');
    return false;
  } else {
    $('#errorEmail').removeClass('show');
    $('#errorEmail').addClass('hide');
  }
  if (!email.match(regexSimple)) {
    $('#errorEmail2').removeClass('hide');
    return false;
  } else {
    $('#errorEmail2').removeClass('show');
    $('#errorEmail2').addClass('hide');
  }
  return true;
};

// LOGIN FORM POST REQUEST
$('#loginBtn').on('click', (event) => {
  if (loginValidation() === false) {
    event.preventDefault();
  } else {
    event.preventDefault();
    let userId;
    const data = {
      email: $('#email').val(),
      name: $('#name').val(),
      userId,
    };
    $.ajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        localStorage.setItem('userId', response.userId);
        window.location = `/dashboard/${response.userId}`;
      },
      error: function (err) {
        console.log(`Error ${err}`);
      },
    });
  }
});

// VALIDATION CHECK FOR DASHBOARD FORM

const formValidation = () => {
  const mood = $('#mood option:selected').text();
  const water = $('#water').val();
  const steps = $('#steps').val();
  const sleep = $('#sleep').val();
  const exercise = $('#exercise').val();
  const calorie = $('#calorie').val();
  const alcohol = $('#alcohol').val();
  const coffee = $('#coffee').val();
  if (mood === '' || mood === null) {
    $('#errorForm').removeClass('hide');
    return false;
  }else {
    $('#errorForm').removeClass('hide');
  }
  if (water === '' || water === null) {
    $('#errorForm').removeClass('hide');
    return false;
  }else {
    $('#errorForm').removeClass('show');
    $('#errorForm').addClass('hide');
  }
  if (steps === '' || steps === null) {
    $('#errorForm').removeClass('hide');
    return false;
  }else {
    $('#errorForm').removeClass('show');
    $('#errorForm').addClass('hide');
  }
  if (sleep === '' || sleep === null) {
    $('#errorForm').removeClass('hide');
    return false;
  }else {
    $('#errorForm').removeClass('show');
    $('#errorForm').addClass('hide');
  }
  if (exercise === '' || exercise === null) {
    $('#errorForm').removeClass('hide');
    return false;
  }else {
    $('#errorForm').removeClass('show');
    $('#errorForm').addClass('hide');
  }
  if (calorie === '' || calorie === null) {
    $('#errorForm').removeClass('hide');
    return false;
  } else {
    $('#errorForm').removeClass('show');
    $('#errorForm').addClass('hide');
  }
  if (alcohol === '' || alcohol === null) {
    $('#errorForm').removeClass('hide');
    return false;
  }else {
    $('#errorForm').removeClass('show');
    $('#errorForm').addClass('hide');
  }
  if(coffee === '' || coffee === null) {
    $('#errorForm').removeClass('hide');
    return false;
  }else {
    $('#errorForm').removeClass('show');
    $('#errorForm').addClass('hide');
  }
  return true;
};

// USER DASHBOARD POST REQUEST
$('#submitBtn').on('click', (event) => {
  if (formValidation() === false) {
    event.preventDefault();
  }else{
    event.preventDefault();
    const data = {
      mood: $('#mood option:selected').text(),
      water: $('#water').val(),
      steps: $('#steps').val(),
      sleep: $('#sleep').val(),
      exercise: $('#exercise').val(),
      calorie: $('#calorie').val(),
      alcohol: $('#alcohol').val(),
      coffee: $('#coffee').val(),
    };
    const userId = localStorage.getItem('userId');
    console.log(`data values ${data}`);
    $.ajax({
      type: 'POST',
      url: `/dashboard/${userId}`,
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        console.log(`sent ${response}`);
        if (response.redirect) {
          window.location = response.redirect;
        }
      },
      error: function (err) {
        console.log(`Error ${err}`);
      },
    });
  }
});


if(document.getElementById('inpFile') !== null){
  const inpFile = document.getElementById('inpFile');
  const previewContainer = document.getElementById('imagePreview');
  const submitImage = document.getElementById('submitImage');
  inpFile.addEventListener('change', function() {
    const file = this.files[0];
    if(file){
      const reader = new FileReader();
      const previewImage = previewContainer.querySelector('.image-preview__image');
      const previewDefaultText = previewContainer.querySelector('.image-preview-text');
      previewDefaultText.style.display = 'none';
      previewImage.style.display = 'block';
      submitImage.style.display = 'block';

      reader.addEventListener('load', function() {
        previewImage.setAttribute('src',this.result);
      });
      reader.readAsDataURL(file);
    }else{
      previewDefaultText.style.display = null;
      previewImage.style.display = null;
      previewImage.setAttribute('src','');
    }
  });
  const submit = document.querySelector('#submitImage');
  submit.addEventListener('click', () => {
    const inpFile = document.getElementById('inpFile');
    const userId = localStorage.getItem('userId');
    const file = inpFile.files[0];
    const fd = new FormData();
    fd.append('file',file);
    $.ajax({
      type: 'POST',
      url: `/dashboard/${userId}/message`,
      data:fd,
      contentType:false,
      processData:false,
      success : function(){
        window.location = `/dashboard/${userId}/message`;
      }
    });
  });
}

// DELETE REQUEST FOR USER DATA
$('#deleteBtn').on('click', (event) => {
  event.preventDefault();
  const userId = localStorage.getItem('userId');
  $.ajax({
    type: 'DELETE',
    url: `/dashboard/${userId}`,
    contentType: 'application/json',
    success: function (response) {
      localStorage.removeItem('userId', response.userId);
      window.location = '/';
    },
    error: function (err) {
      console.log(`Error ${err}`);
    },
  });
});