import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface BlogItem {
  _id: string;
  title: string;
  comments: number;
  likes: number;
  text: string;
  main_img_url?: string;
}

const News: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [blogsPerPage] = useState<number>(3);
  const [expandedBlogIndex, setExpandedBlogIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [commentInput, setCommentInput] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://finalbackend-seven.vercel.app/articles"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: BlogItem[] = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleExpandCollapse = (index: number) => {
    setExpandedBlogIndex(expandedBlogIndex === index ? -1 : index);
  };

  const limitText = (text: string, limit: number) => {
    const words = text.split(" ");
    return (
      words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "")
    );
  };

  const handleLike = (index: number) => {
    const updatedBlogs = [...blogData];
    updatedBlogs[index].likes += 1;
    setBlogData(updatedBlogs);
  };

  const handleCommentSubmit = async (articleId: string) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("User Unauthorized");
        toast.error("Login First");
        return; // Exit function if user is not authenticated
      }
      const response = await fetch(
        `https://finalbackend-seven.vercel.app/comments/${articleId}`, // Updated endpoint to match backend
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ content: commentInput }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const data = await response.json();

      // Assuming the backend returns the updated article with comments included
      setBlogData((prevData) =>
        prevData.map((blog) =>
          blog._id === articleId ? { ...blog, comments: data.comments } : blog
        )
      );

      setCommentInput("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              {blogData
                .slice(
                  (currentPage - 1) * blogsPerPage,
                  currentPage * blogsPerPage
                )
                .map((blogItem, index) => (
                  <div
                    key={index}
                    className="mb-4 card-hover"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <Card
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: "0 auto",
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h5">{blogItem.title}</CardTitle>
                        <Image
                          src={
                            blogItem.main_img_url ||
                            "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          }
                          alt="Main"
                          className="img-fluid mb-3"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <CardText>
                          {expandedBlogIndex === index
                            ? blogItem.text
                            : limitText(blogItem.text, 25)}
                        </CardText>
                        {blogItem.text.split(" ").length > 25 && (
                          <Button
                            color="link"
                            onClick={() => handleExpandCollapse(index)}
                            className="fw-bold text-decoration-none"
                          >
                            {expandedBlogIndex === index
                              ? "Read Less"
                              : "Read More"}
                          </Button>
                        )}
                        <div className="d-flex align-items-center mt-3">
                          <Button
                            color="link"
                            onClick={() => handleLike(index)}
                          >
                            <FaThumbsUp className="me-2" />
                            {blogItem.likes}
                          </Button>
                          <Button
                            color="link"
                            onClick={() => handleCommentSubmit(blogItem._id)}
                          >
                            <FaComment className="me-2" /> {blogItem.comments}
                          </Button>
                        </div>
                        <div className="mt-3">
                          <textarea
                            className="form-control"
                            rows={3}
                            placeholder="Write a comment..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                          ></textarea>
                          <Button
                            color="primary"
                            className="mt-2"
                            onClick={() => handleCommentSubmit(blogItem._id)}
                            disabled={!commentInput.trim()}
                          >
                            Submit
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Prev
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      currentPage === Math.ceil(blogData.length / blogsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default News;
