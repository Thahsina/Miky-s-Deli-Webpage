import React from 'react'
import { Col, Row } from 'reactstrap'
import "../../Components/styles/dropoffOrdersAdmin.css"
import CateringOrderCardAdmin from '../../Components/UI/CateringOrderCardAdmin'

const DropoffOrdersAdmin = () => {
  return (
    <div className="cateringOrdersAdmin__page">
        <h2 className="text-center mb-4">Drop-Off Orders</h2>
        <Row>
          <div className="cateringOrdersAdmin__container">
            <Col lg="12" md="12">
              <CateringOrderCardAdmin />
              <CateringOrderCardAdmin />
              <CateringOrderCardAdmin />
            </Col>
          </div>
        </Row>
      </div>
  )
}

export default DropoffOrdersAdmin