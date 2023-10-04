/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState, useEffect} from 'react';
import {
  CCard,
  CTabs,
  CNav,
  CButton,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCol,
  CRow,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CSwitch,
  CBadge,
  CImg
} from '@coreui/react';
import {
  bodyTypeData,
  drinkingData,
  eatingData,
  educationData,
  genderData,
  heightData,
  lookingData,
  maritalData,
  personalityData,
  religionData,
  sexualityData,
  smokingData,
} from 'src/utilits/GeneralData';
import ImageComponent from 'src/reusable/ImageComponent';
import {updateUserInfoAction} from "../../actions/userAction";
import {connect} from "react-redux";
// import UserList from './UserList';
// import UserImages from './UserImages';

const User = props => {
  const user = props.location.state;
  const [username, setUsername] = useState (user.username);
  const [name, setName] = useState (user.name);
  const [email, setEmail] = useState (user.email);
  const [phone, setPhone] = useState (user.phone);
  const [gender, setGender] = useState (user.gender === undefined ? genderData[0].title : user.gender);
  const [height, setHeight] = useState (user.height === undefined ? heightData[0].title : user.height);
  const [bodyType, setBodyType] = useState (user.bodyType === undefined ? bodyTypeData[0].title : user.bodyType);
  const [sexuality, setSexuality] = useState (user.sexuality === undefined ? sexualityData[0].title : user.sexuality);
  const [personality, setPersonality] = useState (user.personality === undefined ? personalityData[0].title : user.personality);
  const [education, setEducation] = useState (user.education === undefined ? educationData[0].title : user.education);
  const [maritalStatus, setMaritalStatus] = useState (user.maritalStatus === undefined ? maritalData[0].title : user.maritalStatus);
  const [lookingFor, setLookingFor] = useState (user.lookingFor === undefined ? lookingData[0].title : user.lookingFor);
  const [religion, setReligion] = useState (user.religion === undefined ? religionData[0].title : user.religion);
  const [dringkingStatus, setDringking] = useState (user.dringkingStatus === undefined ? drinkingData[0].title : user.dringkingStatus);
  const [smokingStatus, setSmoking] = useState (user.smokingStatus === undefined ? smokingData[0].title : user.smokingStatus);
  const [eatingStatus, setEating] = useState (user.eatingStatus === undefined ? eatingData[0].title : user.eatingStatus);
  const [DoB, setDoB] = useState (user.DoB);
  const [photos, setPhotos] = useState (user.photos);
  const [verifyphotos, setVerifyphotos] = useState (user.verifyphotos);
  const [isEditable, setIsEditable] = useState (user.isEditable);
  let prof = user.profilePic;
  if (prof === '') {
     prof = 'https://res.cloudinary.com/dyv2pftfd/image/upload/v1688891384/samples/people/l60Hf_nmsnkv_oooq1d.png';
  }
  const [profile, setProfilePic] = useState (prof);

  const saveProfileData = event => {
    event.preventDefault ();
    let parameter = {
      uid: user.uid,
      name: name,
      gender,
      height,
      bodyType
    };
    props
      .updateUser (parameter)
      .then (response => {

      });
  };

  const saveGeneralProfileData = event => {
    event.preventDefault ();
    let parameter = {
      uid: user.uid,
      sexuality,
      personality,
      education,
      maritalStatus,
      lookingFor,
      religion,
      dringkingStatus,
      smokingStatus,
      eatingStatus
    };
    props
      .updateUser (parameter)
      .then (response => {

      });
  };

  const onGenderOptionClicked = value => () => {
    setGender (value);
  };

  const onHeightOptionClicked = value => () => {
    setHeight (value);
  };

  const onBodyTypeOptionClicked = value => () => {
    setBodyType (value);
  };

  const onSexualityOptionClicked = value => () => {
    setSexuality (value);
  };

  const onPersonalityOptionClicked = value => () => {
    setPersonality (value);
  };

  const onEducationOptionClicked = value => () => {
    setEducation (value);
  };

  const onMaritalStatusOptionClicked = value => () => {
    setMaritalStatus (value);
  };

  const onLookingForOptionClicked = value => () => {
    setLookingFor (value);
  };

  const onReligionOptionClicked = value => () => {
    setReligion (value);
  };

  const onDrinkingOptionClicked = value => () => {
    setDringking (value);
  };

  const onSmokingOptionClicked = value => () => {
    setSmoking (value);
  };

  const onEatingOptionClicked = value => () => {
    setEating (value);
  };

  const [switchState, setSwitchState] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const disableColor = isEditable ? 'white' : '#E8E8E8';
  const disableTextColor = '#808080';

  const handleSwitchChange = (e) => {
    setSwitchState(e.target.checked);
    setShowBadge(e.target.checked && switchState.checked);
  };


    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
      fetchUserFolderImages();
    }, []);


  const fetchUserFolderImages = async () => {
    const userId = user.uid; // Replace with the actual user ID or dynamically retrieve it
    const folder = `user-folder/${userId}`; // Create folder name including the user ID

    // const cloudinaryUrl = `https://res.cloudinary.com/dyv2pftfd/image/upload/folder/${folder}/${Public_url}.jpg`;
    const cloudinaryUrl = `https://res.cloudinary.com/dyv2pftfd/image/list/${folder}/`;


    try {
      const response = await fetch(cloudinaryUrl);
      const blob = await response.json();
      const imageUrls = URL.createObjectURL(blob);
      setImageUrls(imageUrls);
    } catch (error) {
      console.log('Error fetching image:', error);
    }
  };

  // const { switchState } = this.state;

  return (
    <CRow>
      <CCol lg={6}>
        <CCard
          style={{alignItems: 'center', justifyContent: 'center', padding: 20}}
        >
          <ImageComponent url={profile}/>
          {switchState ? (
           <CImg
           src={'/tickmark/download.png'}
           style={{width: 45, height: 40}}
         />
        ) : (
          <CLabel>Not Aprove</CLabel>
        )}

          <h3 style={{marginTop: 25}}>{user.name}</h3>
          <h5 style={{fontSize: 12}}>{user.email}</h5>

          <CFormGroup>
              <CLabel>Aprove:</CLabel>
              <CSwitch
                className="mr-1"
                color="success"
                shape="pill"
                variant="opposite"

                checked={switchState}
                onChange={handleSwitchChange}
              />
            </CFormGroup>
        </CCard>
        {photos !== undefined &&
          <CCard style={{padding: 20}}>
            <h5>Photos</h5>
            <CRow>
              {photos.map (photo => (
                <CCol
                  lg="3"
                  style={{
                    overflow: 'hidden',
                    padding: 5,
                    backgroundColor: 'rgba(0,0,0,0)',
                  }}
                >
                  <img
                    style={{maxWidth: 100}}
                    src={photo.photoUrl}
                    alt="display image"
                  />

                </CCol>
              ))}
            </CRow>



            <div>
                {imageUrls.length > 0 ? (
                  <div>
                    {imageUrls.map((imageUrl, index) => (
                      <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ width: 200, height: 200 }} />
                    ))}
                  </div>
                ) : (
                  <p>No images found.</p>
                )}
              </div>

             {/* {imageUrls ? (
                      <img src={imageUrls} alt="Cloudinary Image" style={{ width: 200, height: 200 }} />
                    ) : (
                      <p>Loading image...</p>
                    )}
             </div> */}

            {/* <div>
                  <UserList />
                  <UserImages/> */}
                  {/* Render UserImages with a selected userId */}
                  {/* <UserImages userId="selectedUserId" /> */}
                {/* </div> */}

          </CCard>}



            {showBadge && (
              <CBadge color="danger">Badge Text</CBadge>
            )}
      </CCol>
      <CCol lg={6}>
        <CCard>
          <CTabs activeTab="profile">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="profile">
                  Profile
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="otherinfo">
                  General Info
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="profile">
                <CCard borderColor={'white'}>
                  <CCardBody>
                    <CFormGroup>
                      <CLabel htmlFor="username">Username</CLabel>
                      <CInput
                        id="username"
                        placeholder="Enter your username"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={true}
                        value={username}
                        onChange={e => {
                          setUsername (e.target.value);
                        }}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="fullname">Full Name</CLabel>
                      <CInput
                        id="fullname"
                        placeholder="Enter your fullname"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={!isEditable}
                        value={name}
                        onChange={e => {
                          setName (e.target.value);
                        }}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="email">Email Address</CLabel>
                      <CInput
                        id="email"
                        placeholder="Enter your email address"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={true}
                        value={email}
                        autoComplete="email"
                        onChange={e => {
                          setEmail (e.target.value);
                        }}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="phone">Phone Number</CLabel>
                      <CInput
                        id="phone"
                        placeholder="Enter your phone number"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={true}
                        value={phone}
                        onChange={e => {
                          setPhone (e.target.value);
                        }}
                      />
                    </CFormGroup>
                    {/*<CFormGroup>*/}
                    {/*  <CLabel htmlFor="dob">Date of Birth</CLabel>*/}
                    {/*  <CInput*/}
                    {/*    type="date"*/}
                    {/*    id="date-input"*/}
                    {/*    name="date-input"*/}
                    {/*    placeholder="date"*/}
                    {/*    style={{*/}
                    {/*      backgroundColor: disableColor,*/}
                    {/*      color: disableTextColor,*/}
                    {/*    }}*/}
                    {/*    disabled={!isEditable}*/}
                    {/*  />*/}
                    {/*</CFormGroup>*/}
                    <CRow>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccgender">Gender</CLabel>
                          <CSelect
                            custom
                            name="ccgender"
                            id="ccgender"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onGenderOptionClicked (event.target.value)}
                          >
                            {genderData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === gender}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccheight">Height</CLabel>
                          <CSelect
                            custom
                            name="ccheight"
                            id="ccheight"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onHeightOptionClicked (event.target.value)}
                          >
                            {heightData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === height}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccbodytype">Body Type</CLabel>
                          <CSelect
                            custom
                            name="ccbodytype"
                            id="ccbodytype"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onBodyTypeOptionClicked (event.target.value)}
                          >
                            {bodyTypeData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === bodyType}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    {isEditable &&
                      <CFormGroup className="form-actions">
                        <CButton
                          type="submit"
                          size="lm"
                          color="success"
                          onClick={saveProfileData}
                        >
                          Save changes
                        </CButton>
                      </CFormGroup>}
                  </CCardBody>
                </CCard>
              </CTabPane>
              <CTabPane data-tab="otherinfo">
                <CCard borderColor={'white'}>
                  <CCardBody>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="ccsexuality">Sexuality</CLabel>
                          <CSelect
                            custom
                            name="ccsexuality"
                            id="ccsexuality"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onSexualityOptionClicked (event.target.value)}
                          >
                            {sexualityData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === sexuality}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="ccpersonality">Personality</CLabel>
                          <CSelect
                            custom
                            name="ccpersonality"
                            id="ccpersonality"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onPersonalityOptionClicked (event.target.value)}
                          >
                            {personalityData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === personality}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CFormGroup>
                      <CLabel htmlFor="cceducation">Education</CLabel>
                      <CSelect
                        custom
                        name="cceducation"
                        id="cceducation"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={!isEditable}
                        onChange={event =>
                          onEducationOptionClicked (event.target.value)}
                      >
                        {educationData.map (option => (
                          <option
                            key={option.id.toString ()}
                            value={option.title}
                            selected={option.title === education}
                          >
                            {option.title}
                          </option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="ccmarital">Marital Status</CLabel>
                      <CSelect
                        custom
                        name="ccmarital"
                        id="ccmarital"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={!isEditable}
                        onChange={event =>
                          onMaritalStatusOptionClicked (event.target.value)}
                      >
                        {maritalData.map (option => (
                          <option
                            key={option.id.toString ()}
                            value={option.title}
                            selected={option.title === maritalStatus}
                          >
                            {option.title}
                          </option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="cclooking">I'm Looking for</CLabel>
                      <CSelect
                        custom
                        name="cclooking"
                        id="cclooking"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={!isEditable}
                        onChange={event =>
                          onLookingForOptionClicked (event.target.value)}
                      >
                        {lookingData.map (option => (
                          <option
                            key={option.id.toString ()}
                            value={option.title}
                            selected={option.title === lookingFor}
                          >
                            {option.title}
                          </option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="ccreligion">Religion</CLabel>
                      <CSelect
                        custom
                        name="ccreligion"
                        id="ccreligion"
                        style={{
                          backgroundColor: disableColor,
                          color: disableTextColor,
                        }}
                        disabled={!isEditable}
                        onChange={event =>
                          onReligionOptionClicked (event.target.value)}
                      >
                        {religionData.map (option => (
                          <option
                            key={option.id.toString ()}
                            value={option.title}
                            selected={option.title === religion}
                          >
                            {option.title}
                          </option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                    <CRow>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccdrinking">Drinking</CLabel>
                          <CSelect
                            custom
                            name="ccdrinking"
                            id="ccdrinking"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onDrinkingOptionClicked (event.target.value)}
                          >
                            {drinkingData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === dringkingStatus}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccsmoking">Smoking</CLabel>
                          <CSelect
                            custom
                            name="ccsmoking"
                            id="ccsmoking"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onSmokingOptionClicked (event.target.value)}
                          >
                            {smokingData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === smokingStatus}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="cceating">Eating</CLabel>
                          <CSelect
                            custom
                            name="cceating"
                            id="cceating"
                            style={{
                              backgroundColor: disableColor,
                              color: disableTextColor,
                            }}
                            disabled={!isEditable}
                            onChange={event =>
                              onEatingOptionClicked (event.target.value)}
                          >
                            {eatingData.map (option => (
                              <option
                                key={option.id.toString ()}
                                value={option.title}
                                selected={option.title === eatingStatus}
                              >
                                {option.title}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    {isEditable &&
                      <CFormGroup className="form-actions">
                        <CButton
                          type="submit"
                          size="lm"
                          color="success"
                          onClick={saveGeneralProfileData}
                        >
                          Save changes
                        </CButton>
                      </CFormGroup>}
                  </CCardBody>
                </CCard>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch (updateUserInfoAction (user)),
});

export default connect (mapStateToProps, mapDispatchToProps) (User);
