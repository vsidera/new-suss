import axios from "axios";
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from "../../utils/headers/headers";

export async function unitsRequest(formValues) {
    const unitsRequestUrl = `${apiUrl.UNITS_REQUEST}/${formValues.app_id}/requests/create`;
    try {
      const config = await authHeaders();
  
      return axios
        .post(unitsRequestUrl, formValues.unitsPayload, config)
        .then((res) => {
          console.log("THE RESPONSE IS !!!!!!!", res);
          return res; // Always return the response
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error response data:", error.response.data);
            console.log("Error response status:", error.response.status);
            // Still return the response even on error
            return error.response;
          }
          return {
            errors: {
              _error: "Network error. Please try again.",
            },
          };
        });
    } catch (error) {
      // Handle other errors like authentication issues
      console.error("Error:", error);
      return {
        errors: {
          _error: "An error occurred. Please try again.",
        },
      };
    }
  }
  
