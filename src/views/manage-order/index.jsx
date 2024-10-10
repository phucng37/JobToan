import React, { useState, useEffect, useCallback } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { Link } from 'react-router-dom'
import { instanceAxios } from '../../utils/https';

export default function ManageOrder() {
  const [orders, setOrders] = React.useState();
  const fetchOrders = useCallback(async () => {
    const response = await instanceAxios.get('order/show');
    if (response.status === 200) {
      setOrders(response.data?.orders);
    }
  }, []);
  useEffect(()=>{
    fetchOrders();
  }, []);

    return (
        <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/* <CCardHeader>
`              <Link to="/manage-user/create">Create new </Link>
`            </CCardHeader> */}
            <CCardBody>
              {/* <p className="text-body-secondary small">
                Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
                tables look in CoreUI.
              </p> */}
              {/* <DocsExample href="components/table"> */}
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Created at</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Total price</CTableHeaderCell>
                      {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      orders?.map((order, index) => (
                        <CTableRow key={order._id}>
                        <CTableHeaderCell scope="row">${index}</CTableHeaderCell>
                        <CTableDataCell>{order?.name}</CTableDataCell>
                        <CTableDataCell>{order?.customer}</CTableDataCell>
                        <CTableDataCell>{order?.createdAt}</CTableDataCell>
                        <CTableDataCell>{order?.totalPrice}</CTableDataCell>
                      </CTableRow>
                      ))
                    }
                  </CTableBody>
                </CTable>
              {/* </DocsExample> */}
            </CCardBody>
          </CCard>
        </CCol>
        </CRow>
    )
}
