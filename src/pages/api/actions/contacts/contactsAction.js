import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export async function contactsAction(formValues) {
    console.log("FORMVALUES ARE!!!!!!!88!!!!!!",formValues)
    const contactsUrl = `${apiUrl.LIST_CONTACTS}/${formValues.app_id}/list?page=${formValues.page}&limit=${formValues.limit}`;

    try {
    const config =await authHeaders();
  
    return axios
      .get(contactsUrl, config)
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

export async function contactCreate(formValues) {
    
    const contactCreateUrl = `${apiUrl.CREATE_CONTACT}/${formValues.app_id}/create`;

    try {
    const config = await authHeaders();
  
    return axios
      .post(contactCreateUrl, formValues.newContact, config)
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

  export async function contactsUpload(formValues) {
    const uploadContactsUrl = `${apiUrl.UPLOAD_CONTACTS}/${formValues.app_id}/bulk/upload/contact/${formValues.selectedGroup}`;
    try {
    const selectedFile = formValues.contacts;

    const authHeaderObject = await authHeaders(); // Assuming authHeaders() returns a promise
    const headers = authHeaderObject.headers;

  
    // const headers = await {
    //   ...authHeaders().headers, // Extract the headers from authHeaders() object
    // };

    const formData = new FormData();
    formData.append("contacts", selectedFile); // Use the correct key name 'contacts' (as used in the curl request)

  
    return axios.post(uploadContactsUrl, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data", // Set the correct content type for file upload
      },
    })
      .then((res) => {
        console.log("Response:", res.data);
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

  export async function contactsAttach(formValues) {
    const attachUrl = `${apiUrl.CONTACTS_ATTACH}/${formValues.app_id}/attach/contact`;
    try {
    const config = await authHeaders();
  
    return axios
      .post(attachUrl, formValues.data, config)
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
  
  
  