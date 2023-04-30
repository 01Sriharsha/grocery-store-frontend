import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { getAllFeedbacks } from "../../../api/customerService";
import { BiReply } from "react-icons/bi";
import FeedbackReplyModal from "../utils/FeedbackReplyModal";

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const [feed, setFeed] = useState({});

  useEffect(() => {
    getAllFeedbacks()
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Card>
        <Card.Header className="bg-primary fs-4 text-light text-center">
          Manage Feedbacks
        </Card.Header>
        <Card.Body>
          <Table
            responsive
            hover
            borderless
            className="text-center text-capitalize"
          >
            <thead>
              <tr className="text-primary text-center">
                <th>Feedback Id</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Message</th>
                <th>Reply</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={index}>
                  <td className="fw-semibold">#{feedback.id}</td>
                  <td>{feedback.product.name}</td>
                  <td>{feedback.customer.name}</td>
                  <td>{feedback.date}</td>
                  <td>
                    <textarea
                      disabled
                      rows="1"
                      className="text-center border-0"
                      defaultValue={feedback.message}
                    />
                  </td>
                  <td>
                    {feedback.reply ? (
                      <textarea
                        disabled
                        rows="1"
                        className="text-center border-0"
                        defaultValue={feedback.reply}
                      />
                    ) : (
                      <BiReply
                        role="button"
                        size={"1.4rem"}
                        color="green"
                        onClick={() => {
                          toggle();
                          setFeed(feedback);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <FeedbackReplyModal feedback={feed} show={show} toggle={toggle} />
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageFeedbacks;
