import React, { useState } from "react";
import { cilCloudDownload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CButtonGroup, CCardBody, CCol, CRow } from "@coreui/react";
import ChartBarBody from "src/components/charts/ChartBarBody";
import { instanceAxios } from "../../utils/https";

export default function ChartBar({
  children,
  title,
  filterBy,
  isVisibleFilter,
  onClickFilter,
}) {
  return (
    <CCardBody>
      <CRow>
        <CCol sm={5}>
          <h5 id="traffic" className="card-title mb-0">
            {title}
          </h5>
          {/* <div className="small text-body-secondary">January - July {new Date().getFullYear()}</div> */}
        </CCol>
        <CCol sm={7} className="d-none d-md-block">
          {/* <CButton color="primary" className="float-end">
              <CIcon icon={cilCloudDownload} />
            </CButton> */}
          <CButtonGroup hidden={!isVisibleFilter} className="float-end me-3">
            {["Day", "Month", "Year"].map((value) => (
              <CButton
                color="outline-secondary"
                key={value}
                className="mx-0"
                onClick={() => {
                  onClickFilter(value.toLowerCase());
                }}
                active={value.toLowerCase() === filterBy}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup>
        </CCol>
      </CRow>
      {children}
    </CCardBody>
  );
}
