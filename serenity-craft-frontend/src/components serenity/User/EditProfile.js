import React from 'react';

import EditIcon from '@material-ui/icons/Edit';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Textfield from "@material-ui/core/Textfield";


// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import TextsmsIcon from '@material-ui/icons/Textsms';

const EditProfile = ({ credentials }) => {

    return (
    //    <GridContainer>
    //        <GridItem xs={12} sm={12} md={7}>
    //             <List>
    //                 <ListItem>
    //                     <Textfield
    //                         color="secondary"
    //                         name="bio" 
    //                         type="text" 
    //                         label="Bio"
    //                         // variant="outlined"
    //                         // error={errors?.email ? true : false}
    //                         // helperText={errors?.email}
    //                         // inputRef={register()}
    //                         InputLabelProps={{ shrink: true }}  
    //                         fullWidth
    //                         type="text"
    //                         multiline
    //                         rowsMax={3}
    //                         value={credentials?.bio ?? ""}
    //                         InputProps={{
    //                             endAdornment: 
    //                                 <InputAdornment position="end">
    //                                     <TextsmsIcon />
    //                                 </InputAdornment>,
    //                         }}
    //                     />
    //                 </ListItem>
    //                 <ListItem>
    //                     <Textfield
    //                         color="secondary"
    //                         name="location" 
    //                         type="text" 
    //                         label="Location"
    //                         // variant="outlined"
    //                         // error={errors?.email ? true : false}
    //                         // helperText={errors?.email}
    //                         // inputRef={register()}
    //                         InputLabelProps={{ shrink: true }}  
    //                         fullWidth
    //                         type="text"
    //                         value={credentials?.location ?? ""}
    //                         InputProps={{
    //                             endAdornment: 
    //                                 <InputAdornment position="end">
    //                                     <LocationOnIcon />
    //                                 </InputAdornment>,
    //                         }}
    //                     />
    //                 </ListItem>
    //                 <ListItem>
    //                     <Textfield
    //                         color="secondary"
    //                         name="mainInterests" 
    //                         type="text" 
    //                         label="You're interested in"
    //                         // variant="outlined"
    //                         // error={errors?.email ? true : false}
    //                         // helperText={errors?.email}
    //                         // inputRef={register()}
    //                         InputLabelProps={{ shrink: true }}  
    //                         fullWidth
    //                         type="text"
    //                         // value={credentials?.mainInterests.lenght === 0 ? "" : credentials?.mainInterests}
    //                         InputProps={{
    //                             endAdornment: 
    //                                 <InputAdornment position="end">
    //                                     <AnnouncementIcon />
    //                                 </InputAdornment>,
    //                         }}
    //                     />
    //                 </ListItem>
    //             </List>
    //        </GridItem>
    //        <GridItem xs={12} sm={12} md={5}>
    //             <PictureUpload />
    //        </GridItem>
    //        {/* <Button color="info">
    //            UPDATE DETAILS
    //        </Button> */}
    //    </GridContainer>
        <h2>Edit profile...</h2>
    )
}

export default EditProfile;
