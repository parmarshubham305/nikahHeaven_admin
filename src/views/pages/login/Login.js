import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow, CAlert } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import { getFCMTokenAndStore, signInAction } from "src/actions/userAction";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("");

    const loginPress = () => {
        let emailVal = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        let isEmailValid = emailVal.test(email);
        if (!isEmailValid) {
            setErrorMessage("Email does not match with valid email.");
        } else if (!password.toString().trim().length) {
            setErrorMessage("Password is required.");
        } else {
            props
                .signin({
                    email,
                    password,
                })
                .then((data) => {
                    getFCMTokenAndStore(data?.user?.uid);
                    return data
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    const { authUser, isLoading } = props;
    if (authUser) {
        return (
            <Redirect
                to={{
                    pathname: "/dashboard",
                    // state: { from: props.location }
                }}
            />
        );
    }

    if (isLoading && !authUser) {
        return <div />;
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                {errormessage !== "" && (
                    <div className="mt-2">
                        <CAlert color="info" closeButton>
                            {errormessage}
                        </CAlert>
                    </div>
                )}
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1 style={{ color: "#eb5781" }}>Sign In</h1>
                                        <p style={{ color: "#eb578190" }}>Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>@</CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                placeholder="Email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setErrorMessage("");
                                                    setEmail(e.target.value);
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
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => {
                                                    setErrorMessage("");
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton style={{ backgroundColor: "#eb5781", color: "white" }} className="px-4" onClick={loginPress}>
                                                    Sign In
                                                </CButton>
                                            </CCol>
                                            <CCol xs="6" className="text-right">
                                                <CButton style={{ color: "#eb5781" }} className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white py-5 d-md-down-none" style={{ width: "44%", backgroundColor: "#eb5781" }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign Up</h2>
                                        <p>Create the super admin user for full access to admin panel.</p>
                                        <Link to="/signup">
                                            <CButton style={{ backgroundColor: "#eb5781", color: "white" }} className="mt-3" active tabIndex={-1}>
                                                Sign Up Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

const mapStateToProps = (state) => ({
    authUser: state.auth.authUser,
    authErr: state.auth.authError,
    isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    signin: (user) => dispatch(signInAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
