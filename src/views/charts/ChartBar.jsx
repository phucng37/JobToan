import React from 'react';
import {
    cilCloudDownload
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CButtonGroup,
    CCardBody,
    CCol,
    CRow
} from '@coreui/react'
import ChartBarBody from "src/components/charts/ChartBarBody"

export default function ChartBar ( {children, title} ) {
    return (
        <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h5 id="traffic" className="card-title mb-0">
              {title}
            </h5>
            {/* <div className="small text-body-secondary">January - July 2023</div> */}
          </CCol>
          <CCol sm={7} className="d-none d-md-block">
            {/* <CButton color="primary" className="float-end">
              <CIcon icon={cilCloudDownload} />
            </CButton>
            <CButtonGroup className="float-end me-3">
              {['Day', 'Month', 'Year'].map((value) => (
                <CButton
                  color="outline-secondary"
                  key={value}
                  className="mx-0"
                  active={value === 'Month'}
                >
                  {value}
                </CButton>
              ))}
            </CButtonGroup> */}
          </CCol>
        </CRow>
              {children}
      </CCardBody>
    )
}