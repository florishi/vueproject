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

// POST LOGIN FORM DATA TO /login route
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
    console.log('data values', data);
    $.ajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        console.log(`sent ${response}`);
        localStorage.setItem('userId', response.userId);
        window.location = `/dashboard/${response.userId}`;
      },
      error: function (err) {
        console.log(`Error ${err}`);
      },
    });
  }
});

// POST USER DASHBOARD FORM DATA TO /dashboard route
$('#submitBtn').on('click', (event) => {
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
});

const inpFile = document.getElementById('inpFile')
const previewContainer = document.getElementById('imagePreview')
const previewImage = previewContainer.querySelector('.image-preview__image')
const previewDefaultText = previewContainer.querySelector('.image-preview-text')

inpFile.addEventListener('change', function() {
  const file = this.files[0];

  if(file){
    const reader = new FileReader()

    previewDefaultText.style.display = "none";
    previewImage.style.display = "block";

    reader.addEventListener("load", function() {
      previewImage.setAttribute("src",this.result)
    });

    reader.readAsDataURL(file);
  }else{
    previewDefaultText.style.display = null;
    previewImage.style.display = null;
    previewImage.setAttribute("src","")

  }

  

})
  

