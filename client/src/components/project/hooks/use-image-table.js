/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

export const useImageTable = ({ projectId, imageData }) => {
    const rowsPerPage = 5;
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created');
    const [page, setPage] = useState(0);
    const [isInSelection, setIsInSelection] = useState(false);
    const [selected, setSelected] = useState([]);
    const [collapsedRowId, setCollapsedRowId] = useState(-1);

    const desc = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      
      return 0;
    }

    const getSorting = (order, orderBy) => {
      return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }
      
    const stableSort = (array, cmp) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
    
      return stabilizedThis.map(el => el[0]);
    };

    const imagesPerPage = () => {
      return stableSort(imageData.images, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    }

    const handleRequestedSort = (property) => {
        setCollapsedRowId(-1);
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    const handleSelect = (name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length -1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    const isSelected = name => selected.indexOf(name) !== -1;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = imageData.images.map(n => n.id);
            setSelected(newSelecteds);
          
            return;
        }
        setSelected([]);
    };

    const handleTableRowClick = (id) => {
        if (!isInSelection) {
          collapsedRowId === id ? setCollapsedRowId(-1) : setCollapsedRowId(id);
        }
    }

    const handleInSelection = () => {
      if (isInSelection) setSelected([]);
      setIsInSelection(state => !state);
    }

    const handleDeleteSelected = async() => {
      // delete job, and then image
      console.log(selected);
      selected.forEach(imageInstanceId => {
        imageData.handleDeleteImage(imageInstanceId);
      })
      handleInSelection();
    }

    const isMatchCollapsedRow = (imageInstanceId) => {
      return (collapsedRowId === imageInstanceId);
    }

    return {
        rowsPerPage,
        order,
        orderBy,
        page, 
        isInSelection,
        selected,
        collapsedRowId,
        handleChangePage,
        handleRequestedSort,
        handleSelect,
        handleSelectAllClick,
        handleTableRowClick,
        stableSort,
        isSelected,
        // countProcessStatus,
        // getImage,
        // countImages,
        imagesPerPage,
        handleInSelection,
        handleDeleteSelected,
        isMatchCollapsedRow,
        // getMatchJobs
    }

}