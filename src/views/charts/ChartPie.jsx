import React from "react";
import { cilCloudDownload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CButtonGroup, CCardBody, CCol, CRow } from "@coreui/react";
import ChartPieBody from "src/components/charts/ChartPieBody";

export default function ChartPie({ data, labels, title }) {
  return (
    <CCardBody>
      <CRow>
        <CCol>
          <h5 id="traffic" className="card-title mb-0">
              {title}
            </h5>
        </CCol>
        {/* <CCol sm={6} className="d-none d-md-block">
          {/* <CButton color="primary" className="float-end">
            <CIcon icon={cilCloudDownload} />
          </CButton>
          <CButtonGroup className="float-end me-3">
            {["Day", "Month", "Year"].map((value) => (
              <CButton
                color="outline-secondary"
                key={value}
                className="mx-0"
                active={value === "Month"}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup> */}
        {/* </CCol> */}
      </CRow>
      <ChartPieBody data={data} labels={labels} />
    </CCardBody>
  );
}
