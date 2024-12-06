import { CToast, CToastBody, CToastClose } from "@coreui/react";

export default function Toast(message) {
  return (
    <CToast className="align-items-center">
      <div className="d-flex">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  );
}