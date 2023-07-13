import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../../../components/table/table"
import RegisterUserModal from "../../../../components/modals/register_user";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MiniDrawer2 from "../../../../components/adminSidebar2/adminSidebar2";
import { usersAction } from "../../../api/actions/users/usersAction";
import { useRouter } from "next/router";

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

const Users = () => {

  const router = useRouter();
  const app_id = router.query.appId;

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getUsers = () => {
    usersAction({ app_id, limit, page })
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
    setIsLoaded(true);
  }, [ page, limit]);

  const columns = [
    {
     name: "firstname",
     label: "NAME",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "lastname",
      label: "NAME",
      options: {
       filter: true,
       sort: false,
      }
     },
    {
     name: "email",
     label: "EMAIL",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "status",
     label: "Status",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "type",
     label: "TYPE",
     options: {
      filter: true,
      sort: false,
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
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ',',
      filename: 'Customers Summary.csv',
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
          : <div >
            ......
          </div>,
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
        downloadCsv: "Download User Excel List",
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
    
    <div className="m-16">
    <h2 className='mt-4 text-xl font-semibold'>Users</h2>
    <h4 className="text-md text-gray-800 font-serif">A list of all users of the system </h4>

    <div className="mt-4">
      <ThemeProvider theme={getMuiTheme()}>

        <Table columns={columns} options={options} data={users} />
      </ThemeProvider>
    </div>
    </div>
    </MiniDrawer2>
  );
};

export default Users;
