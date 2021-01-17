// POST LOGIN FORM DATA TO /dashboard route

$('#submitBtn').on('click', function(event){
  event.preventDefault();
  console.log('dashboard form sumbit clicked');
  const data = {
    'mood': $('#mood').val(),
    'water': $('#water').val(),
    'steps': $('#steps').val(),
    'sleep': $('#sleep').val(),
    'exercise': $('#exercise').val(),
  };
  console.log(`data values ${data}`);
  $.ajax({
    type: 'POST',
    url: '/dashboard',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(response) {
      console.log(`sent ${response}`);
      if (response.redirect) {
        window.location = response.redirect;
      }
    },
    error: function(err) {
      console.log(`Error ${err}`);
    }
  });
});

// POST LOGIN FORM DATA TO /dashboard route
$('#loginBtn').on('click', function(event) {
  event.preventDefault();
  console.log('login button clicked');
  const data = {
    'email': $('#email').val(),
    'name': $('#name').val(),
  };
  console.log('data values', data);
  $.ajax({
    type: 'POST',
    url: '/login',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(response) {
      console.log(`sent ${response}`);
      if (response.redirect) {
        window.location = response.redirect;
      }
    },
    error: function(err) {
      console.log(`Error ${err}`);
    }
  });
});

/*
$.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
    })
    .then( response => console.log(`response, ${response}`))
    .catch( err => console.log(`error posting form, ${err}`));

$.ajax({
      url: '/dashboard',
      type: 'post',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
    })
    .then( response => console.log(`response, ${response}`))
    .catch( err => console.log(`error posting form, ${err}`));



*/