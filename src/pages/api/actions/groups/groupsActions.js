import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function groupsAction(formValues) {
    console.log("FORMVALUES ARE!!!!!!!88!!!!!!",formValues)
    const groupsUrl = `${apiUrl.LIST_GROUPS}/${formValues.app_id}/list?page=${formValues.page}&limit=${formValues.limit}`;
    const config = authHeaders();
  
    return axios
      .get(groupsUrl, config)
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
              _error: 'The groups could not be returned.',
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

export function groupCreate(formValues) {
    
    const groupCreateUrl = `${apiUrl.CREATE_GROUP}/${formValues.app_id}/create`;
    const config = authHeaders();
  
    return axios
      .post(groupCreateUrl, formValues.newGroup, config)
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
              _error: 'The app could not be created.',
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