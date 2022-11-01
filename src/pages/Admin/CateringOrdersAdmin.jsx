import React from "react";
import { Col, Row } from "reactstrap";
import "../../Components/styles/cateringOrderAdmin.css";
import CateringOrderCardAdmin from "../../Components/UI/CateringOrderCardAdmin";
import NoOrderImg from "../../images/NoOrders.svg";
import { useStateValue } from "../../context/StateProvider";

const CateringOrdersAdmin = () => {
  const [{ cateringOrders }] = useStateValue();
  return (
    <>
      <div className="cateringOrdersAdmin__page">
        <h2 className="text-center mb-4">Catering Orders</h2>
        <Row>
          <div className="cateringOrdersAdmin__container">
            <Col lg="12" md="12">
              {cateringOrders ? (
                <CateringOrderCardAdmin data={cateringOrders} />
              ) : (
                <div className="noOrdersMsg">
                  <img src={NoOrderImg} alt="" />
                  <h4>No Orders Yet !</h4>
                </div>
              )}
            </Col>
          </div>
        </Row>
      </div>
    </>
  );
};

export default CateringOrdersAdmin;
