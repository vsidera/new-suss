import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function contactsAction(formValues) {
    console.log("FORMVALUES ARE!!!!!!!88!!!!!!",formValues)
    const contactsUrl = `${apiUrl.LIST_CONTACTS}/${formValues.app_id}/list?page=${formValues.page}&limit=${formValues.limit}`;
    const config = authHeaders();
  
    return axios
      .get(contactsUrl, config)
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

export function contactCreate(formValues) {
    
    const contactCreateUrl = `${apiUrl.CREATE_CONTACT}/${formValues.app_id}/create`;
    const config = authHeaders();
  
    return axios
      .post(contactCreateUrl, formValues.newContact, config)
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

  export function contactsUpload(formValues) {
    const uploadContactsUrl = `${apiUrl.UPLOAD_CONTACTS}/${formValues.app_id}/bulk/upload/contact/${formValues.selectedGroup}`;
    const selectedFile = formValues.contacts;
  
    const headers = {
      ...authHeaders().headers, // Extract the headers from authHeaders() object
    };

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
      .catch((error) => {
        console.log("Error:", error);
        return {
          errors: {
            _error: "Network error. Please try again.",
          },
        };
      });
  }
  
  
  