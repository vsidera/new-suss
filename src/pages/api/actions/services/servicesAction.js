import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export async function servicesAction(formValues) {
    const servicesUrl = `${apiUrl.LIST_SERVICES}/${formValues.app_id}/list?page=${formValues.page}&limit=${formValues.limit}`;
    try{
    const config = await authHeaders();
  
    return axios
      .get(servicesUrl, config)
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

  export async function serviceCreate(formValues) {
    const appCreateUrl = `${apiUrl.CREATE_SERVICE}/${formValues.app_id}/create`;
    try{
    const config = await authHeaders();
  
    return axios
      .post(appCreateUrl, formValues.newService, config)
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

  export async function appServicesAction(formValues) {
    const appServicesUrl = apiUrl.APP_SERVICES;
    try{
    const config = await authHeaders();
    console.log("GETS HERE NOW!!!!!!!!!")
    return axios
      .get(appServicesUrl, config, formValues)
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

  export async function serviceAttach(formValues) {
    const attachUrl = `${apiUrl.SERVICE_ATTACH}/${formValues.appId}/service/${formValues.service_id}`;
    try{
    const config = await authHeaders();
  
    return axios
      .post(attachUrl, formValues, config)
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

  export async function serviceSearch(formValues) {
    const searchUrl = `${apiUrl.SERVICE_SEARCH}/${formValues.app_id}/search?name=${formValues.search}`;
    try{
    const config =await authHeaders();
  
    return axios
      .get(searchUrl, config)
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

