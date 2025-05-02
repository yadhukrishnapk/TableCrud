// src/components/home/Home.tsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useAuthActions } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useEmployees } from "../../hooks/useEmployee";
import EmployeeTable from "./employeeTable/EmployeeTable";
import "./Home.css";
import { Employee } from "../../types/employee";
import Header from "./header/Header";
import ErrorDisplay from "../error/ErrorDisplay";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "name";

  const { logoutUser } = useAuthActions();
  const { isAuthenticated, user } = useAuth();
  const { employees, totalEmployees, isLoading, isValidating, error, mutate } =
    useEmployees(currentPage, sortOrder, sortBy) as {
      employees: Employee[];
      totalEmployees: number;
      isLoading: boolean;
      isValidating: boolean;
      error: Error | null;
      mutate: () => void;
    };

  const totalPages = Math.ceil(totalEmployees / 10);


  const handlePageChange = (newPage: number): void => {
    setSearchParams({ page: newPage.toString(), sortOrder, sortBy });
  };

  const handleSort = (column: string, newSortOrder: "asc" | "desc"): void => {
    setSearchParams({
      page: currentPage.toString(),
      sortOrder: newSortOrder,
      sortBy: column,
    });
  };

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  if (error) {
    return <ErrorDisplay message={error.message} onRetry={() => mutate()} />;
  }


  return (
    <div className="home-wrapper">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />

      <Container className="main-content mt-4">
        <Row>
          <Col>
            <div className="content-card">
              <h2 className="mb-4">Employee List</h2>

              {isLoading && !employees.length ? (
                <div className="loading-spinner">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <>
                  <EmployeeTable
                    employees={employees}
                    navigate={navigate}
                    onSort={handleSort}
                    currentSortBy={sortBy}
                    currentSortOrder={sortOrder}
                  />

                  {isValidating && (
                    <div className="text-center text-muted my-2">
                      Refreshing data...
                    </div>
                  )}

                  <div className="pagination-controls">
                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isValidating}
                    >
                      Previous
                    </Button>

                    {pages.map((page) => (
                      <Button
                        key={
                          page === "..."
                            ? `ellipsis-${pages.indexOf(page)}`
                            : page
                        }
                        variant="secondary"
                        onClick={() =>
                          typeof page === "number" && handlePageChange(page)
                        }
                        disabled={isValidating}
                        className={`mx-1 ${
                          page === currentPage ? "active" : ""
                        }`}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages || isValidating}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>

        {!isAuthenticated && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="primary" onClick={() => navigate("/login")}>
                Login
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
