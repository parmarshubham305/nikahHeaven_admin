import React, {useState, useEffect} from 'react';
import {
  CRow,
  CCol,
  CCard,
  CImg,
  CForm,
  CFormGroup,
  CCardBody,
  CLabel,
  CInput,
  CButton,
} from '@coreui/react';
import {connect} from 'react-redux';
import {
  getUpdateUserInfoAction,
  updateUserInfoAction,
} from 'src/actions/userAction';

const MyProfile = props => {
  const [name, setName] = useState (props.authUser.name);
  const [email, setEmail] = useState (props.authUser.email);
  const [phone, setPhone] = useState (props.authUser.phone);
  const [profilePic, setProfilePic] = useState (props.authUser.profilePic);

  const saveData = event => {
    event.preventDefault ();
    if (!name.toString ().trim ().length) {
      alert ('Full Name is required.');
    } else {
      props
        .updateUser ({
          uid: props.authUser.uid,
          name: name,
          phone_number: phone
        })
        .then (response => {
          props.getUserInfo (props.authUser);
        });
    }
  };

  return (
    <CRow>
      <CCol lg={6}>
        <CCard
          style={{alignItems: 'center', justifyContent: 'center', padding: 20}}
        >
          <CImg
            src={profilePic}
            className="c-avatar-img"
            style={{width: 120, height: 120, backgroundColor: 'lightgray'}}
          />
          <h3 style={{marginTop: 25}}>{props.authUser.name}</h3>
          <h5 style={{fontSize: 12}}>{props.authUser.email}</h5>
        </CCard>
      </CCol>
      <CCol lg={6}>
        <CCard>
          <CCardBody>
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel htmlFor="text-input">Full Name</CLabel>
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Enter Full Name.."
                  value={name}
                  onChange={e => {
                    setName (e.target.value);
                  }}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput
                  type="email"
                  id="nf-email"
                  name="nf-email"
                  placeholder="Enter Email.."
                  value={email}
                  autoComplete="email"
                  disabled={true}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Phone Number</CLabel>
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Enter phone number.."
                  value={phone}
                  onChange={e => {
                    setPhone (e.target.value);
                  }}
                />
              </CFormGroup>
              <CFormGroup className="form-actions">
                <CButton
                  type="submit"
                  size="sm"
                  color="success"
                  onClick={saveData}
                >
                  Submit
                </CButton>
              </CFormGroup>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = state => ({
  authUser: state.auth.authUser,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch (updateUserInfoAction (user)),
  getUserInfo: user => dispatch (getUpdateUserInfoAction (user)),
});

export default connect (mapStateToProps, mapDispatchToProps) (MyProfile);
