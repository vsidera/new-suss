import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function messagesAction(formValues) {
    // const messagesUrl = apiUrl.LIST_MESSAGES;
    const messagesUrl = `${apiUrl.LIST_MESSAGES}/${formValues.app_id}/list?page=${formValues.page}&limit=${formValues.limit}`;
    const config = authHeaders();
  
    return axios
      .get(messagesUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
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
      });
  }


  export function broadcastMessages(formValues) {
    const broadcastUrl = `${apiUrl.BROADCAST_MESSAGE}/${formValues.selectedSenderId}/broadcast/send`;
    const config = authHeaders();
  
    return axios
      .post(broadcastUrl, formValues.newSms, config)
      .then((res) => {
      
        if (res.data && res.status === 202) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
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
      });
  }

  export function sendSms(formValues) {
    const sendSms = `${apiUrl.SEND_SMS}/${formValues.selectedSenderId}/user/send`;
    const config = authHeaders();
  
    return axios
      .post(sendSms, formValues.newSms, config)
      .then((res) => {
      
        if (res.data && res.status === 202) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
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
      });
  }

  export function bulkSendMessages(formValues) {
    const bulkSendUrl = apiUrl.BULK_SEND_DLRS;
    const config = authHeaders();
  
    return axios
      .get(bulkSendUrl, config, formValues)
      .then((res) => {
      
        if (res.data && res.status === 202) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
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
      });
  }

  export function stimulateCallback(formValues) {
    const simulateCallbackUrl = apiUrl.SIMULATE_CALLBACK;
    const config = authHeaders();
  
    return axios
      .get(simulateCallbackUrl, config, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
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
      });
  }