import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export async function messagesAction(formValues) {
    // const messagesUrl = apiUrl.LIST_MESSAGES;
    const messagesUrl = `${apiUrl.LIST_MESSAGES}/${formValues.app_id}/list?page=${formValues.page}&limit=${formValues.limit}`;
    try{
    const config = await authHeaders();
  
    return axios
      .get(messagesUrl, config)
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


  export async function broadcastMessages(formValues) {
    const broadcastUrl = `${apiUrl.BROADCAST_MESSAGE}/${formValues.selectedSenderId}/broadcast/send`;
    try{
    const config = await authHeaders();
  
    return axios
      .post(broadcastUrl, formValues.newSms, config)
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

  export async function sendSms(formValues) {
    const sendSms = `${apiUrl.SEND_SMS}/${formValues.selectedSenderId}/user/send`;
    try{
    const config =await  authHeaders();
  
    return axios
      .post(sendSms, formValues.newSms, config)
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

  export async function bulkSendMessages(formValues) {
    const bulkSendUrl = apiUrl.BULK_SEND_DLRS;
    try{
    const config = await authHeaders();
  
    return axios
      .get(bulkSendUrl, config, formValues)
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

  export async function stimulateCallback(formValues) {
    const simulateCallbackUrl = apiUrl.SIMULATE_CALLBACK;
    try{
    const config =await  authHeaders();
  
    return axios
      .get(simulateCallbackUrl, config, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
    } catch (error) {
      if (error.response) {
        return {
          errors: {
            _error: 'The contacts could not be returned.',
          },
        };
      }
      return {
        errors: {
          _error: 'Network error. Please try again.',
        },
      };
    }
  }