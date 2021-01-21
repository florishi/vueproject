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

// POST LOGIN FORM DATA TO /login route
$('#loginBtn').on('click', (event) => {
  if (loginValidation() === false) {
    event.preventDefault();
  } else {
    event.preventDefault();
    let userId;
    //localStorage.setItem('userId', userId);
  
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
        localStorage.setItem('userId',response.userId)
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
