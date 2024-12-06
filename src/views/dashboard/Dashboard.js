import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { instanceAxios } from '../../utils/https'
import ChartBar from '../charts/ChartBar'
import ChartPie from '../charts/ChartPie'
import ChartBarBody from '../../components/charts/ChartBarBody'
import { CONFIG } from 'src/helpers/chart'
import ChartHorizontalBarBody from '../../components/charts/ChartHorizontalBarBody'

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DEFAULT_DATASET = {
  labels: [],
  data: []
};

const Dashboard = () => {
  const [, forceUpdate] = React.useReducer(o => !o);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0)
  const [revenue, setRevenue] = useState('');
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [productsByDate, setProductsByDate] = useState([]);
  const [filterBy, setFilterBy] = useState('month');

  const [datasetProductsByDate, setDatatasetProductsByDate] = useState(DEFAULT_DATASET);
  const [datasetRevenueByMonth, setDatatasetRevenueByMonth] = useState(DEFAULT_DATASET);
  const [datasetPieChart, setDatasetPieChart] = useState(DEFAULT_DATASET);
  const [datasetBarLineChart, setDatasetBarLineChart] = useState(DEFAULT_DATASET);

  console.log('0000', totalOrders, totalUsers, totalProducts);
  const fetchData = async () => {
    const res = await Promise.allSettled([
      instanceAxios.get('order/totalOrders'),
      instanceAxios.get('get-total-users'),
      instanceAxios.get('order/revenue'),
      instanceAxios.get('order/productsByDate', {
        params: {
          filterBy
        }
      }),
      instanceAxios.get('order/productsByCategory'),
      instanceAxios.get('order/productsByBrand')
    ]);
    console.log('res', res);
    setTotalOrders(getData(res, 0)?.totalOrders);
    setTotalProducts(getData(res, 0)?.totalProducts);
    setRevenue(formatRenvenue(getData(res, 0)?.revenue));
    setTotalUsers(getData(res, 1)?.totalUsers);
    setDatatasetRevenueByMonth(convertToDataset(getData(res, 2)));
    setDatatasetProductsByDate(convertToDataset(getData(res, 3)));
    setDatasetPieChart(convertToDataset(getData(res, 4)));
    setDatasetBarLineChart(convertToDataset(getData(res, 5)));
  };

  const convertToDataset = (dataSource) => {
    const newData = {...DEFAULT_DATASET};
    console.log('dataSource: ', dataSource);
    newData.labels = dataSource?.map(item => item._id) || [];
    newData.data = dataSource?.map(item => item.value) || [];
    console.log('newData: ', newData);
    return newData;
  }

  const formatRenvenue = (amount) => {
    return new Intl.NumberFormat('vi-VI', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }
  const getData = (res, index) => {
    return res[index]?.value?.data;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickFilter = async (value) => {
    console.log('value: ', value);
    setFilterBy(value);
    const res = await instanceAxios.get('order/productsByDate', {
      params: {
        filterBy: value
      }
    });
    console.log('res: ', res);
    if (res.data) {
       setDatatasetProductsByDate(convertToDataset(res.data));
    }
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" totalUsers={totalUsers} totalProducts={totalProducts} totalOrders={totalOrders} revenue={revenue} />
      <CCard className="mb-4">
        <ChartBar title={`Product sold by ${filterBy}`} filterBy={filterBy} isVisibleFilter={true} onClickFilter={(value) => handleClickFilter(value)} a={productsByDate}>
          <ChartBarBody dataset={datasetProductsByDate} config={{
            ...CONFIG,
            datasets: {
              label: 'Products'
            },
          }} />
        </ChartBar>
      </CCard>
      <CRow>
        <CCol sm={7}>
          <CCard className="mb-4">
            <ChartBar title="Products sold by brand" children={<ChartHorizontalBarBody data={datasetBarLineChart.data} labels={datasetBarLineChart.labels} />} />
          </CCard>
        </CCol>
        <CCol sm={5}>
          <CCard className="mb-4">
            <ChartPie data={datasetPieChart.data} labels={datasetPieChart.labels} title="Revenue by category" />
          </CCard>
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <ChartBar children={<ChartBarBody dataset={datasetRevenueByMonth} config={{
          datasets: {
            label: 'Revenue'
          },
          scales: {
            y: {
              suffix: ' đ'
            }
          }
        }} />} title="Revenue by month" />
      </CCard>
      {/* <WidgetsBrand className="mb-4" withCharts /> */}
      {/* <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
