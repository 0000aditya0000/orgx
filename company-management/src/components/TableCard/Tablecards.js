import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const TableCards = ({ rows, columns }) => {
    const [tableColumn, setTableColumns] = useState([]);
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        if (!expand) {
            setTableColumns(columns.slice(0, 2))
        } else {
            setTableColumns(columns);
        }
    }, [expand]);

    const onToggleCard = () => {
        setExpand(!expand)
    }

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: '11px', backgroundColor: '#fafafa' }}>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        {tableColumn.map((c) => {
                            if (c.id !== 'actions') {
                                return <Box key={c.id} sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", lineHeight: '34px' }}>

                                    <Typography variant="h6" sx={{ paddingLeft: "1rem", color: 'black' }}> {c.label}:</Typography>
                                    <Typography variant="body" sx={{ paddingLeft: "0.5rem", color: 'black', fontSize: '1rem' }}> {rows[c.id]} </Typography>
                                </Box>
                            }
                        })}
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignContent: "stretch",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    justifyItems: "end",
                    position: 'absolute',
                    right: '30px'
                }}>
                    <Box sx={{ paddingRight: "1.8rem" }} >
                        {expand ? <ExpandLessIcon sx={{ color: "black" }} onClick={onToggleCard} /> : <ExpandMoreIcon sx={{ color: "black" }} onClick={onToggleCard} />}
                    </Box>
                    {expand ? <Box sx={{
                        width: "4.75rem", marginBottom: '1.5rem', marginTop: '-2rem', color: 'black', top: "91px",
                        position: "absolute",
                        left: "-21px"
                    }} >
                        {tableColumn.map((c) => {
                            if (c.id === 'actions') {
                                return <Box key={c.id}>
                                    <div style={{ boxShadow: '0px' }}> {rows[c.id]}</div><Typography variant="subtitle2"
                                    sx={{
                                        left: "20px",
                                        position: "absolute",
                                        marginTop: "9px", color: "black"
                                    }}>Edit</Typography></Box>
                            }
                        })}
                    </Box> : null}
                </Box>
            </Box>
            <Divider sx={{ color: 'black' }} />
        </React.Fragment>
    )
}

export default TableCards;