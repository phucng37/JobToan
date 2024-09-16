import React from 'react'
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

export default function ManageProduct() {
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
                      <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell scope="row">1</CTableHeaderCell>
                      <CTableDataCell>Mark</CTableDataCell>
                      <CTableDataCell>Otto</CTableDataCell>
                      <CTableDataCell>@mdo</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">2</CTableHeaderCell>
                      <CTableDataCell>Jacob</CTableDataCell>
                      <CTableDataCell>Thornton</CTableDataCell>
                      <CTableDataCell>@fat</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">3</CTableHeaderCell>
                      <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                      <CTableDataCell>@twitter</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              {/* </DocsExample> */}
            </CCardBody>
          </CCard>
        </CCol>
        </CRow>
    )
}
