import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import PickleIcon from '../../Asset/pickle_A.jpeg';
import { AuthContext } from "../../context/AuthContext";

import './index.css';

function UserOrders() {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const [orders] = useState([
        { id: 1, name: "Tomato Pickle", status: "On the way", Weight: '200gm', Quantity: 100, cost: '250', remark: 'On The Way Processing', img: PickleIcon, statusColor: "yellow", Deliver_addr: 'Hyderabad, Ameerpet Telangana', phone: 123456, status_year: '30 Days' },
        { id: 2, name: "Mango Pickle", status: "Cancelled", Weight: '350gm', Quantity: 300, cost: '350', remark: 'Your Order Cancelled', img: PickleIcon, statusColor: "red", Deliver_addr: 'Inkollu', phone: 326541, status_year: '2023' },
        { id: 3, name: "Lemon Pickle", status: "Returned", Weight: '450gm', Quantity: 200, cost: '450', remark: 'Your Order Returned', img: PickleIcon, statusColor: "red", Deliver_addr: 'Telangana', phone: 854965, status_year: '2024' },
        { id: 4, name: "Tomato Pickle", status: "Delivered", Weight: '650gm', Quantity: 450, cost: '550', remark: 'Your Order Delivered', img: PickleIcon, statusColor: "green", Deliver_addr: 'Madurai', phone: 789465, status_year: '2023' },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState([]);
    const [storeStatus, setStoreStatus] = useState([]);
    const [yearFilters, setYearFilters] = useState([]);
    // const [recordShow, setRecordShow] = useState(true);

    useEffect(() => {
        document.title = "MyOrders - Annapurna Farms";
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/signup');
        }
    }, [user, navigate]);

    const checkBoxSelect = (status) => {
        setFilters((prev) =>
            prev.includes(status)
                ? prev.filter((item) => item !== status)
                : [...prev, status]
        );
        setStoreStatus((prev) =>
            prev.includes(status)
                ? prev.filter((item) => item !== status)
                : [...prev, status]
        );
    };

    const checkBoxYearSelect = (year) => {
        setYearFilters((prev) =>
            prev.includes(year)
                ? prev.filter((item) => item !== year)
                : [...prev, year]
        );
    };

    const individualStatusRemove = (status) => {
        setFilters((prev) => prev.filter((item) => item !== status));
        setStoreStatus((prev) => prev.filter((item) => item !== status));
    };

    const clearAll = () => {
        setFilters([]);
        setStoreStatus([]);
        setYearFilters([]);
    };

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = filters.length === 0 || filters.includes(order.status);
        const matchesSearch = searchTerm === "" || order.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = yearFilters.length === 0 || yearFilters.includes(order.status_year.toString());
        return matchesStatus && matchesSearch && matchesYear;
    });

    // Navigate to the dynamic track-orders page
    const handleCardClick = (orderId) => {
        navigate(`/track-orders/${orderId}`); // Navigate to the dynamic route with the order ID
    };

    return (
        <div className='user_order-row user_order-mt-5 user_order-mb-5'>
            <div className='user_order-col-md-1'></div>
            <div className='user_order-col-md-10'>
                <section className="user_order-app">
                    <div className='user_order-row'>
                        <div className='user_order-col-md-4 user_order-filterstxt'>
                            <section>
                                <div>
                                    <div className='user_order-display-flex'>
                                        <span><b>Filters</b></span>
                                        <span>
                                            <span className='user_order-clear-btn' onClick={clearAll}>Clear All</span>
                                        </span>
                                    </div>
                                    <div className='user_order-filters-status'>
                                        {storeStatus.map((status, index) => (
                                            <span
                                                onClick={() => individualStatusRemove(status)}
                                                key={index}
                                                className='user_order-filter-badge'
                                            >
                                                X &nbsp;{status}
                                            </span>
                                        ))}
                                    </div>
                                    <div className='user_order-separator'></div>
                                </div>
                                <div>
                                    <header className='user_order-header'>
                                        <b>Order Status</b>
                                    </header>
                                    <div className="user_order-filters mt-2">
                                        <div className="user_order-filter-options">
                                            {["On the way", "Delivered", "Cancelled", "Returned"].map((status) => (
                                                <div className="user_order-form-check" key={status}>
                                                    <input
                                                        className="user_order-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        id={`user_order-flexCheck${status}`}
                                                        checked={filters.includes(status)}
                                                        onChange={() => checkBoxSelect(status)}
                                                    />
                                                    <label className="user_order-label">{status}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* New Year Filters */}
                                <div>
                                    <div className='user_order-separator_01'>
                                        <header className='user_order-header'>
                                            <b>Order Year</b>
                                        </header>
                                    </div>
                                    <div className="user_order-filters mt-2">
                                        <div className="user_order-filter-options">
                                            {["30 Days", "2022", "2023", "2024"].map((year) => (
                                                <div className="user_order-form-check" key={year}>
                                                    <input
                                                        className="user_order-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        id={`user_order-flexCheck${year}`}
                                                        checked={yearFilters.includes(year)}
                                                        onChange={() => checkBoxYearSelect(year)}
                                                    />
                                                    <label className="user_order-label">{year}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='user_order-col-md-8'>
                            <section>
                                <div className="user_order-search-container">
                                    <div className="user_order-search-input">
                                        <input
                                            type="text"
                                            placeholder="Search your orders..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <i className="fas fa-search user_order-search-icon"></i>
                                    </div>
                                </div>

                                <ul className="user_order-list mt-4">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <li key={order.id} className='user_order-list-item'>
                                                <div className="user_order-row user_order-order-item" onClick={() => handleCardClick(order.id)}>
                                                    <div className="user_order-col-2 text-center">
                                                        <img className="user_order-img rounded" src={order.img} alt={order.name} />
                                                    </div>
                                                    <div className="user_order-col-5">
                                                        <h5 className="user_order-name">{order.name}</h5>
                                                        <p className="user_order-bold-text">
                                                            Weight: <b>{order.Weight}</b> &nbsp; Quantity: <b>{order.Quantity}</b>
                                                        </p>
                                                    </div>
                                                    <div className="user_order-col-2 text-center">
                                                        <h6 className="user_order-cost">₹{order.cost}</h6>
                                                    </div>
                                                    <div className="user_order-col-3 text-center">
                                                        <span className="user_order-status">
                                                            <span
                                                                className="user_order-status-circle"
                                                                style={{ backgroundColor: order.statusColor }}
                                                            ></span>
                                                            {order.status}
                                                        </span>
                                                        <small className="user_order-remark">{order.remark}</small>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className='user_order-no-orders'>No orders found.</li>
                                    )}
                                </ul>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default UserOrders;