import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "../../../../components/table/table";
import { appservicesAction } from "../../../api/actions/appservices/appservicesAction";
import MiniDrawer from "../../../../components/sidebar2/sidebar2";
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

const AppServices = () => {
  const router = useRouter();
  const app_id = router.query.appId;

  const [appservices, setAppservices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const selectedChannel = ""

  const getAppServices = () => {

    appservicesAction({app_id, selectedChannel})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setAppservices(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppServices();
  }, [app_id]);

  const columns = [
    {
      name: "sendername",
      label: "Name",
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
      },
    },
    {
      name: "channel",
      label: "Channel",
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
        
      },
    },
    {
      name: "telco",
      label: "Telco",
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
      },
    },
   
    {
      name: "appemail",
      label: "Status",
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
              color: "green", // Add the fontWeight property to make the text bold
            },
          };
  
      },
        customBodyRender: (value) => "ACTIVE"
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "textField",
    responsive: "standard",
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: "Ubuntu",
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: "auto",
    enableNestedDataAccess: ".",
    count: 30,
    elevation: 0,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ",",
      filename: "Org Sender Ids.csv",
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`
        .replace(/[^\x00-\x7F]/g, "")
        .toString()
        .trim();
      return val;
    },

    textLabels: {
      body: {
        noMatch: isLoaded ? (
          "Sorry, no matching records exist in Suss"
        ) : (
          <div>......</div>
        ),
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
        downloadCsv: "Download Sender Ids Excel List",
        print: "Print customers",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      setFilterChipProps: () => {
        return {
          color: "primary",
          variant: "outlined",
          className: "testClass123",
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
    },
  };

  return (
    <MiniDrawer>
      <div className="m-16">
      <h2 className='mt-4 text-xl font-semibold'>Sender Ids</h2>
            <p className='mb-24 text-gray-700'>A list of the organisation's sender Ids</p>
      
      <div className="mt-4">
        <ThemeProvider theme={getMuiTheme()}>
          <Table columns={columns} options={options} data={appservices} />
        </ThemeProvider>
      </div>
      </div>
    </MiniDrawer>
  );
};

export default AppServices;
