interface Shop {
  coverUrl: string;
  shopTitle: string;
  location: string;
  foodType: string;
  phoneNumber: string;
  opHoursFrom: string;
  opHoursTo: string;
  deliveryFees: string;
  createdAt: string;
  userId: string;
  isOpened: boolean;
  menu: Array<object>;
}

export default Shop;
