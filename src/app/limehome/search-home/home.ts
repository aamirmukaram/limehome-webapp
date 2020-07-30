export interface Home {
  id: number;
  location: string;
  name: string;
  price: number;
  currency: string;
  geolocation: GeoLocation;
  imageUrl: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}
