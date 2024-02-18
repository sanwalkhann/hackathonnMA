import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";

interface TableDataItem {
  author: string;
  language: string;
  type: string;
  participants_count: number;
  domain_rank: number;
  site_url: string;
}

const ProjectTables: React.FC = () => {
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://finalbackend-seven.vercel.app/articles")
      .then((response) => response.json())
      .then((data: TableDataItem[]) => setTableData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Project Listing</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the projects
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Team Lead</th>
                <th>Language</th>
                <th>Type</th>
                <th>Participants Count</th>
                <th>Domain Rank</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <i
                        className="bi bi-person-circle"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <div className="ms-3">
                        <h6 className="mb-0">{data.author}</h6>
                        <span className="text-muted">{data.site_url}</span>
                      </div>
                    </div>
                  </td>
                  <td>{data.language}</td>
                  <td>{data.type}</td>
                  <td>{data.participants_count}</td>
                  <td>{data.domain_rank}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
