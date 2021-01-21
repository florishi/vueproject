const loginValidation = () => {
  const email = $('#email').val();
  const name = $('#name').val();
  const regexSimple = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
  /*const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;*/
  if (name === '' || name === null) {
    $('#errorName').toggle('show hide');
    return false;
  }
  if (email === '' || email === null) {
    $('#errorEmail').toggle('show hide');
    return false;
  }
  if (!email.match(regexSimple)) {
    $('#errorEmail2').toggle('show hide');
    return false;
  }
  return true;
};
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let userId = localStorage.getItem('userId');
if(userId === null){
  userId = makeid(22);
  localStorage.setItem('userId', userId);
}

// POST LOGIN FORM DATA TO /login route
$('#loginBtn').on('click', (event) => {
  if (loginValidation() === false) {
    event.preventDefault();
  } else {
    event.preventDefault();
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
        localStorage.setItem('email', data.email);
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
    email : localStorage.getItem('email')
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
