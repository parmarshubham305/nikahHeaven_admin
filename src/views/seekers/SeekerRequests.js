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
  CLabel,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu
} from '@coreui/react';
import {MdMoreHoriz} from 'react-icons/md';

import {connect} from 'react-redux';
import {getAllSeekerRequestsAction, updateSeekerRequestStatusAction, updateSeekerRequestNotificationStatusAction} from 'src/actions/userAction';

const getBadge = status => {
  switch (status) {
    case 'accepted':
      return 'success';
    case '':
      return 'warning';
    case 'rejected':
      return 'danger';
    default:
      return 'primary';
  }
};

const SeekerRequests = props => {
  const history = useHistory ();
  const queryPage = useLocation ().search.match (/page=([0-9]+)/, '');
  const currentPage = Number (queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState (currentPage);

  useEffect (
    () => {
      currentPage !== page && setPage (currentPage);
    },
    [currentPage, page]
  );

  const acceptAction = item => {
    props.updateSeekerRequestStatus(item.id, {request_status: 'accepted'});
    props.updateSeekerRequestNotificationStatus(item.id, {request_status: 'accepted'});
  };

  const rejectAction = item => {
    props.updateSeekerRequestStatus(item.id, {request_status: 'declined'});
    props.updateSeekerRequestNotificationStatus(item.id, {request_status: 'declined'})
  };

  const deleteAction = item => {
    props.updateSeekerRequestStatus(item.id, {status: 'Delete'});
    props.updateSeekerRequestNotificationStatus(item.id, {status: 'Delete'});
  };

  useEffect (() => {
    const unsubscribe = props.getAllSeekers ();
    return unsubscribe;
  }, []);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Seeker Requests
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={props.seekerRequests}
              fields={[
                {key: 'name'},
                'seeker_name',
                'note',
                'type',
                'request_status',
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
                name: item => (
                  <td>
                    <CLabel color={'black'}>
                      {item.userInfo.name}
                    </CLabel>
                  </td>
                ),
                seeker_name: item => (
                  <td>
                    <CLabel color={'black'}>
                      {item.otherInfo.name}
                    </CLabel>
                  </td>
                ),
                type: item => (
                  <td>
                    <CBadge color={'success'}>
                      {item.seekerKey}
                    </CBadge>
                  </td>
                ),
                request_status: item => (
                  <td>
                    <CBadge color={getBadge(item
                    .request_status)}>
                      {(item.request_status === '' ? 'pending' : item.request_status)}
                    </CBadge>
                  </td>
                ),
                show_details: (item, index) => {
                  return (
                    <td>
                      <CDropdown>
                        <CDropdownToggle caret={false}>
                          <MdMoreHoriz size={25} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          {
                            item.request_status === '' &&
                            <>
                              <CDropdownItem onClick={()=>acceptAction(item)}>Accept</CDropdownItem>
                              <CDropdownItem onClick={()=>rejectAction(item)}>Reject</CDropdownItem>
                              <CDropdownDivider />
                            </>
                          }
                          <CDropdownItem onClick={()=>deleteAction(item)}>Delete</CDropdownItem>
                        </CDropdownMenu>
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

const mapStateToProps = state => ({
  seekerRequests: state.auth.seekerRequests,
});

const mapDispatchToProps = dispatch => ({
  getAllSeekers: () => dispatch (getAllSeekerRequestsAction ()),
  updateSeekerRequestStatus: (id, data) => dispatch (updateSeekerRequestStatusAction (id, data)),
  updateSeekerRequestNotificationStatus: (id, data) => dispatch (updateSeekerRequestNotificationStatusAction (id, data)),
});

export default connect (mapStateToProps, mapDispatchToProps) (SeekerRequests);
