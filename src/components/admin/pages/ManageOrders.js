import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateOrderByAdmin } from "../../../api/AdminService";
import { getAllOrders } from "../../../api/customerService";
import { TOAST_PROP } from "../../../App";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadAllOrders = () => {
    getAllOrders()
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  const updateOrder = (id, value) => {
    const obj = {
      delivered: value === "dispatched" ? true : false,
      disptached: value === "delivered" ? true : false,
    };
    updateOrderByAdmin(id, obj)
      .then((res) => {
        loadAllOrders();
      })
      .catch((err) => {
        toast.error("Failed to update Order", TOAST_PROP);
      });
  };

  return (
    <Container>
      <h2 className="text-center my-3 text-primary">Manage Orders</h2>
      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="fw-semibold">{order.orderId}</td>
              <td className="text-capitalize">{order.customerName}</td>
              <td>
                {order.products.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))}
              </td>
              <td>₹{order.totalPrice}</td>
              {!order.dispatched ? (
                <>
                  <td>{order.dispatched ? "Dispatched" : "Pending"}</td>
                  <td>
                    {!order.dispatched && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => updateOrder(order.orderId, "dispatched")}
                      >
                        Dispatch
                      </Button>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td>{order.delivered ? "Delivered" : "Not delivered"}</td>
                  <td>
                    {!order.delivered && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => updateOrder(order.orderId, "delivered")}
                      >
                        Delivered
                      </Button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageOrders;
