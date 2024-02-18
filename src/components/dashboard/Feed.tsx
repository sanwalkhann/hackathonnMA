import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

interface Feed {
  _id: string;
  author: string;
  published: string;
}

const Feeds = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]); // Provide type information for the feeds state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://finalbackend-seven.vercel.app/articles")
      .then((response) => response.json())
      .then((data) => setFeeds(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feeds.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Feeds</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Authors and publications
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {currentItems.map((feed) => (
            <ListGroupItem
              key={feed._id}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <div className="me-3">
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </div>

              <div>
                <div>{feed.author}</div>
              </div>

              <div className="ms-auto">
                <small className="text-muted">
                  {new Date(feed.published).toLocaleString()}
                </small>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
        <div
          className="mt-4"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            disabled={currentItems.length < itemsPerPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Feeds;
