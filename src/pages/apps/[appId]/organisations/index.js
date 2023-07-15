import { useEffect, useState } from "react";
// import "./styles.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../../../components/table/table"
import { appsAction } from "../../../../pages/api/actions/applications/appsActions";
import CreateAppModal from "../../../../components/modals/create_app";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AttachServiceModal from "../../../../components/modals/attach_service";
import AttachUserModal from "../../../../components/modals/attach_user";
// import {useParams} from 'react-router-dom';
import MiniDrawer2 from "../../../../components/adminSidebar2/adminSidebar2";
import AddLinkIcon from '@mui/icons-material/AddLink';
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
const Organisations = () => {

  const router = useRouter();
  const app_id = router.query.appId;

  const [apps, setApps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [createAppModal, setCreateAppModal] = useState(false);
  const [attachServiceModal, setAttachServiceModal] = useState(false);
  const [attachUserModal, setAttachUserModal] = useState(false);
  const [appId, setAppId] = useState(null)

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10)

  const closeCreateAppModal = (e) => {
    e.preventDefault();
    setCreateAppModal(false)
  }


  const closeAttachUserModal = (e) => {
    e.preventDefault();
    setAttachUserModal(false)

  }

  const closeAttachServiceModal = (e) => {
    e.preventDefault();

    setAttachServiceModal(false)
  }

  const handleClick2 = (code) => {
    setAppId(code)
    setAttachServiceModal(true)
  }

  const handleClick1 = (code) => {
   
    setAppId(code)
    setAttachUserModal(true)
  }


  const getApps = () => {
    appsAction({page,limit,app_id})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setApps(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApps();
  }, [createAppModal,page,limit, app_id]);

  const columns = [
   
    {
     name: "name",
     label: "NAME",
     options: {
      filter: true,
      sort: false,
      setCellHeaderProps: () => ({
        style: {
          minWidth: "180px",
          maxWidth: "180px",
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
     name: "email",
     label: "EMAIL",
     options: {
      filter: true,
      sort: false,
      setCellHeaderProps: () => ({
        style: {
          minWidth: "180px",
          maxWidth: "180px",
          backgroundColor: "#094C95",
          color: "white",
          fontSize: "0.9rem",
          lineHeight: 2.0,
        },
      }),
     }
    },
 
    {
     name: "country_code",
     label: "COUNTRY",
     options: {
      filter: true,
      sort: false,
      setCellHeaderProps: () => ({
        style: {
          minWidth: "100px",
          maxWidth: "100px",
          backgroundColor: "#094C95",
          color: "white",
          fontSize: "0.9rem",
          lineHeight: 2.0,
        },
      }),
     }
    },
    {
      name: "code",
      label: "CODE",
      options: {
       filter: true,
       sort: false,
       setCellHeaderProps: () => ({
        style: {
          minWidth: "100px",
          maxWidth: "100px",
          backgroundColor: "#094C95",
          color: "white",
          fontSize: "0.9rem",
          lineHeight: 2.0,
        },
      }),
      }
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
      }
     },
    {
      name: "",
      label: "Attach Service",
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
       customBodyRender: (tableMeta, dataIndex, rowIndex) => {
        return (
          <button onClick={() => handleClick2(dataIndex.rowData[4])}>
          <AddLinkIcon />
          </button>
        );
      }
      }
     },
     {
      name: "",
      label: "Attach User",
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
       customBodyRender: (tableMeta, dataIndex, rowIndex) => {
        
        return (
          <button onClick={() => handleClick1(dataIndex.rowData[4])}>
          <PersonAddIcon />
          </button>
        );
      }
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
    serverSide:true,
    elevation: 0,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ',',
      filename: 'Organisations.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onTableChange: (action, tableState) => {
      console.log("ACTION IS !!!!", action);
      if (action === "changePage") {

        setIsLoaded(false);
        setPage(tableState.page+1);

      } else if (action === "changeRowsPerPage") {
        console.log("action not handled.", tableState);
        setIsLoaded(false);
        setLimit(tableState.rowsPerPage);
      }
      else {
        console.log("action not handled.");
      }
    },
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
        downloadCsv: "Download Organisation Excel List",
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


<MiniDrawer2>
<CreateAppModal createAppModal={createAppModal} closeCreateAppModal={closeCreateAppModal}/>
    <AttachServiceModal attachServiceModal={attachServiceModal} closeAttachServiceModal={closeAttachServiceModal} app_id={app_id} appId={appId}/>
    <AttachUserModal attachUserModal={attachUserModal} closeAttachUserModal={closeAttachUserModal} app_id={app_id} appId={appId}/>
     
<div className="m-16">
<h2 className='mt-4 text-xl font-semibold'>All Organisations</h2>
    <h4 className="text-gray-700">A list of all the Organisations </h4>

  <div className="mt-4">
    <ThemeProvider theme={getMuiTheme()}>
      <Table columns={columns} options={options} data={apps} />
    </ThemeProvider>
  </div>
</div>
</MiniDrawer2>
  );
};

export default Organisations;
