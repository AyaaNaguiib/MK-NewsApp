import axios from "axios";

const baseUrl="https://newsapi.org/v2";
const apiKey = "44e407194254430b9151b1945e494407";
export function get(url: string){
    const myUrl = `${baseUrl}${url}&apiKey=${apiKey}`;

    return axios.get(myUrl);
}