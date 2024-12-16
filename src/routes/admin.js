import React from 'react'
import ManagerBanner from '../views/manage-banner';

const Dashboard = React.lazy(() => import('src/views/dashboard/Dashboard'));
const ManageUser = React.lazy(() => import('src/views/manage-user'));
const ManageProduct = React.lazy(() => import('src/views/manage-product'));
const ManageCategory = React.lazy(() => import('src/views/manage-category'));
const ManageOrder = React.lazy(() => import('src/views/manage-order'));
const ManageBrand = React.lazy(() => import('src/views/manage-brand'));

const Colors = React.lazy(() => import('src/views/theme/colors/Colors'))
const Typography = React.lazy(() => import('src/views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('src/views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('src/views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('src/views/base/cards/Cards'))
const Carousels = React.lazy(() => import('src/views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('src/views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('src/views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('src/views/base/navs/Navs'))
const Paginations = React.lazy(() => import('src/views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('src/views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('src/views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('src/views/base/progress/Progress'))
const Spinners = React.lazy(() => import('src/views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('src/views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('src/views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('src/views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('src/views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('src/views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('src/views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('src/views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('src/views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('src/views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('src/views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('src/views/forms/layout/Layout'))
const Range = React.lazy(() => import('src/views/forms/range/Range'))
const Select = React.lazy(() => import('src/views/forms/select/Select'))
const Validation = React.lazy(() => import('src/views/forms/validation/Validation'))

const Charts = React.lazy(() => import('src/views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('src/views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('src/views/icons/flags/Flags'))
const Brands = React.lazy(() => import('src/views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('src/views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('src/views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('src/views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('src/views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('src/views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // m{ path: '/manage-user', name: 'Manage user', element:  },
  { path: '/manage-order', name: 'Manage order', element: ManageOrder },
  { path: '/manage-product', name: 'Manage product', element: ManageProduct },
  { path: '/manage-category', name: 'Manage category', element: ManageCategory },
  { path: '/manage-brand', name: 'Manage brand', element: ManageBrand },
  { path: '/manage-banner', name: 'Manage banner', element: ManagerBanner },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
