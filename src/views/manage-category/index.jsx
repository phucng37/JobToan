import React, { useCallback, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { Link } from 'react-router-dom'
import { instanceAxios } from '../../utils/https';

const toastCreateSuccess = (
  <CToast autohide={false} visible={true} className="align-items-center">
  <div className="d-flex">
    <CToastBody>Create successfully!</CToastBody>
    <CToastClose className="me-2 m-auto" />
  </div>
</CToast>
);

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [idCategory, setIdCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const categoryRef = React.useRef(null);
  const [isCreate, setIsCreate] = useState(false);
  const [name, setName ] = useState('');
  const [icon, setIcon] = useState('');
  const [toast, addToast] = useState(0)
  const toaster = React.useRef()
  const fetchCategories = useCallback(async ()=>{
      const res = await instanceAxios.get('category/show');
      if(res.data?.categories) {
        setCategories(res.data?.categories);
      }
  }, []);

  useEffect( ()=>{
    fetchCategories(); 
  }, []);

  const handleSave = useCallback(()=>{

  }, []);

  const handleAction = useCallback((category, action)=>{
    console.log('EDIT: ', category)
    setIdCategory(category._id);
    if(action === 'EDIT') {
      categoryRef.current  = category;
      setName(category?.name);
      setIcon(category?.icon);
      setVisible(true);
    } else {
      setIsVisible(true);
    }
  }, [idCategory, isVisible]);

  const handleDelete = useCallback(async ()=>{
    const res = await instanceAxios.delete(`category/delete/${idCategory}`);
    if(res.status === 200){
      fetchCategories();
      setIsVisible(false);
      // addToast(exampleToast);
    }
  }, [isVisible, categories] );
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
      return;
    }
    let res = null;
    if(isCreate) {
      res = await instanceAxios.post('category/create', {
        name,
        icon
      });
    } else {
      res = await instanceAxios.put(`category/update/${idCategory}`, {
        name,
        icon
      });
    }
    if(res.status === 200) {
      setValidated(false);
      fetchCategories();
      setVisible(false);
      // addToast(exampleToast);
    }
  }
    return (
        <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CButton onClick={()=>{
                setIsCreate(true);
                setVisible(true);
              }}>Create new category</CButton>
            </CCardHeader>
            <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Icon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Created date</CTableHeaderCell>
                      <CTableHeaderCell scope='col' colSpan={2}>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      categories.map((category, index)=>(
                    <CTableRow key={category._id}>

                      <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                      <CTableDataCell>{category?.name}</CTableDataCell>
                      <CTableDataCell>{category?.icon}</CTableDataCell>
                      <CTableDataCell>{new Date(category?.createdDate).toDateString()}</CTableDataCell>
                      <CTableDataCell>
                      <CButton color="primary" onClick={()=>handleAction(category, 'EDIT')}>Edit</CButton> {" "}
                      <CButton color="danger" onClick={()=>handleAction(category, 'DELETE')}>Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                      ))
                    }
                  </CTableBody>
                </CTable>
              {/* </DocsExample> */}
            </CCardBody>
          </CCard>
        </CCol>
            <CButton color="primary" onClick={() => setIsVisible(!isVisible)}>Launch demo modal</CButton>
    <CModal
      visible={isVisible}
      onClose={() => setIsVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Notification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure to delete this category?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setIsVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleDelete}>Yes</CButton>
      </CModalFooter>
    </CModal>
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="Write"
    >
      <CModalHeader>
        <CModalTitle id="Write">{isCreate ? 'Create' : 'Edit'} a category</CModalTitle>
      </CModalHeader>
      <CForm   noValidate
    validated={validated} onSubmit={handleSubmit}>
      <CModalBody>

<CCol md={12}>
      <CFormInput
        type="text"
        label="Category name"
        required
        onChange={e=>setName(e.target.value)}
        value={name}
        name="name"
      />
    </CCol>
    <CCol md={12}>
      <CFormInput
        type="text"
        label="Icon"
        required
        onChange={e=>setIcon(e.target.value)}
        value={icon}
        name="icon"
      />
    </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" type='submit' onClick={handleSave}>Submit</CButton>
      </CModalFooter>
      </CForm>
    </CModal>
    <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
        </CRow>
        
    )
}
