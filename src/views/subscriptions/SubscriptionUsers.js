import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CImg, CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal,
} from '@coreui/react';
import {MdEdit, MdVisibility, MdDelete} from 'react-icons/md';

import {connect} from 'react-redux';
import {deleteUserRecord, getAllUsersAction, updateUserInfoAction} from 'src/actions/userAction';

let selectedUser = {};

const getBadge = status => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    case 'Pending':
      return 'warning';
    case 'Banned':
      return 'danger';
    default:
      return 'primary';
  }
};

const SubscriptionUsers = props => {
  const history = useHistory ();
  const queryPage = useLocation ().search.match (/page=([0-9]+)/, '');
  const currentPage = Number (queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState (currentPage);
  const [visible, setVisible] = useState(false);

  const viewUserDetails = item => {
    history.push (`/users/${item.uid}`, {...item, isEditable: false});
  };

  const editUserDetails = item => {
    history.push (`/users/${item.uid}`, {...item, isEditable: true});
  };

  useEffect (
    () => {
      currentPage !== page && setPage (currentPage);
    },
    [currentPage, page]
  );

  useEffect (() => {
    const unsubscribe = props.getAllUsers ();
    return unsubscribe;
  }, []);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Subscription Users
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={props.subscriptionUsers}
              fields={[
                'photo',
                'name',
                'email',
                'role',
                'status',
                {
                  key: 'show_details',
                  label: 'Action',
                  _style: {width: '12%'},
                  sorter: false,
                  filter: false,
                },
              ]}
              tableFilter={{
                label: 'Search',
                placeholder: 'Search Name',
              }}
              itemsPerPageSelect={{
                label: 'Items',
                values: [10, 50, 100],
              }}
              itemsPerPage={10}
              pagination
              activePage={page}
              clickableRows
              scopedSlots={{
                photo: item => (
                  <td>
                    <CImg
                      src={item.profilePic !== '' ? item.profilePic : 'https://res.cloudinary.com/dyv2pftfd/image/upload/v1688891384/samples/people/l60Hf_nmsnkv_oooq1d.png'}
                      fluid
                      className={'c-avatar'}
                    />
                  </td>
                ),
                status: item => (
                  <td>
                    <CBadge color={getBadge (item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                ),
                show_details: (item, index) => {
                  return (
                    <td>
                      <CRow
                        style={{
                          flex: 1,
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      >
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="round"
                          size="sm"
                          onClick={() => {
                            editUserDetails (item);
                          }}
                        >
                          <MdEdit size={15} />
                        </CButton>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="round"
                          size="sm"
                          onClick={() => {
                            viewUserDetails (item);
                          }}
                        >
                          <MdVisibility size={15} />
                        </CButton>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="round"
                          size="sm"
                          onClick={() => {
                            if (props.authUser.uid !== item.uid) {
                              selectedUser = item;
                              setVisible(!visible)
                            }
                          }}
                        >
                          <MdDelete size={15} />
                        </CButton>
                      </CRow>
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CModal show={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Delete User</CModalTitle>
        </CModalHeader>
        <CModalBody>{`Are you sure you want to delete ${selectedUser.name}?`}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => {
            if (props.authUser.uid !== selectedUser.uid) {
              props
                .updateUser ({
                  uid: selectedUser.uid,
                  status: 'Delete'
                })
                .then (response => {
                  setVisible(false)
                });
            }
          }}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

const mapStateToProps = state => ({
  subscriptionUsers: state.auth.subscriptionUsers,
  authUser: state.auth.authUser,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch (getAllUsersAction ()),
  updateUser: user => dispatch (updateUserInfoAction (user)),
});

export default connect (mapStateToProps, mapDispatchToProps) (
  SubscriptionUsers
);
