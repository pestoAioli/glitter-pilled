import { JWTString } from "next-auth/core/lib/cookie";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const simpleAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;


const getAccessToken = async (refresh_token): String => {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      "User-Agent": '*',
      Authorization: `Basic ${simpleAuth}`,
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  });
  return res.json();
}

export const getTopTracks = async (refresh_token): JWTString => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(TOP_ARTISTS_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
