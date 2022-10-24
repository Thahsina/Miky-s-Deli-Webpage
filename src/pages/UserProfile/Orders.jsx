import React from "react";
import { Table } from "reactstrap";
import "../../Components/styles/orders.css";
// import { Pagination, PaginationItem, PaginationLink,Container } from "reactstrap";

const Orders = () => {
  return (
    <div className="orders__page">
      <div className="orders__container">
        <h2>My Orders</h2>
        <Table hover>
          <thead>
            <tr>
              <th># Order Number</th>

              <th>Order</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Date Purchased</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">17834AS</th>

              <td>PIZZA BURGER</td>
              <td>1</td>
              <td>QAR 250</td>
              <td>Aug 30, 2022</td>
              <td>
                <button className="reorderBtn">Reorder</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2345AS</th>

              <td>SUPER BEEF QUESADILLA + MOJREM RICE BEEF...</td>
              <td>1</td>
              <td>QAR 700</td>
              <td>Jan 31, 2021</td>
              <td>
                <button className="reorderBtn">Reorder</button>
              </td>
            </tr>
            <tr>
              <th scope="row">32356AS</th>

              <td>SAFFRON RICE BEEF</td>
              <td>X1</td>
              <td>QAR 500</td>
              <td>Dec 15, 2021</td>
              <td>
                <button className="reorderBtn">Reorder</button>
              </td>
            </tr>
            <tr>
              <th scope="row">77234AS</th>

              <td>RIB EYE STEAK</td>
              <td>x1</td>
              <td>QAR 450</td>
              <td>Aug 20, 2022</td>
              <td>
                <button className="reorderBtn">Reorder</button>
              </td>
            </tr>
            <tr>
              <th scope="row">77234AS</th>

              <td>RIB EYE STEAK</td>
              <td>X1</td>
              <td>QAR 450</td>
              <td>Aug 20, 2022</td>

              <td>
                <button className="reorderBtn">Reorder</button>
              </td>
            </tr>
          </tbody>
        </Table>
        {/* <Container>
          <Pagination
            aria-label="Page navigation example"
            style={{ justifyContent: "center" }}
          >
            <PaginationItem className="paginationItem">
              <PaginationLink
                previous
                href="#"
                className="paginationItem__prev"
              />
            </PaginationItem>
            <PaginationItem className="paginationItem">
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem className="paginationItem">
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem className="paginationItem">
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem className="paginationItem">
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem className="paginationItem">
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem className="paginationItem">
              <PaginationLink next href="#" className="paginationItem__next" />
            </PaginationItem>
          </Pagination>
        </Container> */}
      </div>
    </div>
  );
};

export default Orders;
