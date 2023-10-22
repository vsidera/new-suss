import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../../../components/table/table"
import { messagesAction } from "../../../../pages/api/actions/messages/messagesAction";

import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import SendSmsModal from "../../../../components/modals/send_sms";
import ScheduleModal from "../../../../components/modals/schedule_sms";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
// import {useParams} from 'react-router-dom';
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

const Messages = () => {

  const router = useRouter();
  const app_id = router.query.appId;

  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [smsModal, setSmsModal] = useState(false)

  const [scheduleModal, setScheduleModal] = useState(false)
  
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10)


  const getMessages = () => {

    messagesAction({app_id,page,limit})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED")
        } else {
          setMessages(res.data)
          setIsLoaded(true)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const closeSendModal = (e) => {
    e.preventDefault();
    setSmsModal(false)
    setScheduleModal(false)
  }

  useEffect(() => {

    getMessages();
  }, [app_id,page, limit]);

  const columns = [
    {
     name: "source",
     label: "SOURCE",
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
     }
    },
    {
     name: "direction",
     label: "DIRECTION",
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
     }
    },
    {
     name: "destination",
     label: "DESTINATION",
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
     }
    },
    {
      name: "content",
      label: "CONTENT",
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
      }
     },
     {
      name: "status_desc",
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
        setCellProps: (value) => {
          if (value === 'SUCCESS') {
            return { value: 'SUCCESS', style: { color: '#36970E' } };
          } else if (value === 'Failed to send sms to provider') {
            return { value: 'FAILED', style: { color: '#970E21' } };
          } else if (value === 'Accepted for processing') {
            return { value: 'PROCESSING', style: { color: '#250E97' } };
          } else {
            return { value: 'FAILED AUTHENTICATION'};
          }
        },
      },
    },
    
    {
      name: "createdat",
      label: "DATE",
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
       customBodyRender: (value) =>
                 
                    (new Date(value).toLocaleString('en-US', { timeZone: 'UTC' }, { hour: 'numeric', hour12: true }))
      }
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
    count: 1000,
    rowsPerPageOptions: [10, 20, 50],
    serverSide: true,
    downloadOptions: {
      separator: ',',
      filename: 'Messages.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    onTableChange: (action, tableState) => {
      if (action === "changePage") {

          setIsLoaded(false);
          setPage(tableState.page + 1);
          
      } else if(action === "changeRowsPerPage") {
          setIsLoaded(false);
          setLimit(tableState.rowsPerPage);
      }
      else {
          console.log("action not handled.");
      }
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
      <div className="m-16">
      <h2 className='mt-4 text-xl font-semibold'>Messages</h2>
            <p className='mb-24 text-gray-700'>A list of messages sent to clients</p>
      <div className="flex justify-end">

      </div>
      <SendSmsModal smsModal={smsModal} closeSendModal={closeSendModal}/>
      <ScheduleModal scheduleModal={scheduleModal} closeSendModal={closeSendModal}/>
      


      <div className="mt-4">
        <ThemeProvider theme={getMuiTheme()}>

          <Table columns={columns} options={options} data={messages} />
        </ThemeProvider>
      </div>
      </div>
      </MiniDrawer>
    )
  }
  
  export default Messages