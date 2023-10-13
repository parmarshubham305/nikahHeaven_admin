/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CForm, CFormGroup, CInput, CFormText, CTextarea, CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CLabel, CDropdown, CDropdownToggle, CSelect, CCardText, CCardTitle, CButton, CSpinner } from "@coreui/react";
import { MdMoreHoriz } from "react-icons/md";

import { connect } from "react-redux";
import { Countries } from "src/constants/metadata";
import { getAllMeetingsInfo, getAllSeekerRequestsAction } from "src/actions/userAction";

// const getBadge = (status) => {
//     switch (status) {
//         case "accepted":
//             return "success";
//         case "":
//             return "warning";
//         case "rejected":
//             return "danger";
//         default:
//             return "primary";
//     }
// };

const ScheduleMeeting = (props) => {
    //constants
    const { authUser } = props;
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

    //states
    const [page, setPage] = useState(currentPage);
    const [isNotificationEdit, setIsNotificationEdit] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        host_user_id: authUser?.uid,
        meeting_dateAndTime: new Date(),
        meeting_country: Countries[0]?.value,
        notification_title: "Meeting Scheduled",
        notification_description: `You have a meeting scheduled for ${new Date()}. The meeting will take place in ${Countries[0]?.label}. Please be prepared and join on time.`,
    });

    useEffect(() => {
        const current = Countries.find((item) => item?.value === formData?.meeting_country) || Countries[0];
        setFormData((prev) => ({ ...prev, notification_description: `You have a meeting scheduled for ${formData?.meeting_dateAndTime}. The meeting will take place in ${current?.label}. Please be prepared and join on time.` }));
    }, [formData?.meeting_country, formData?.meeting_dateAndTime]);

    const [errors, setErrors] = useState({ field: "common", value: "" });
    //hooks
    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    //functions
    const handleChange = (key, value) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };
    const handleNotificationSave = () => {
        setIsNotificationEdit(false);
    };

    const isValidMeetingDate = (date) => {
        // Allow dates that are in the future
        const currentDate = new Date();
        if (date > currentDate) {
            return true;
        } else {
            setErrors({ field: "meeting_dateTime", message: "Date should be more than" + currentDate });
            return false;
        }
    };

    const isValidCountry = () => {
        if (formData?.meeting_country === "") {
            setErrors({ field: "country", message: "Please select country" });
            return false;
        }
        return true;
    };

    const handleSchedule = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (isValidMeetingDate(formData?.meeting_dateAndTime) && isValidCountry()) {
            setErrors({ field: "common", value: "" });
            // Handle form submission
            const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/schedule-meeting`, {
                method: "post",
                body: JSON.stringify({ host_user_id: authUser?.uid, ...formData }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            if (res?.ok) {
                props.getAllMeetings();
                setIsLoading(false);
            }
            // console.log("res", res);
            setIsLoading(false);
        } else {
            // Display an error message or take other appropriate actions
            console.log("Form validation failed!");
            setIsLoading(false);
        }
    };

    const handleNotificationCancel = () => {
        setFormData((prev) => ({ ...prev, notification_title: "Meeting Scheduled", notification_description: `You have a meeting scheduled for ${new Date()}. The meeting will take place in ${Countries[0]?.label}. Please be prepared and join on time.` }));
        setIsNotificationEdit(false);
    };

    // const acceptAction = item => {
    //   props.updateSeekerRequestStatus(item.id, {request_status: 'accepted'});
    //   props.updateSeekerRequestNotificationStatus(item.id, {request_status: 'accepted'});
    // };

    // const rejectAction = item => {
    //   props.updateSeekerRequestStatus(item.id, {request_status: 'declined'});
    //   props.updateSeekerRequestNotificationStatus(item.id, {request_status: 'declined'})
    // };

    // const deleteAction = item => {
    //   props.updateSeekerRequestStatus(item.id, {status: 'Delete'});
    //   props.updateSeekerRequestNotificationStatus(item.id, {status: 'Delete'});
    // };

    useEffect(() => {
        const unsubscribe = props.getAllMeetings();
        return unsubscribe;
    }, []);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Schedule Meeting</CCardHeader>
                    <CCardBody>
                        <CForm onSubmit={handleSchedule}>
                            <div className="row">
                                <div className="col-md-6">
                                    <CFormGroup>
                                        <CLabel htmlFor="meetingDateTime">Select Meeting Date and Time:</CLabel>
                                        <DatePicker selected={formData?.meeting_dateAndTime} isValidDate={isValidMeetingDate} onChange={(date) => handleChange("meeting_dateAndTime", date)} showTimeSelect dateFormat="Pp" className="mb-3 form-control" wrapperClassName="form-control" />
                                        {errors?.field === "meeting_dateTime" && (
                                            <CFormText id="dateHelp" className="text-danger">
                                                {errors?.message}
                                            </CFormText>
                                        )}
                                    </CFormGroup>
                                </div>
                                <div className="col-md-6">
                                    <CFormGroup>
                                        <CLabel htmlFor="Country">Select Country:</CLabel>
                                        <CSelect custom className="mb-3" aria-label="select Country for meeting" onChange={({ target }) => handleChange("meeting_country", target?.value)} value={formData?.meeting_country}>
                                            <option value="" disabled>
                                                Open this select menu
                                            </option>
                                            {Countries?.map((item, index) => (
                                                <option value={item?.value} key={index}>
                                                    {item?.label}
                                                </option>
                                            ))}
                                        </CSelect>
                                        {errors?.field === "country" && (
                                            <CFormText id="countryHelp" className="text-danger">
                                                {errors?.message}
                                            </CFormText>
                                        )}
                                    </CFormGroup>
                                </div>
                            </div>
                            <CCard>
                                <CCardHeader className="d-flex justify-content-between">
                                    <h5>Notification</h5>
                                    <CButton color="primary" onClick={() => setIsNotificationEdit(true)}>
                                        Edit
                                    </CButton>
                                </CCardHeader>
                                <CCardBody>
                                    {isNotificationEdit ? (
                                        <>
                                            <div className="mb-3">
                                                <CInput type="email" name="notification_title" placeholder="Enter Notification Title" id="inputTitle" aria-describedby="titleHelp" value={formData?.notification_title} onChange={({ target }) => handleChange("notification_title", target?.value)} />
                                                {/* <CFormText id="emailHelp">We'll never share your email with anyone else.</CFormText> */}
                                            </div>
                                            <div className="mb-3">
                                                <CTextarea rows="4" cols="50" id="exampleInputEmail1" aria-describedby="emailHelp" name="notification_description" placeholder="Enter Notification Description" value={formData?.notification_description} onChange={({ target }) => handleChange("notification_description", target?.value)} />
                                                {/* <CFormText id="emailHelp">We'll never share your email with anyone else.</CFormText> */}
                                            </div>
                                            <div className="m-3">
                                                <CButton color="primary" onClick={handleNotificationSave}>
                                                    Save
                                                </CButton>
                                                <CButton color="secondary" className="m-1" onClick={() => handleNotificationCancel()}>
                                                    cancel
                                                </CButton>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <CCardTitle>{formData?.notification_title}</CCardTitle>
                                            <CCardText>{formData?.notification_description}</CCardText>
                                        </>
                                    )}
                                    {/* <CButton color="primary" href="#">
                                        Go somewhere
                                    </CButton> */}
                                </CCardBody>
                            </CCard>
                            <CButton color="primary" type="submit" disabled={isLoading}>
                                Schedule and Push Notification {isLoading && <CSpinner size="sm" />}
                            </CButton>
                        </CForm>
                    </CCardBody>
                    <CCardBody>
                        <CDataTable
                            items={props.meetingRequests}
                            fields={[
                                "meeting_country",
                                "meeting_dateAndTime",
                                "notification_title",
                                {
                                    key: "show_details",
                                    label: "Action",
                                    _style: { width: "12%" },
                                    sorter: false,
                                    filter: false,
                                },
                            ]}
                            tableFilter={{
                                label: "Search",
                                placeholder: "Search Name",
                            }}
                            itemsPerPageSelect={{
                                label: "Items",
                                values: [10, 50, 100],
                            }}
                            itemsPerPage={10}
                            pagination
                            activePage={page}
                            clickableRows
                            scopedSlots={{
                                meeting_country: (item) => (
                                    <td>
                                        <CLabel color={"black"}>{Countries.find(({ value }) => value === item.meeting_country)?.label}</CLabel>
                                    </td>
                                ),
                                meeting_dateAndTime: (item) => (
                                    <td>
                                        <CLabel color={"black"}>{item.meeting_dateAndTime}</CLabel>
                                    </td>
                                ),
                                notification_title: (item) => (
                                    <td>
                                        <CLabel color={"black"}>{item.notification_title}</CLabel>
                                    </td>
                                ),
                                show_details: (item, index) => {
                                    return (
                                        <td>
                                            <CDropdown>
                                                <CDropdownToggle caret={false}>
                                                    <MdMoreHoriz size={25} />
                                                </CDropdownToggle>
                                                {/* <CDropdownMenu>
                          {
                            item.request_status === '' &&
                            <>
                              <CDropdownItem onClick={()=>acceptAction(item)}>Accept</CDropdownItem>
                              <CDropdownItem onClick={()=>rejectAction(item)}>Reject</CDropdownItem>
                              <CDropdownDivider />
                            </>
                          }
                          <CDropdownItem onClick={()=>deleteAction(item)}>Delete</CDropdownItem>
                        </CDropdownMenu> */}
                                            </CDropdown>
                                        </td>
                                    );
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

const mapStateToProps = (state) => ({
    meetingRequests: state.auth.meetings,
    authUser: state.auth.authUser,
});

const mapDispatchToProps = (dispatch) => ({
    getAllMeetings: () => dispatch(getAllMeetingsInfo()),
    // updateSeekerRequestStatus: (id, data) => dispatch (updateSeekerRequestStatusAction (id, data)),
    // updateSeekerRequestNotificationStatus: (id, data) => dispatch (updateSeekerRequestNotificationStatusAction (id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleMeeting);
