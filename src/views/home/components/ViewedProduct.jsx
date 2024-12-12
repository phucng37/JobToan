import { useCallback, useEffect, useState } from "react";
import { instanceAxios } from "../../../utils/https";
import { CCol, CContainer, CRow } from "@coreui/react";
import CardProductGrid from "../../../components/card/CardProductGrid";

export default function ViewedProduct() {
  const [viewedProducts, setViewedProducts] = useState([]);
  const fetchViewedProducts = useCallback(async () => {
    const res = await instanceAxios.post("/product/viewed-products", {
      viewedProducts: JSON.parse(localStorage.getItem("viewedProducts")),
    });
    if (res.status === 200) {
      setViewedProducts(res.data.viewedProducts);
    }
  }, []);

  useEffect(() => {
    fetchViewedProducts();
  }, []);
  return (
    <CContainer fluid>
      <div className="bg-primary p-3 text-center mb-3">
        <h4 className="m-0 text-white">Viewed Products</h4>
      </div>
      <CRow>
        {viewedProducts.map((product, index) => (
          <CCol sm={2} key={index}>
            <CardProductGrid data={product} />
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
}
