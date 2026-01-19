import { Box, Button, Card, Dialog, Stack, TextField, Typography } from "@mui/material"
import { useState, useRef, useEffect} from "react"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import React from "react"
// import { myTextbox } from "../../../../library/my-textBox/src/my-textbox"

const AddDialog = ({ openAdd, handleAddClose, getInfo, onAddQuestionComplete }) => {
    const [inputName, setName] = useState("")
    const [inputCode, setCode] = useState("")
    const [inputEmail, setEmail] = useState("")
    const [open, setOpen] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(true);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const openConfirmationDialogHandler = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    const onCodeChange = (event) => {
        setCode(event.target.value)
        if (event.target.value.length > 0) {
            setValidCode(false)
        }
        else {
            setValidCode(true)
        }
    }
    const onNameChange = (event) => {
        setName(event.target.value)
        if (event.target.value.length > 0) {
            setValidName(false)
        }
        else {
            setValidName(true)
        }
    }
    const onEmailChange = (event) => {
        setEmail(event.target.value)
        if (!isValidEmail(event.target.value)) {
            setCorrectEmail(false)
        }
        else if (event.target.value.length <= 0) {
            setCorrectEmail(false)
        }
        else {
            setCorrectEmail(true)
        }
        if (!stringPatternValidation(event.target.value)) {
            setValidEmail(false)
        } else if (event.target.value.length >= 0) {
            setValidEmail(true)
        }
        else {
            setValidEmail(true)
        }

    }
    function onBlurNameHandler() {
        if (inputName.length <= 0) {
            setValidName(true);
        }
    }
    function onBlurCodeHandler() {
        if (inputCode.length <= 0) {
            setValidCode(true);
        }
    }
    function onBlurEmailHandler() {
        if (inputEmail.length <= 0) {
            setValidEmail(true);
            setCorrectEmail(true);
        }
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function stringPatternValidation(stringVal) {
        return /\s/g.test(stringVal);
    };
    const confirmAddActionHandler = async () => {
        const newData = { studio_code: inputCode, studio_name: inputName, studioAdmin_email: inputEmail };
        await fetch("https://microfeapi.azurewebsites.net/studios/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(newData)
        }).then((response) => { onAddQuestionComplete(response) })
        getInfo()
        handleAddClose();
    };
    const closeDeleteActionHandler = () => {
        setOpen(false);
        setOpenSnackbar(false);
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
                        color="info"
                        fontWeight="medium"
                        alignItems="center"
                        alignContent="center"
                        sx={{ width: "90%", fontWeight: 'bold'}}
                    >
                        Add Studio
                    </Typography>
                    <ntg-textbox
                        label="Studio Name"
                        style = {{ marginTop: "1.5rem" }}
                        value={inputName}
                        onInput={onNameChange}
                        onBlur={onBlurNameHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validName && "Please enter studio name"}
                    </Typography>
                    <ntg-textbox
                        label="Studio Code"
                        style ={{ marginTop: "1.5rem" }}
                        value={inputCode}
                        onInput={onCodeChange}
                        onBlur={onBlurCodeHandler}

                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validCode && "Please enter studio Code"}
                    </Typography>
                    <ntg-textbox
                        label="Studio Email"
                        style ={{ marginTop: "1.5rem" }}
                        onInput={onEmailChange}
                        onBlur={onBlurEmailHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validEmail && "Please enter studio email"}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {!correctEmail && "Please enter valid studio email"}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 3 }}
                    >
                        <Button
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            disabled={!inputName || !inputCode || !inputEmail || validEmail || !correctEmail}
                            sx={{
                                backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                              }}
                        >
                            Submit
                        </Button>
                        <nash-button transform='uppercase' type="raised" color="#F5F6F8" onClick={handleAddClose}>Cancel</nash-button>
                    </Stack>
                    {open && <ConfirmationDialog title={"Are You Sure"} body={"You want to Add this?"} open={open} onConfirmAction={confirmAddActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={"Cancel"} confirmLabel={"Confirm"} />}
                </Box>
            </Card>
        </Dialog>
    )

}

export default AddDialog