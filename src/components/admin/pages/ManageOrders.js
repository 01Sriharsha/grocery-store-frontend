import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateOrderByAdmin } from "../../../api/AdminService";
import { getAllOrders } from "../../../api/customerService";
import { TOAST_PROP } from "../../../App";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadAllOrders = () => {
    getAllOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  const updateOrder = (order, value) => {
    updateOrderByAdmin(order.orderId, { ...order, ...value })
      .then((res) => {
        loadAllOrders();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update Order", TOAST_PROP);
      });
  };

  const handleCancellation = (order, value) => {
    updateOrderByAdmin(order.orderId, { ...order, cancel: value })
      .then((res) => {
        loadAllOrders();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update Order", TOAST_PROP);
      });
  };

  if (orders.length === 0) {
    return (
      <div className="" style={{ minHeight: "70vh" }}>
        <h2>No Orders</h2>
      </div>
    );
  }
  return (
    <Container>
      <Card className="shadow my-2">
        <Card.Title className="bg-primary text-light py-2 fs-3 text-center">
          Manage Orders
        </Card.Title>
        <Card.Body>
          <Table striped bordered hover>
            <thead className="text-center text-capitalize">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody className="text-center text-capitalize">
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="fw-semibold">{order.orderId}</td>
                  <td>{order.date}</td>
                  <td className="text-capitalize">{order.customerName}</td>
                  <td>
                    {order.products.map((item, index) => (
                      <p key={index}>{item.name}</p>
                    ))}
                  </td>
                  <td>₹{order.totalPrice}</td>
                  {!order.dispatched && (
                    <>
                      <td>
                        {order.dispatched ? "Dispatched" : "Not Dispatched"}
                      </td>
                      <td>
                        {!order.dispatched && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              updateOrder(order, { dispatched: true })
                            }
                          >
                            Dispatch
                          </Button>
                        )}
                      </td>
                    </>
                  )}

                  {order.dispatched && !order.delivered && (
                    <>
                      <td>{order.delivered ? "Delivered" : "Not Delivered"}</td>
                      <td>
                        {!order.delivered && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              updateOrder(order, { delivered: true })
                            }
                          >
                            Delivered
                          </Button>
                        )}
                      </td>
                    </>
                  )}

                  {order.dispatched && order.delivered && (
                    <>
                      <td>
                        Disptached <br />
                        and Delivered
                      </td>
                      <td>-</td>
                    </>
                  )}

                  {order.cancel === "pending" ? (
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleCancellation(order, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancellation(order, "rejceted")}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  ) : (
                  <td>-</td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageOrders;
