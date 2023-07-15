import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "../../../../components/table/table";
import { contactsAction } from "../../../api/actions/contacts/contactsAction";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from '@mui/icons-material/Upload';
import CreateModal from "../../../../components/modals/create_contact";
import FileUpload from "../../../../components/file_upload/file_upload";
// import {useParams} from 'react-router-dom';
import BroadcastModal from "../../../../components/modals/broadcast";
import SendIcon from '@mui/icons-material/Send';
import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import { useRouter } from "next/router";
import SkeletonLoader from "../../../../components/utils/skeleton";

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#FFFFFF",
            fontFamily: "Ubuntu",
            fontWeight: "inherit",
          },
          footer: {
            border: 0,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            // fontFamily: 'Ubuntu',
            color: "black",
            justifyContent: "center",
            // fontWeight: 'bold',
          },
        },
      },

      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            backgroundColor: "#5f6062",
            color: "wh",
          },
        },
      },

      MUIDataTable: {
        styleOverrides: {
          responsiveBase: {
            position: "relative",
            height: "auto",
            borderRadius: "18px",
            border: "1px solid #f2f2f2",
            boxShadow: "0 0 6px 4px #efefef",
          },
        },
      },
      MUIDataTablePagination: {
        styleOverrides: {
          navContainer: {
            border: 0,
            boxShadow: "0 ",
          },
        },
      },
     
    },
  });


const Contacts = () => {
  const router = useRouter();
  const app_id = router.query.appId;

  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [upload, setUpload] = useState(false);
  const [broadcastModal, setBroadcastModal] = useState(false)

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)

  const [selectedIndices, setSelectedIndices] = useState([])
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);


  const handleBroadcast =() =>{
    setBroadcastModal(true)
    console.log("BROADCASTS")
  }

  console.log("SELECTED PHONES!!!!!!",selectedPhoneNumbers)
  
  const getContacts = () => {

    contactsAction({app_id,limit,page})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setContacts(res.data);
          setIsLoaded(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeCreateModal = (e) => {
    e.preventDefault();
    setCreateModal(false)
  }

  const closeBroadcastModal = (e) => {
    e.preventDefault();
    setBroadcastModal(false)
  }

  const closeUpload = (e) => {
    e.preventDefault();
    setUpload(false)
  }

  useEffect(() => {
    const phoneNumbers = selectedIndices.map((index) => contacts[index].mobile_no);
    setSelectedPhoneNumbers(phoneNumbers);
  }, [selectedIndices, contacts]);


  useEffect(() => {
    getContacts();


  }, [createModal,page,limit, app_id]);

  const columns = [
    {
      name: "attributes.FIRSTNAME",
      label: "FIRST NAME",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            minWidth: "120px",
            maxWidth: "120px",
            backgroundColor: "#094C95",
            color: "white",
            fontSize: "0.9rem",
            lineHeight: 2.0,
          },
        }),
        setCellProps: () => {
  
            return {
              style: {
                fontWeight: 450, // Add the fontWeight property to make the text bold
              },
            };
  
        },
      },
    },
    {
      name: "attributes.LASTNAME",
      label: "LAST NAME",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            minWidth: "120px",
            maxWidth: "120px",
            backgroundColor: "#094C95",
            color: "white",
            fontSize: "0.9rem",
            lineHeight: 2.0,
          },
        }),
        setCellProps: () => {
  
            return {
              style: {
                fontWeight: 450, // Add the fontWeight property to make the text bold
              },
            };
  
        },
      },
    },

    {
      name: "mobile_no",
      label: "MOBILE NO",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            minWidth: "150px",
            maxWidth: "150px",
            backgroundColor: "#094C95",
            color: "white",
            fontSize: "0.9rem",
            lineHeight: 2.0,
          },
        }),
      },
    },
    {
      name: "status_code",
      label: "STATUS",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            minWidth: "120px",
            maxWidth: "120px",
            backgroundColor: "#094C95",
            color: "white",
            fontSize: "0.9rem",
            lineHeight: 2.0,
          },
        }),
        setCellProps: () => {
 
          return {
            style: {
              color: "green", // Add the fontWeight property to make the text bold
            },
          };
  
      },
      },
      
    },
    {
      name: "createdat",
      label: "CREATED",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            minWidth: "120px",
            maxWidth: "120px",
            backgroundColor: "#094C95",
            color: "white",
            fontSize: "0.9rem",
            lineHeight: 2.0,
          },
        }),
      },
      
    },
  ];

  const options = {
    filter: false,
    filterType: 'textField',
    responsive: 'standard',
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: 'Ubuntu',
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: 'auto',
    enableNestedDataAccess: '.',
    elevation: 0,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    serverSide: true,
    downloadOptions: {
      separator: ',',
      filename: 'Contacts.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`.replace(/[^\x00-\x7F]/g, "").toString().trim();
      return val;
    },
   
    textLabels: {
      body: {
        noMatch: isLoaded ? "Sorry, no matching records exist in Suss"
          : <SkeletonLoader/>,
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search A/C Number,Name or Payplans",
        downloadCsv: "Download Messages Excel List",
        print: "Print customers",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      setFilterChipProps: () => {
        return {
          color: 'primary',
          variant: 'outlined',
          className: 'testClass123',
        };
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "record(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Records",
      },
    }
  }


  return (
    <MiniDrawer>
      <BroadcastModal broadcastModal={broadcastModal} closeBroadcastModal={closeBroadcastModal} selectedPhoneNumbers={selectedPhoneNumbers}/>
      <CreateModal createModal={createModal} closeCreateModal={closeCreateModal} app_id={app_id}/>
      <div className="m-16">
      <h2 className='mt-4 text-xl font-semibold'>Contacts</h2>
            <p className='mb-24 text-gray-700'>A list of all contacts</p>
      
      
      <div className="mt-4">
        <ThemeProvider theme={getMuiTheme()}>
          <Table columns={columns} options={options} data={contacts} />
        </ThemeProvider>
      </div>
      </div>
    </MiniDrawer>
  );
};

export default Contacts;
