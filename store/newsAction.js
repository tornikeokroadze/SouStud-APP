import axios from "axios";
import { loadingRequest, responseData } from "./newsSlice";

const API_URL = "https://www.sou.edu.ge/newsapp.php";

export const news = () => async (dispatch) => {
  try {
    dispatch(loadingRequest());
    const response = await axios.get(API_URL);

    const newsData = response.data.map((item) => ({
      id: item.id,
      title: item.title,
      text: item.text,
      date: item.date,
      image: item.image,
    }));

    dispatch(responseData({ newsData }));
  } catch (error) {
    return;
  }
};
