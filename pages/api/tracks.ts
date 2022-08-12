import { getTopTracks } from "../../lib/spotify";
import { getSession } from "next-auth/react";


const handler = async (req, res) => {
  const {
    token: { accessToken }
  } = await getSession({ req });

  const response = await getTopTracks(accessToken);
  console.log(response);
  const { items } = await response.json();
  return res.status(200).json({ items });
};

export default handler;
