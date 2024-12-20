import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CRow,
  CTable,
  CToaster
} from "@coreui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import Toast from "src/components/Toast";
import { ACTION } from "../../constant/action";
import { instanceAxios } from "../../utils/https";
import {
  getIndex,
  getTotalPages,
  paginateConfig,
} from "../../utils/paginationUtils";
import CreateEditBrannerModal from "./components/CreateEditBrannerModal";
import DeleteBrannerModal from "./components/DeleteBrannerModal";

const FIELDS = ["id", "name", "thumbnailURL", "directURL", "createdAt", "action"];

const columns = FIELDS.map((field, index) => {
  const column = {
    key: field,
    _props: { scope: "col" },
  };
  switch(field) {
    case 'id':
      column.label = '#';
      break;
    case 'thumbnailURL':
      column.label = 'Thumbnail URL';
      break;
    case 'directURL':
      column.label = 'Direct URL';
      break;
    case 'createdAt':
      column.label = 'Created At';
      break;
  }
  return column;
});

export default function ManagerBanner() {
  const [banners, setBanners] = useState([]);
  const [action, setAction] = useState("");
  const [banner, setBanner] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [toast, addToast] = useState(0);

  const toaster = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = useMemo(() => getIndex(currentPage, 10), [currentPage]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    criteriaMode: "firstError",
  });

  const fetchBanners = useCallback(async () => {
    const res = await instanceAxios.get("banners", {
      params: {
        page: currentPage,
        limit,
      },
    });
    if (res.status === 200 && res.data) {
      const { banners, totalBanners } = res.data;
      setBanners(banners);
      setTotalPages(getTotalPages(totalBanners, limit));
    }
  }, [currentPage]);

  useEffect(() => {
    fetchBanners();
  }, [currentPage]);

  const handleAction = useCallback(
    (banner, action) => {
      setBanner(banner);
      if (action === "EDIT") {
        setAction(ACTION.edit);
        setValue("name", banner.name);
        setValue("thumbnailURL", banner.thumbnailURL);
        setValue("directURL", banner.directURL);
      } else {
        setAction(ACTION.delete);
      }
    },
    [banner]
  );

  const handleDelete = useCallback(async () => {
    const res = await instanceAxios.delete(`banners/${banner._id}`);
    if (res.status === 200) {
      fetchBanners();
      addToast(() => Toast(res?.data?.message));
    }
    setAction("");
  }, [banner]);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      console.log("data: ", data);
      let { name, thumbnailURL, directURL } = data;
      if (!(thumbnailURL instanceof String || typeof thumbnailURL === "string")) {
        console.log("thumbnailURL IS NOT OF STRING");
        thumbnailURL = thumbnailURL[0];
      }
      const payload = {
        name,
        thumbnailURL,
        directURL
      };
      console.log(payload);
      const headerConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let res = null;
      try {
        if (action === ACTION.create) {
          res = await instanceAxios.post("banners", payload, headerConfig);
        } else {
          res = await instanceAxios.put(
            `banners/${banner._id}`,
            payload,
            headerConfig
          );
        }
        if (res?.status === 200) {
          fetchBanners();
          addToast(() => Toast(res?.data?.message));
        }
      } catch (err) {
        addToast(() => Toast(err.response.data.message));
      } finally {
        reset();
        setAction(""); 
        setIsLoading(false);
      }
    },
    [action, banner]
  );

  const [limit, setLimit] = useState(10);

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
  };

  const mapToItems = (banners) =>
    banners?.map((banner, index) => ({
      id: startIndex + index + 1,
      name: banner?.name,
      thumbnailURL: (
        <CImage
          hidden={!banner?.thumbnailURL}
          rounded
          src={banner?.thumbnailURL}
          width={150}
          height={200}
        />
      ),
      directURL: <p className="text-wrap">{banner?.directURL} </p>,
      createdAt: new Date(banner?.createdAt).toDateString(),
      action: (
        <>
          <CButton color="primary" onClick={() => handleAction(banner, "EDIT")}>
            Edit
          </CButton>{" "}
          <CButton color="danger" onClick={() => handleAction(banner, "DELETE")}>
            Delete
          </CButton>
        </>
      ),
    }));
  const handleCloseModal = () => setAction("");
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton
              onClick={() => {
                setAction(ACTION.create);
                setBanner(null);
                reset();
              }}
            >
              Create new banner
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable columns={columns} items={mapToItems(banners)} />
          </CCardBody>
        </CCard>
        <div className="float-end">
          <ReactPaginate
            onPageChange={handlePageClick}
            pageCount={totalPages}
            {...paginateConfig}
          />
        </div>
      </CCol>

      <DeleteBrannerModal
        action={action}
        handleDelete={handleDelete}
        handleCloseModal={handleCloseModal}
      />
      <CreateEditBrannerModal
        action={action}
        banner={banner}
        isLoading={isLoading}
        closeModal={handleCloseModal}
        handleSubmit={handleSubmit}
        dispatchSubmit={onSubmit}
        register={register}
        errors={errors}
      />

      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </CRow>
  );
}
