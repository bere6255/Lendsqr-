import * as dotenv from "dotenv";
dotenv.config();
import Axios from "axios";
const LENDSQR_BASE_URL = process.env.LENDSQR_BASE_URL;
const LENDSQR_API_KEY = process.env.LENDSQR_API_KEY;

const lendsqrInstance = Axios.create({
	headers: {
		"Accept": 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${LENDSQR_API_KEY}`
	},
	baseURL: `${LENDSQR_BASE_URL}`,
});

const post = async ({ url, payload }: { url: string, payload: any }) => {
	try {
		//try to login to the server 
		const requestRes = await lendsqrInstance.post(url, payload);

		// get the server response 
		return requestRes.data
	} catch (error: any) {
		if (error.response) {
			if (error.response.data) {
				return error.response.data;
			}
			return null;
		} else {
			return null;
		}
	}
}

const get = async ({ url }: { url: string }) => {
	try {
		//try to login to the server 
		const requestRes = await lendsqrInstance.get(url);

		// get the server response 
		return requestRes.data
	} catch (error: any) {
		if (error.response) {
			if (error.response.data) {
				return error.response.data;
			}
			return null;
		} else {
			return null;
		}
	}
}
export { post, get }