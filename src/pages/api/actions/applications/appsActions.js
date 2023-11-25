import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../../api/utils/headers/headers';

export async function appsAction(formValues) {
    const appsUrl = `${apiUrl.LIST_APPLICATIONS}/${formValues.app_id}/list?page=${formValues.page}&limit=${formValues.limit}`;


    try {
    const config = await authHeaders();
    return axios
      .get(appsUrl, config, formValues)
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
  
  export async function userApps() {
    const appsUrl = `${apiUrl.USER_APPS}`;
    console.log("THE URL IS!!!!!!!", appsUrl);
  
    try {
      const config = await authHeaders();
      console.log("THE CONFIG IS !!!!!!!", config);
  
      const res = await axios.get(appsUrl, config);
  
      if (res.data && res.status === 200) {
        console.log("THE RESPONSE IS !!!!!!!", res);
      }
  
      return res;
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

  export async function appCreate(formValues) {
    const appCreateUrl = apiUrl.CREATE_APP;

    try {
    const config = await authHeaders();
  
    return axios
      .post(appCreateUrl, formValues, config)
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