import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { CustomContext } from "../../../context/AuthContext";
import {
  deleteProductRequest,
  getAllProductRequestsByCustomer,
} from "../../../api/customerService";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";

const MyRequests = () => {
  const { user } = CustomContext();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllProductRequestsByCustomer(user.id)
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }, [user.id]);

  const handleDelete = (id) => {
    toast
      .promise(
        deleteProductRequest(id),
        {
          pending: "Deleting the request....",
          success: "Product requested removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = requests.filter((request) => request.id !== id);
        setRequests(newArr);
      })
      .catch((err) => {
        toast.error(
          err.response.data
            ? err.response.data
            : "Failed to remove the product request...!",
          TOAST_PROP
        );
      });
  };

  return (
    <Container>
      <Card className="my-3 shadow">
        <Card.Header className="bg-primary text-light py-2 fs-3 text-center">
          My Requests
        </Card.Header>
        <Card.Body>
          <Table
            responsive
            borderless
            hover
            className="text-center text-capitalize"
          >
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Product Name</th>
                <th>Brand Name</th>
                <th>Date</th>
                <th>Message</th>
                <th>Reply</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr>
                  <td className="fw-semibold">#{request.id}</td>
                  <td>{request.brand}</td>
                  <td>{request.name}</td>
                  <td>{request.date}</td>
                  <td>
                    <textarea
                      disabled
                      className="border-0 text-center"
                      rows="1"
                      defaultValue={request.message}
                    />
                  </td>
                  <td>
                    {request.reply ? (
                      <textarea
                        disabled
                        className="border-0 text-center"
                        rows="1"
                        defaultValue={request.reply}
                      />
                    ) : (
                      "Not Replied"
                    )}
                  </td>
                  <td>
                    <AiFillDelete
                      size="1.2rem"
                      role="button"
                      className="text-danger"
                      onClick={() => handleDelete(request.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyRequests;
