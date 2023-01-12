import { GOOGLE_API_KEY } from "../constants/constants";

export async function getCoordinates(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?&address=${address}&key=${GOOGLE_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }

  const data = await response.json();
  const location = data.results[0].geometry.location;
  return location;
}
