import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "../../../../components/table/table";
import { contactsAction } from "../../../api/actions/contacts/contactsAction";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import CreateModal from "../../../../components/modals/create_contact";
import FileUpload from "../../../../components/file_upload/file_upload";
// import {useParams} from 'react-router-dom';
import BroadcastModal from "../../../../components/modals/broadcast";
import SendIcon from "@mui/icons-material/Send";
import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import { groupsAction } from "../../../api/actions/groups/groupsActions";
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

const Groups = () => {

  const router = useRouter();
  const app_id = router.query.appId;

  const [groups, setGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const getGroups = () => {
    groupsAction({ app_id, limit, page })
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setGroups(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGroups();
    
  }, [ page, limit, app_id]);

  const columns = [
    {
      name: "group_id",
      label: "ID",
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
      },
    },
    {
      name: "name",
      label: "NAME",
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
      name: "created",
      label: "CREATED BY",
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
      name: "contacts",
      label: "CONTACTS",
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
    {
      name: "createdat",
      label: "CREATED AT",
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
                 
                    (new Date(value).toLocaleString('en-US', { timeZone: 'EAT' }, { hour: 'numeric', hour12: true }))
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
    elevation: 0,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    serverSide: true,
    downloadOptions: {
      separator: ",",
      filename: "Groups.csv",
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
    textLabels: {
      body: {
        noMatch: isLoaded ? (
          "Sorry, no matching records exist in Suss"
        ) : (
          <SkeletonLoader/>
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
        downloadCsv: "Download Messages Excel List",
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
        <h2 className="mt-4 text-xl font-semibold">Groups</h2>
        <p className="mb-24 text-gray-700">
          These are all the groups for this organisation
        </p>

        <div className="mt-4">
          <ThemeProvider theme={getMuiTheme()}>
            <Table columns={columns} options={options} data={groups} />
          </ThemeProvider>
        </div>
      </div>
    </MiniDrawer>
  );
};

export default Groups;
