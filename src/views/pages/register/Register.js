import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {signUpAction} from 'src/actions/userAction';
import {connect} from 'react-redux';

const Register = props => {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [repeatpassword, setRepeatPassword] = useState ('');
  const [errormessage, setErrorMessage] = useState ('');

  const registerPress = () => {
    let emailVal = new RegExp (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    let isEmailValid = emailVal.test (email);
    if (!name.toString ().trim ().length) {
      setErrorMessage ('Full Name is required.');
    } else if (!isEmailValid) {
      setErrorMessage ('Email does not match with valid email.');
    } else if (!password.toString ().trim ().length) {
      setErrorMessage ('Password is required.');
    } else if (!repeatpassword.toString ().trim ().length) {
      setErrorMessage ('Repeat Password is required.');
    } else if (
      password.toString ().trim () !== repeatpassword.toString ().trim ()
    ) {
      setErrorMessage ('Repeat Password does not match with password.');
    } else {
      props.signUp ({
        name,
        email,
        password,
      }).then().catch(error => {
        alert(error)
      });
    }
  };

  const {authUser, isLoading} = props;
  if (authUser) {
    return (
      <Redirect
        to={{
          pathname: '/dashboard',
          // state: { from: props.location }
        }}
      />
    );
  }

  if (isLoading && !authUser) {
    return <div />
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        {errormessage !== '' &&
          <div className="mt-2">
            <CAlert color="info" closeButton>{errormessage}</CAlert>
          </div>}
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1 style={{color:'#eb5781'}}>Sign Up</h1>
                  <p  style={{color:'#eb578190'}}>Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Full Name"
                      autoComplete="name"
                      value={name}
                      onChange={e => {
                        setErrorMessage ('');
                        setName (e.target.value);
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={e => {
                        setErrorMessage ('');
                        setEmail (e.target.value);
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={e => {
                        setErrorMessage ('');
                        setPassword (e.target.value);
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={repeatpassword}
                      onChange={e => {
                        setErrorMessage ('');
                        setRepeatPassword (e.target.value);
                      }}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <CButton
                        style={{backgroundColor:'#eb5781', color: 'white'}}
                        className="px-4"
                        onClick={registerPress}
                      >
                        Sign Up
                      </CButton>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <Link to="/signin">
                        <CButton style={{color:'#eb5781'}} className="px-0">Sign In</CButton>
                      </Link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.auth.authUser,
  authErr: state.auth.authError,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  signUp: user => dispatch (signUpAction (user)),
});

export default connect (mapStateToProps, mapDispatchToProps) (Register);
