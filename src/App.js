import React from 'react';
import * as yup from 'yup';
import { Formik, Field, Form, useField, FieldArray } from 'formik';
import { TextField,Button, Checkbox,Radio,FormControlLabel,MenuItem,Select } from '@material-ui/core';
import './App.css';

const MyRadio = ({label, ...props}) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} label={label} control={<Radio/>} />
}

const MyTextField = (props) => {
  const [field,meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return <TextField {...field} helperText={errorText} error={!!errorText}/>
}
const validationSchema1 = yup.object({
  firstName: yup.string().required().max(10)
});
function App() {
  return (
    <div>
     <Formik initialValues={{firstName: 'Fuku',
     lastName:'Mehrotra',
     gender: [],
     yogurt:'',
    pets:[{type:'cat',name:'',id:"" +Math.random()}]}} validationSchema={validationSchema1} onSubmit={(data,{setSubmitting}) => {
       setSubmitting(true);
       console.log(data);
       setSubmitting(false);
     }}>
       {({values,isSubmitting})=> (
         <Form>
           <MyTextField name='firstName' placeholder="FirstName" />
           <Field name='firstName' placeholder="FirstName" type='input'as={TextField}/>
          <div>
            <Field name='lastName' placeholder="LastName" type='input' as={TextField} />
          </div>
          <div>Gender:</div>
          <Field type='checkbox' name='gender' value="Male" as={Checkbox}/>
          <Field type='checkbox' name='gender' value="Female" as={Checkbox}/>
          <Field type='checkbox' name='gender' value="Trans" as={Checkbox}/>
         <div>Yogurt:</div>
         <MyRadio type='radio' name='yogurt' value='apple' label='Apple' as={Radio} />
         <MyRadio type='radio' name='yogurt' value='Grapes' label="Grapes"  as={Radio} />
         <MyRadio type='radio' name='yogurt' value='Strawberry' label="Strawberry" as={Radio}  />
         <FieldArray name='pets'>
           {(arrayHelper) => (
              <div>
                {values.pets.map((pet,index) => {
                  return (<div key={pet.id}>
                    <MyTextField placeholder='pet name' name={`pets.${index}.name`}/>
                    <Field name={`pets.${index}.name`} type='select' as={Select}>
                      <MenuItem value='cat'>Cat</MenuItem>
                      <MenuItem value='dog'>Dog</MenuItem>
                      <MenuItem value='frog'>Frog</MenuItem>
                    </Field>
                    
                    </div>
                )})}
              </div>
           )}
         </FieldArray>
         <div>
           
           <Button disabled={isSubmitting} type="submit">Submit</Button></div>
         <pre>{JSON.stringify(values,null,2)}</pre>
         </Form>
       )}
     </Formik>
    </div>
  );
}

export default App;
