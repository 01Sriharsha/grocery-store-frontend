import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { BiReply } from "react-icons/bi";
import { getAllProductRequests } from "../../../api/AdminService";
import ProductRequestReplyModal from "../utils/ProductRequestReplyModal";

const AllProductRequests = () => {
  const [requests, setRequests] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const [request, setRequest] = useState({});

  const loadAllProductRequests = () => {
    getAllProductRequests()
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllProductRequests();
  }, []);

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
                      <BiReply
                        size="1.2rem"
                        role="button"
                        className="text-success"
                        onClick={() => {
                          setRequest(request);
                          toggle();
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <ProductRequestReplyModal
              request={request}
              loadAllProductRequests={loadAllProductRequests}
              show={show}
              toggle={toggle}
            />
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AllProductRequests;
