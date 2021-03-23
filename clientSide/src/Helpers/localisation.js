const showPosition = async (pos) => {
  const { latitude, longitude } = pos.coords;
  setLocation({ latitude, longitude });
};
const getLocation = async (err) => {
  if (err.code) {
    try {
      const publicLoction = await pubIP.v4();
      const {
        latitude,
        longitude,
      } = await ipLocation(publicLoction);
      console.log(latitude, longitude);
      setLocation({ latitude, longitude });
      
    } catch (err) {}
  }
};

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, getLocation);
  }
}, [showPosition, getLocation]);











import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import * as Core from "@material-ui/core";
import { Field } from "redux-form";
import Flash from '../commun/flash';
import renderField from '../commun/TextField';
import RadioGroup from '../commun/RadioGroup';
import CreatableSelect from 'react-select/creatable';
// import * as Icons from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  button: {
    background: "linear-gradient(15deg, #11978D 30%, #11878D 70%)",
    justifyContent: "center",
    color: "#FFF",
  },
  form: {
    width: "100%",
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  chose: {
  },
}));
const renderDatepicker = ({ input, label, meta: { touched, error } }
) => (
  <Core.TextField
    {...input}
    type="date"
    label={label}
    error={touched && (error ? true : false)}
    helperText={touched && error}
    InputLabelProps={{
      shrink: true,
    }}
  />
)
const Infos = (props) => {
  const classes = useStyles();
  const { handleSubmit, selectLoading, selectTags, selectError, createTag } = props;
  const handleCreate = (value) => {
    createTag(value);
  }
  const selectField = ({ input, meta: { touched, error } }) => (
    <div>
      <CreatableSelect
        {...input}
        isMulti
        isDisabled={selectLoading}
        isLoading={selectLoading}
        isClearable={false}
        options={selectTags}
        onBlur={() => input.onBlur(input.value)}
        onChange={(value) => { input.onChange(value) }}
        onCreateOption={handleCreate}
      />
      <div>{(touched && error) &&
        <div style={{ 'fontSize': '12px', 'color': 'rgb(244, 67, 54)' }}>{error}</div>}
      </div>
    </div>
  );
  return (
    <>
      <div style={{width:"100%" ,alignItems : "center", justifyContent: "center", float: "center", paddingLeft: "10%", paddingRight: "10%"}}>
        <CssBaseline />
        {selectError && <Flash variant="error" msg={selectError} />}
        <form className={classes.form}>
          <Core.Grid container justify="center" spacing={2}>
            <Core.Grid item xs={12} sm={6}>
              <Field
                name="firstname"
                component={renderField}
                label="Firstname"
                type="text"
                rows='1'
              />
            </Core.Grid>
            <Core.Grid item xs={12} sm={6}>
              <Field
                name="lastname"
                component={renderField}
                label="Lastname"
                type="text"
                rows='1'
              />
            </Core.Grid>
            <Core.Grid item xs={12} sm={6}>
              <Core.FormLabel component="legend">Gender</Core.FormLabel>
              <Core.RadioGroup
              >
                <div>
                  <Field component={RadioGroup} name="gender" required={true} options={[
                    { title: 'Male', value: 'male' },
                    { title: 'Female', value: 'female' }
                  ]}
                  />
                </div>
              </Core.RadioGroup>
            </Core.Grid>
            <Core.Grid item  xs={12} sm={6}>
              <Core.FormLabel component="legend">Matches</Core.FormLabel>
              <Core.RadioGroup
              >
                <div>
                  <Field component={RadioGroup} name="Sexual_orientation" required={true} options={[
                    { title: 'Men ', value: 'men' },
                    { title: 'Women', value: 'women' },
                    { title: 'Both', value: 'both' }
                  ]}
                  />
                </div>
              </Core.RadioGroup>
            </Core.Grid>
            <Core.Grid className={classes.chose} xs={12} sm={6}>
              <Core.FormLabel component="legend">Birthday</Core.FormLabel>
              <Field
                name="birthday"
                component={renderDatepicker}
              />
            </Core.Grid>
            {/* <Core.Grid item xs={5}>
                <Core.FormLabel component="legend">Interests</Core.FormLabel>
                <Field name='interests'/>
              </Core.Grid> */}
            <Core.Grid item xs={12} sm={6}>
              <Core.FormLabel component="legend">Tags</Core.FormLabel>
              <Field name='tags' component={selectField} />
            </Core.Grid>
             <Core.Grid item xs={12}>
              <Core.FormLabel component="legend">Bio</Core.FormLabel>
              <Field
                name="biography"
                component={renderField}
                type="text"
                rows='4'
                variant='outlined'
              />
            </Core.Grid>
            <Core.Grid container direction="row" item xs={12} style={{ marginTop: "1%",alignItems: "center", justifyContent: "center", float: "center" }}>
              <Core.Grid style={{ alignItems: "center", justifyContent: "center", float: "center" }}/>
              <Core.Grid item container style={{ alignItems: "center", justifyContent: "center", float: "center" }} direction="row" item xs={12} xs={1}>
                <Core.Button onClick={handleSubmit} fullWidth variant="contained" type="submit" className={classes.button} name="submit" value="ok" >Next</Core.Button>
              </Core.Grid>
            </Core.Grid>
          </Core.Grid>
        </form>
      </div>
    </>
  );
};
export default Infos;






import infos from '../../components/completeprofile/infos';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import { createTag, step1info } from '../../actions/InfosAction';
import Age from '../../components/commun/age';
const validate = (values) => {
    const errors = {};
    const requiredFields = [
        'firstname',
        'lastname',
        'gender',
        'Sexual_orientation',
        'birthday',
        'biography',
    ];
    const requiredArr = [
        'tags'
    ];
    requiredFields.forEach(field => {
        if (!values[field] || !values[field].trim()) {
            errors[field] = 'Required !';
        }
    });
    requiredArr.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required !';
        }
    });
    if (values.birthday && !/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(values.birthday))
        errors.birthday = 'Invalid date !';
    if (values.biography && !/^.{1,200}$/.test(values.biography))
        errors.biography = 'maximum 200 characters';
    const age = Age(values.birthday)
    if (age < 18)
        errors.birthday = "Come back when you're 18"
    if (age > 120)
        errors.birthday = 'Invalid age !'
    return errors;
}
const mapStateToProps = (state) => (
    {
        'values': state.form.values,
        'selectTags': state.addInfo.selectTags,
        'selectLoading': state.addInfo.selectLoading,
        'selectError': state.addInfo.error,
        'user': state.user,
    });
const mapDispatchToProps = {
    "step1info": step1info,
    "createTag": createTag,
};
const mergeProps = (stateProps, dispatchProps, otherProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...otherProps,
    "handleSubmit": otherProps.handleSubmit((values) => {
        dispatchProps.step1info(values, stateProps.user.id);
    }),
});
const connectedAddInfoContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(infos);
let AddInfoContainer = reduxForm({
    form: "addInfo",
    destroyOnUnmount: true,
    validate,
})(connectedAddInfoContainer);
AddInfoContainer = connect(
    state => ({
        initialValues: {
            firstname: state.user.firstname,
            lastname: state.user.lastname,
            gender: state.user.gender,
            Sexual_orientation: state.user.Sexual_orientation,
            birthday: state.user.birthday,
            biography: state.user.biography,
            tags: state.user.tags,
        },
    }),
)(AddInfoContainer);
export default AddInfoContainer;






















<form
className={classes.form}
autoComplete="off"
//   onSubmit={handleSubmit}
noValidate
>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <TextField
      name="fname"
      variant="outlined"
      required
      fullWidth
      id="firstName"
      label="First Name"
      // defaultValue={values.firstName}
      // onChange={handleChange}
      // error={errors.firstName ? true : false}
      // helperText={errors.firstName && errors.firstName}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      variant="outlined"
      required
      fullWidth
      id="lastName"
      label="Last Name"
      name="lname"
      // defaultValue={values.lastName}
      // onChange={handleChange}
      // error={errors.lastName ? true : false}
      // helperText={errors.lastName && errors.lastName}
    />
  </Grid>
  <Grid item xs={12}>
    <FormLabel required component="legend">
      Gender
    </FormLabel>
    <RadioGroup
      className={classes.radio}
      aria-label="gender"
      name="gender"
      // value={data.gender}
      // onChange={handleChange}
    >
      <FormControlLabel
        value="1"
        control={<Radio />}
        label="Female"
      />
      <FormControlLabel value="2" control={<Radio />} label="Male" />
    </RadioGroup>
  </Grid>
  <Grid item xs={12}>
    <FormLabel required component="legend">
      Sexual preferences
    </FormLabel>
    <RadioGroup
      className={classes.radio}
      aria-label="gender"
      name="preferences"
      // value={data.preferences}
      // onChange={handleChange}
    >
      <FormControlLabel
        value="1"
        control={<Radio />}
        label="Female"
      />
      <FormControlLabel value="2" control={<Radio />} label="Male" />
      <FormControlLabel
        value="3"
        control={<Radio />}
        label="Bisexual"
      />
    </RadioGroup>
  </Grid>
  <Grid item xs={12}>
    <TextField
      variant="outlined"
      required
      fullWidth
      rows={6}
      multiline
      name="biography"
      label="Biography"
      type="text"
      id="Biography"
      // value={data.biography}
      // onChange={handleChange}
      // error={errors.bio ? true : false}
      // helperText={errors.bio && errors.bio}
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      id="date"
      margin="normal"
      fullWidth
      required
      label="Birthday"
      name="birthday"
      type="date"
      // value={data.birthday}
      // onChange={handleChange}
      // InputLabelProps={{
      //   shrink: true,
      // }}
      // error={errors.birthday ? true : false}
      // helperText={errors.birthday && errors.birthday}
    />
  </Grid>
  <Grid item xs={12}>
    {/* <FormControl fullWidth> */}
    <FormLabel required component="legend">
      Tags
    </FormLabel>
    <Creatable
      components={{ Menu }}
      isMulti
      name="tags"
      // isValidNewOption={isValidNewOption}
      // onChange={handleChangeTag}
    />
  </Grid>

  {/* Profile picture */}
  <FormControl fullWidth>
    <FormLabel required component="legend">
      profile Picture
    </FormLabel>
    <div className={classes.Profile}>
      <label for="img">
        <Avatar
          // src={img.img}
          style={{ cursor: "pointer" }}
          className={classes.large}
        />
      </label>
      <input
        name="img"
        accept="image/*"
        hidden
        id="img"
        type="file"
        //   onChange={photoUpload}
      />
    </div>
  </FormControl>
  {/* all other picture */}
  <Grid item xs={12} className={classes.gallery}>
    {/* picture 1 */}
    <label for="img1">
      <Avatar
        //   src={img.img1}
        variant="square"
        className={classes.large}
      >
        <AddIcon />
      </Avatar>
    </label>
    <input
      name="img1"
      accept="image/*"
      hidden
      id="img1"
      type="file"
      // onChange={photoUpload}
    />
    <label for="img2">
      <Avatar
        //   src={img.img2}
        variant="square"
        className={classes.large}
      >
        <AddIcon />
      </Avatar>
    </label>
    <input
      name="img2"
      accept="image/*"
      hidden
      id="img2"
      type="file"
      // onChange={photoUpload}
    />
    {/* image3 */}
    <label for="img3">
      <Avatar
        //   src={img.img3}
        variant="square"
        className={classes.large}
      >
        <AddIcon />
      </Avatar>
    </label>
    <input
      name="img3"
      accept="image/*"
      hidden
      id="img3"
      type="file"
      // onChange={photoUpload}
    />
    {/* image4 */}
    <label for="img4">
      <Avatar
        //   src={img.img4}
        variant="square"
        className={classes.large}
      >
        <AddIcon />
      </Avatar>
    </label>
    <input
      name="img4"
      accept="image/*"
      hidden
      id="img4"
      type="file"
      // onChange={photoUpload}
    />

    {/* </div> */}
  </Grid>
</Grid>
<Button
  type="submit"
  fullWidth
  variant="contained"
  color="primary"
  className={classes.submit}
>
  Valid
</Button>
</form>


 

