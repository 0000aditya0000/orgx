import React, { useState, useEffect } from 'react';
import { Box, Card, Dialog, Typography, Button, Stack,} from "@mui/material"
import cardDatas from "./cardData.json"

const AddPractice = ({ openAdd, handleAddClose }) => {
    
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [head, setPracticeHead] = useState('');
    const [data, setData] = useState([]);
    const [employeeName, setEmployeeName] = useState([])

    useEffect(() => {
        setData(cardDatas); // Set the data from the imported JSON file
        // getEmployee();
    }, []);

   
    const handleSubmit = () => {

        const practiceData = {
            id: data.length + 1,
            title,
            description,
            head,
            totalEmployee: 30
        };
        console.log(practiceData, "practice")
        setData([...data, practiceData]);
        // Clear form fields
        setTitle('');
        setDescription('');
        setPracticeHead('');
        handleAddClose();
    };
    return (
        <Dialog open={openAdd} fullWidth onClose={handleAddClose} sx={{ borderRadius: "0" }}>
            <Card
                sx={{
                    borderRadius: "0",
                    px: 1,
                    pt: 1,
                    backgroundColor: "#DDE6ED",
                    color: "#27374D"
                }}
            >
                <Box pt={3} pb={3} px={3}>
                    <Typography
                        variant="h4"
                        fontWeight="medium"
                        alignItems="center"
                        alignContent="center"
                        sx={{ width: "100%", fontWeight: 'bold' }}
                    >
                        Add Practice
                    </Typography>
                    {/* <ntg-textbox
                        label="Title"
                        style={{ marginTop: "1.5rem" }}
                        onInput={(e) => setTitle(e.target.value)}
                    />
                    <ntg-textbox
                        label="Description"
                        style={{ marginTop: "1.5rem" }}
                        onInput={(e) => setDescription(e.target.value)}
                    /> */}
                    {/* <Box sx={{ minWidth: 120, mt: "1.5rem" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Practice Head</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Practice Head"
                                value={head}
                                onChange={(e) => setPracticeHead(e.target.value)}
                            >
                                {employeeNameList.map((item) =>  <MenuItem key={item.employee_id} value={item.employee_name}>{item.employee_name}</MenuItem> )}
                            </Select>
                        </FormControl>
                    </Box> */}
                    {/* <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 3 }}
                    >
                        <Button
                            variant="contained"
                            color="#d60016"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <nash-button transform='uppercase' type="raised" color="primary" onClick={handleAddClose}>Cancel</nash-button>
                    </Stack> */}
                </Box>
            </Card>
        </Dialog>
    );
};

export default AddPractice;