  const getGif = () => {
    $.ajax('https://cors-anywhere.herokuapp.com/https://www.affirmations.dev/')
      .then( data => console.log('affirmation:', data.affirmation))
      .catch( err => console.log('error getting gif', err));
  };
  getGif();