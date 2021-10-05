import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addDays } from 'date-fns'
import MaterialForm from 'components/form/MaterialForm';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  paper: {
    marginTop: theme.spacing(3),    
    marginBottom: theme.spacing(3),
    
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  }
}));

export default function StepperForm() {
  const classes = useStyles();


//********************************************************************************************************************************* */
//*  Y U P
//********************************************************************************************************************************* */


  const formValidationSchema = yup.object({
    name: yup
      .string('Enter your name')
      .min(2, 'Name should be of minimum 2 characters length')
      .required('Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),    
    phone: yup
      .string('Enter your phone number') 
      .min(17, '10 Digit Phone Number')    
      .required('Phone is required'),    
    startDate: yup
      .date()
      .min(addDays(new Date(), 1))
      .max(addDays(new Date(), 30))
      .required('Date is required'),
    color: yup
      .mixed('Pick a color')      
      .required('Color is required'),
    hasFaxNumber: yup
      .string('Please choose Yes or No')      
      .required('Fax is required'),
    faxNumber: yup    
      .string()        
      .when("hasFaxNumber", {
        is: "Yes",
        then: yup.string().required('Fax number is required if you answered Yes above').min(17, '10 Digit Phone Number')    
      }),
      secondUsername: yup    
      .string('Name is required if request is one behalkf of another person')        
      .when("onBehalfOf", {
        is: "Yes",
        then: yup.string('Name is required if request is one behalkf of another person').required('Name is required if you answered Yes above')
      })      
         

    });

//********************************************************************************************************************************* */
//*  F O R M I K
//********************************************************************************************************************************* */
  
  const formik = useFormik({
    initialValues: {
      name: '',        
      email: '',
      phone: '',      
      startDate: null,
      color: '',
      hasFaxNumber: '',
      faxNumber: ''
    },

    validationSchema: formValidationSchema,    

    onSubmit: values => {     
      handleFormSubmit();
    },
  });



//********************************************************************************************************************************* */
//*  H A N D L E    S U B M I T
//********************************************************************************************************************************* */
  
  const handleFormSubmit = () => {
    var data = {
      Name: formik.values.name,        
      Email: formik.values.email,        
      Phone: formik.values.phone,              
      StartDate: formik.values.startDate,              
      Color: formik.values.color,
      HasFaxNumber: formik.values.hasFaxNumber,              
      FaxNumber: formik.values.faxNumber,              
         
    }    
    alert(JSON.stringify(data, null, 2));
  }


//********************************************************************************************************************************* */
//*  R E N D E R   F O R M
//********************************************************************************************************************************* */

  return (
    <React.Fragment>      
      <Grid container spacing={1}>
        <Grid item xs={12} lg={3} xl={4}></Grid>
        <Grid item xs={12} lg={6} xl={4}>
          <Paper className={classes.paper}>
            <form noValidate autoComplete="off">
                <MaterialForm formik={formik}/>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={3} xl={4}></Grid>
      </Grid>          
    </React.Fragment>
  );
}
