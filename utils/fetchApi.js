import axios from 'axios'

export const baseUrl = "https://bayut.p.rapidapi.com";

// headers: {
//     'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
//     'X-RapidAPI-Key': '93f4578830msh00e598b9a893b2cp1ddb76jsn589b6b15fbd8'
//   }

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
      'X-RapidAPI-Key': '93f4578830msh00e598b9a893b2cp1ddb76jsn589b6b15fbd8'
    }
  });

  return data;
}