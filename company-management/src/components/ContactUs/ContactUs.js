import React, { Fragment, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Stack, Button, TextField, TextareaAutosize } from "@mui/material";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [open, setOpen] = useState(false);
  const [correctEmail, setCorrectEmail] = useState(true);
  const [validCompany, setValidCompany] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validJobTitle, setValidJobTitle] = useState(false);
  const [validInquiry, setValidInquiry] = useState(false);
  const dispatch = useDispatch();
  /* istanbul ignore next*/
  const onEmailChange = (event) => {
    setEmail(event.target.value);
    if (!isValidEmail(event.target.value)) {
      setCorrectEmail(false);
    } else if (event.target.value.length <= 0) {
      setCorrectEmail(false);
    } else {
      setCorrectEmail(true);
    }
    if (!stringPatternValidation(event.target.value)) {
      setValidEmail(false);
    } else if (event.target.value.length >= 0) {
      setValidEmail(true);
    } else {
      setValidEmail(true);
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function stringPatternValidation(stringVal) {
    return /\s/g.test(stringVal);
  }

  const onCompanyChange = (event) => {
    setCompany(event.target.value);
    if (event.target.value.length > 0) {
      setValidCompany(false);
    } else {
      setValidCompany(true);
    }
  };

  const onJobTitleChange = (event) => {
    setJobTitle(event.target.value);
    if (event.target.value.length > 0) {
      setValidJobTitle(false);
    } else {
      setValidJobTitle(true);
    }
  };

  const onInquiryChange = (event) => {
    setInquiry(event.target.value);
    if (event.target.value.length > 0) {
      setValidInquiry(false);
    } else {
      setValidInquiry(true);
    }
  };

  const onEmailBlur = () => {
    if (email.length <= 0) {
      setValidEmail(true);
      setCorrectEmail(true);
    }
  };

  const onCompanyBlur = () => {
    if (company.length <= 0) {
      setValidCompany(true);
    }
  };

  const onJobTitleBlur = () => {
    if (jobTitle.length <= 0) {
      setValidJobTitle(true);
    }
  };

  const onInquiryBlur = () => {
    if (inquiry.length <= 0) {
      setValidInquiry(true);
    }
  };

  const openConfirmationDialogHandler = () => {
    setOpen(true);
  };
  /* istanbul ignore next */
  const confirmSubmitActionHandler = async () => {
    const formData = {
      Email: email,
      Company: company,
      jobTitle: jobTitle,
      Inquiry: inquiry,
    };
    console.log(formData);
    dispatch(showToast({ severitySnackbar: "success", message: "Submitted!" }));
    setEmail("");
    setCompany("");
    setJobTitle("");
    setInquiry("");
  };
  const closeFormActionHandler = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Container
        sx={{ 
          display: "flex", 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: 'calc(100vh - 140px)', // Subtract header height
          padding: '1.5rem 0'
        }}
        disableGutters={true}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
            filter: "blur(12px)",
            objectFit: "cover",
            backgroundImage: "url('https://accelerator.nashtechglobal.com/images/home/form-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1
          }}
        />

        <Box
          sx={{
            margin: '10px',
            display: 'flex',
            width: "90%",
            maxWidth: "1200px",
            height: 'auto',
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(25px)",
            padding: "2rem",
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <Box sx={{ width: '60%', padding: '0 1rem' }}>
            <Typography
              variant="h3"
              sx={{ 
                textAlign: 'center',
                background: 'linear-gradient(270deg, #310e68 0%, #4a0d55 40%, #5f0f40 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 500,
                marginBottom: '1rem'
              }}
            >
              Contact Us
            </Typography>
            <hr style={{ borderColor: 'rgba(49, 14, 104, 0.1)' }} />
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '16px',
                color: '#4a0d55',
                marginBottom: '1rem'
              }}
            >
              Want to take a demo or you have any query, don't worry we will help you, write us below and we will contact you as soon as we receive your request.
            </Typography>
            <hr style={{ borderColor: 'rgba(49, 14, 104, 0.1)' }} />
            
            <div className="d-flex flex-row justify-content-between">
              <TextField 
                variant="outlined"
                type="email"
                value={email}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
                label="Your Email Address"
                sx={{ 
                  marginTop: "1.5rem", 
                  width: '49%',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#4a0d55',
                    },
                  }
                }}
                onInput={onEmailChange}
                onBlur={onEmailBlur}
                error={validEmail}
                helperText={validEmail && "Please enter valid email"}
              />

              <TextField 
                variant="outlined"
                type="text"
                required={true}
                error={validJobTitle}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
                value={jobTitle}
                label="Your Job Title"
                sx={{ 
                  marginTop: "1.5rem", 
                  width: '49%',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#4a0d55',
                    },
                  }
                }}
                onInput={onJobTitleChange}
                onBlur={onJobTitleBlur}
                aria-errormessage="Please enter your job title"
                helperText={validJobTitle && "Please enter your job title"}
              />
            </div>

            <TextField 
              variant="outlined"
              type="text"
              required={true}
              InputLabelProps={{
                style: { color: "#000000" },
                shrink: true,
              }}
              value={company}
              error={validCompany}
              aria-errormessage="Please enter your company name"
              helperText={validCompany && "Please enter your company name"}
              label="Your Company"
              sx={{ 
                marginTop: "1.5rem", 
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a0d55',
                  },
                }
              }}
              onInput={onCompanyChange}
              onBlur={onCompanyBlur}
            />

            <TextField
              variant="outlined"
              type="text"
              required={true}
              InputLabelProps={{
                style: { color: "#000000" },
                shrink: true,
              }}
              error={validInquiry}
              aria-errormessage="Please enter your Message"
              helperText={validInquiry && "Please enter your Message"}
              value={inquiry}
              rows={10}
              multiline
              label="Message"
              sx={{ 
                marginTop: "1.5rem", 
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a0d55',
                  },
                }
              }}
              onInput={onInquiryChange}
              onBlur={onInquiryBlur}
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 3,
                justifyContent: "space-between",
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  width: "80%", 
                  color: "#4a0d55", 
                  fontSize: "16px", 
                  fontStyle: 'italic' 
                }}
              >
                Your information is protected by NashTech Policy.
              </Typography>
              <Button
                variant="contained"
                onClick={openConfirmationDialogHandler}
                disabled={
                  !company ||
                  !email ||
                  !jobTitle ||
                  !inquiry ||
                  validEmail ||
                  validCompany ||
                  validInquiry ||
                  validJobTitle ||
                  !correctEmail
                }
                sx={{
                  color: "white !important",
                  background: 'linear-gradient(316deg,#310e68 0%,#4a0d55 40%,#5f0f40 80%)',
                  fontWeight: "500",
                  padding: '8px 23px',
                  letterSpacing: '0.7px',
                  transition: 'transform 0.3s, background-color 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    background: 'linear-gradient(300deg,#5f0f40 0%,#4a0d55 50%, #310e68 90%)',
                    color: 'white !important'
                  },
                  '&:disabled': {
                    opacity: 0.7,
                    cursor: 'not-allowed',
                    color: 'white !important'
                  }
                }}
              >
                Submit
              </Button>
            </Stack>
            {open && (
              <ConfirmationDialog
                title={"Are You Sure"}
                body={"You want to Submit this?"}
                open={open}
                onConfirmAction={confirmSubmitActionHandler}
                onCancelAction={closeFormActionHandler}
                cancelLabel={"Cancel"}
                confirmLabel={"Confirm"}
              />
            )}
          </Box>
          <Box 
            sx={{ 
              width: '40%',
              borderLeft: '1px solid rgba(49, 14, 104, 0.1)',
              marginLeft: '1rem',
              paddingLeft: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'url(https://www.nashtechglobal.com/wp-content/uploads/2024/06/form_bg.png)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderRadius: '8px'
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white',
                textAlign: 'center',
                fontSize: '30px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& strong': {
                  fontSize: '36px',
                  marginTop: '0.5rem'
                }
              }}
            >
              <span>Let's Make Difference</span>
              <strong>TOGETHER</strong>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default ContactUs;
