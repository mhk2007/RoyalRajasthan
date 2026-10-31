import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, History as HistoryIcon, ShoppingBag, Trash2, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchApiJson } from "../../api";
import Navbar from "../Navbar";
import "./history.css";

function formatCreatedAt(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem("authUser") || "null");
  } catch {
    return null;
  }
}

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState({ bookings: [], orders: [] });
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const user = getStoredUser();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      navigate("/login", {
        replace: true,
        state: { message: "Sign in to see your booking and order history." },
      });
      return;
    }

    let isActive = true;

    async function loadHistory() {
      try {
        const { response, data: result } = await fetchApiJson("/api/auth/history", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (response.status === 401) {
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("authUser");
          navigate("/login", {
            replace: true,
            state: { message: result.message || "Please sign in again." },
          });
          return;
        }

        if (!response.ok) {
          throw new Error(result.message || "Could not load your history.");
        }

        if (isActive) {
          setHistory({
            bookings: Array.isArray(result.bookings) ? result.bookings : [],
            orders: Array.isArray(result.orders) ? result.orders : [],
          });
        }
      } catch (error) {
        if (isActive) {
          setErrorMessage(
            error.message === "Failed to fetch"
              ? "Could not connect to the server. Please try again."
              : error.message,
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadHistory();
    return () => {
      isActive = false;
    };
  }, [navigate]);

  const entries = useMemo(() => {
    const bookingEntries = history.bookings.map((booking) => ({
      ...booking,
      entryType: "booking",
      sortDate: booking.createdAt,
    }));
    const orderEntries = history.orders.map((order) => ({
      ...order,
      entryType: "order",
      sortDate: order.createdAt,
    }));

    return [...bookingEntries, ...orderEntries].sort(
      (first, second) => new Date(second.sortDate || 0) - new Date(first.sortDate || 0),
    );
  }, [history]);

  const visibleEntries = entries.filter(
    (entry) => activeFilter === "all" || entry.entryType === activeFilter,
  );

  const handleDelete = async (entry) => {
    const entryLabel = entry.entryType === "booking" ? "table booking" : "food order";
    if (!window.confirm(`Delete this ${entryLabel} from your history?`)) return;

    const token = sessionStorage.getItem("authToken");
    setDeletingId(entry._id);
    setErrorMessage("");

    try {
      const { response, data: result } = await fetchApiJson(
        `/api/auth/history/${entry.entryType}/${entry._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();

      if (response.status === 401) {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authUser");
        navigate("/login", {
          replace: true,
          state: { message: result.message || "Please sign in again." },
        });
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Could not delete this history item.");
      }

      setHistory((current) => ({
        bookings: current.bookings.filter((item) => item._id !== entry._id),
        orders: current.orders.filter((item) => item._id !== entry._id),
      }));
    } catch (error) {
      setErrorMessage(
        error.message === "Failed to fetch"
          ? "Could not connect to the server. Please try again."
          : error.message,
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <>
      <Navbar />
      <main className="user-history-page">
        <div className="user-history-container">
          <header className="user-history-heading">
            <span className="user-history-kicker">
              <HistoryIcon size={16} /> YOUR ROYAL RAJASTHAN ACCOUNT
            </span>
            <h1>Your history</h1>
            <p>
              {user?.name ? `Welcome back, ${user.name}. ` : ""}
              Here are your table bookings and food orders.
            </p>
          </header>

          <div className="user-history-summary">
            <div className="user-history-summary-card">
              <span className="user-history-summary-icon booking-icon">
                <CalendarDays size={20} />
              </span>
              <div>
                <strong>{history.bookings.length}</strong>
                <span>Table bookings</span>
              </div>
            </div>
            <div className="user-history-summary-card">
              <span className="user-history-summary-icon order-icon">
                <ShoppingBag size={20} />
              </span>
              <div>
                <strong>{history.orders.length}</strong>
                <span>Food orders</span>
              </div>
            </div>
          </div>

          <div className="user-history-list-heading">
            <h2>Recent activity</h2>
            <div className="user-history-filters" aria-label="Filter history">
              {[
                ["all", "All"],
                ["booking", "Bookings"],
                ["order", "Orders"],
              ].map(([filter, label]) => (
                <button
                  key={filter}
                  className={activeFilter === filter ? "active" : ""}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="user-history-state">Loading your history…</div>
          ) : errorMessage ? (
            <div className="user-history-state history-error">{errorMessage}</div>
          ) : visibleEntries.length === 0 ? (
            <div className="user-history-empty">
              <span className="user-history-empty-icon">
                <Utensils size={24} />
              </span>
              <h3>No history yet</h3>
              <p>Your table bookings and food orders will appear here.</p>
              <button type="button" onClick={() => navigate("/home")}>
                Explore the restaurant
              </button>
            </div>
          ) : (
            <div className="user-history-list">
              {visibleEntries.map((entry) => (
                <article
                  className="user-history-entry"
                  key={`${entry.entryType}-${entry._id}`}
                >
                  <span
                    className={`user-history-entry-icon ${entry.entryType}-entry-icon`}
                  >
                    {entry.entryType === "booking" ? (
                      <CalendarDays size={20} />
                    ) : (
                      <ShoppingBag size={20} />
                    )}
                  </span>

                  <div className="user-history-entry-main">
                    <div className="user-history-entry-title">
                      <h3>
                        {entry.entryType === "booking"
                          ? "Table booking"
                          : "Food order"}
                      </h3>
                      <span>{formatCreatedAt(entry.createdAt)}</span>
                    </div>

                    {entry.entryType === "booking" ? (
                      <div className="user-history-entry-details">
                        {entry.date && (
                          <span><CalendarDays size={14} /> {entry.date}</span>
                        )}
                        {entry.time && (
                          <span><Clock3 size={14} /> {entry.time}</span>
                        )}
                        {entry.guests && <span>{entry.guests} guests</span>}
                        {entry.tableType && <span>{entry.tableType}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="user-history-order-items">
                          {(Array.isArray(entry.items) ? entry.items : []).map(
                            (item, index) => (
                              <span key={`${item.name || "item"}-${index}`}>
                                {item.name || "Dish"} × {item.quantity ?? 1}
                              </span>
                            ),
                          )}
                        </div>
                        {entry.tableNumber && (
                          <div className="user-history-entry-details">
                            <span>Table {entry.tableNumber}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {(entry.amount ?? entry.totalPrice) != null && (
                    <strong className="user-history-entry-price">
                      ₹{entry.amount ?? entry.totalPrice}
                    </strong>
                  )}
                  <button
                    className="user-history-delete-button"
                    type="button"
                    onClick={() => handleDelete(entry)}
                    disabled={deletingId === entry._id}
                    aria-label={`Delete ${entry.entryType === "booking" ? "table booking" : "food order"}`}
                  >
                    <Trash2 size={15} />
                    {deletingId === entry._id ? "Deleting…" : "Delete"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
