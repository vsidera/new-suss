import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../../api/utils/headers/headers';

export async function unitsExpenditure(formValues) {
    const appsUrl = `${apiUrl.UNITS_EXPENDITURE}/${formValues.app_id}`;

    try {
    const config = await authHeaders();
  
    return axios
      .get(appsUrl, config)
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

  export async function deliveryMeter(formValues) {
    const appsUrl = `${apiUrl.DELIVERY_METER}/${formValues.app_id}?start=${formValues.fromUnix}&end=${formValues.toUnix}`;

    try {
    const config = await authHeaders();
  
    return axios
      .get(appsUrl, config)
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