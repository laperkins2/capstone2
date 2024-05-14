function getPlaylists(user) {
  return fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
    headers: {
      Authorization:
        'Bearer ' +
        BQDDH9yoxEhiMmLplimuEjZiVeENWjW83D9CDl -
        x_mk4hqbGGvjZG5AMItdmaLd1AJ4opuJ7jTRCvdYMdyRAjSmIKvLGDebIoYDYunk8bIOgYfAuU3KrqBlvhl9wi7m0Sai2rzRmk0crFfNUeFCYz_7xIJ6zsCYkaQIBh9 -
        x2YD20WYgszLWcgzuDI2yKDd40kGx_j1Fr5tgItFYMU2GknXPgFwzBW -
        a68KbilMC,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response not ok');
      }
      return response.json();
    })
    .then((data) => data.items)
    .catch((err) => {
      console.error('Not able to get playlist', err);
    });
}

document
  .getElementById('playlistForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    let user = document.getElementById('user').value;
    getPlaylists(user)
      .then((playlists) => {
        let playlistView = document.getElementById('playlistView');
        playlistView.innerHTML = '';
        if (playlists.length === 0) {
          playlistView.textContent = 'Playlist not found.';
        } else {
          playlists.forEach((playlist) => {
            const div = document.createElement('div');
            div.classList.add('card', 'mb-3');
            div.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${playlist.name}</h5>
                            <audio controls class="mb-2">
                                <source src="${playlist.tracks.href}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    `;
            playlistView.appendChild(div);
          });
        }
      })
      .catch((error) => {
        playlistView.textContent = 'Check ID and access token.';
        console.error('Error:', error);
      });
  });
