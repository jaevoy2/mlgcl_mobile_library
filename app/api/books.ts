import Constants from 'expo-constants';





















export async function getQrValue(bookId: number) {
  // try {
  //   const res = await fetch(`${API_URL}/${bookId}/qr`);
  //   const data = await res.json();
  //   return data.qr_value;
  // } catch (err) {
  //   console.error('Error fetching QR value:', err);
  //   return null;
  // }
}

export async function getBookData(bookId: number) {
  const extras = Constants.expoConfig?.extra ?? {};

  // const API_URL = extras.API_URL as string;
  const API_URL = 'http://172.20.10.7:8000/api/books/';
  const API_KEY = extras.API_KEY as string;
  const API_ORIGIN = extras.API_ORIGIN as string; 
  
  try {
    const res = await fetch(`${API_URL}${bookId}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': '2|qViPMAVbLC2WhnQWJ3EB6hPGVcQy4AK8t8PYL4uU2ea0a470',
        'Origin': API_ORIGIN,
        'x-api-key': API_KEY 
      }
    });

    // const text = await res.text();
    // console.log(text);

    const data = await res.json();  

    return data;
  } catch (err) {
    console.error('Error fetching book data:', err);
    return null;
  }
}