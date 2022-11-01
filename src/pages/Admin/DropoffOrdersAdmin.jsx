import React from 'react'
import { Col, Row } from 'reactstrap'
import NoOrderImg from "../../images/NoOrders.svg";
import { useStateValue } from "../../context/StateProvider";
import DropOffOrderCardAdmin from '../../Components/UI/DropOffOrderCardAmin';

const DropoffOrdersAdmin = () => {
  const [{ dropOffOrders }] = useStateValue();
  return (
    <div className="cateringOrdersAdmin__page">
        <h2 className="text-center mb-4">Drop-Off Orders</h2>
        <Row>
          <div className="cateringOrdersAdmin__container">
            <Col lg="12" md="12">
            {dropOffOrders ? (
                <DropOffOrderCardAdmin data={dropOffOrders} />
              ) : (
                <div className="noOrdersMsg">
                  <img style={{objectFit: 'contain', width:"70%"}} src={NoOrderImg} alt="" />
                  <h5>No Drop-Off Orders Yet !</h5>
                </div>
              )}
            </Col>
          </div>
        </Row>
      </div>
  )
}

export default DropoffOrdersAdmin