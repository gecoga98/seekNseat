import axios from 'axios';

export const getBookings = async (businessId: string, token: string) => {
  try {
    return await axios.get(
      `http://localhost:3333/api/bookings?businessId=` + businessId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
