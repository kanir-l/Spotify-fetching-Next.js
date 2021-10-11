export const getToken = () => {
  var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
  var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  var authOptions = {
    method: 'post',
    body: params,
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString(
          'base64'
        )
    }
  }

  return fetch('https://accounts.spotify.com/api/token', authOptions) 
}

export const getSearchResults = (searchTerm: string, accessToken: string) => {
  const params = new URLSearchParams()
  params.append('q', searchTerm)
  params.append('type', 'artist')

  var searchOptions = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  }

  return fetch('https://api.spotify.com/v1/search?' + params.toString(), searchOptions)
}  

export const getArtistsAlbums = (artistId: string, accessToken: string) => {
  const params = new URLSearchParams()
  params.append('type', 'album')

  var requestOptions = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  }

  return fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, requestOptions)
}