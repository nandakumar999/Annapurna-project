import React, { useState } from "react";
import "./index.css";

const AdminOrderDetails = () => {
  const [status, setStatus] = useState({
    confirm: false,
    shipped: false,
    delivery: false,
  });

  const [disabledState, setDisabledState] = useState({
    confirm: false,
    shipped: true,
    delivery: true,
  });

  const [cancelDisabled, setCancelDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleConfirmChange = () => {
    setStatus((prev) => ({ ...prev, confirm: true }));
    setSubmitDisabled(false); // Enable submit button
  };

  const handleShippedChange = () => {
    setStatus((prev) => ({ ...prev, shipped: true }));
    setSubmitDisabled(false); // Enable submit button
  };

  const handleDeliveryChange = () => {
    setStatus((prev) => ({ ...prev, delivery: true }));
    setSubmitDisabled(false); // Enable submit button
  };

  const handleCancel = () => {
    setStatus({ confirm: false, shipped: false, delivery: false });
    setDisabledState({ confirm: true, shipped: true, delivery: true });
    setCancelDisabled(true); // Disable cancel button
    setSubmitDisabled(true); // Disable submit button
  };

  const handleSubmit = () => {
    if (status.confirm && !status.shipped) {
      setDisabledState({ confirm: true, shipped: false, delivery: true });
    } else if (status.shipped && !status.delivery) {
      setDisabledState({ confirm: true, shipped: true, delivery: false });
    } else if (status.delivery) {
      setDisabledState({ confirm: true, shipped: true, delivery: true });
    }
    setCancelDisabled(true); // Disable cancel button
    setSubmitDisabled(true); // Disable submit button
  };

  return (
    <div className="order-details-container_040">
      <h2 className="order_details_name_040">Order Details:</h2>
      <table className="order-details-table_040">
        <thead>
          <tr className="table-header_040">
            <th className="table-header-cell_040">S.NO</th>
            <th className="table-header-cell_040">Order Name</th>
            <th className="table-header-cell_040">Grams</th>
            <th className="table-header-cell_040">Quantity</th>
            <th className="table-header-cell_040">Customer Name</th>
            <th className="table-header-cell_040">Customer Address</th>
            <th className="table-header-cell_040">Confirm</th>
            <th className="table-header-cell_040">Shipped</th>
            <th className="table-header-cell_040">Delivery</th>
            <th className="table-header-cell_040">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="order-details-row_040">
            <td className="order-details-cell_040">1</td>
            <td className="order-details-cell_040">Pickle</td>
            <td className="order-details-cell_040">50 grams</td>
            <td className="order-details-cell_040">2</td>
            <td className="order-details-cell_040">Venkatesh</td>
            <td className="order-details-cell_040">Guntur</td>
            <td className="order-details-cell_040">
              <input
                type="checkbox"
                id="confirm1"
                name="confirm1"
                checked={status.confirm}
                disabled={disabledState.confirm}
                onChange={handleConfirmChange}
                className="custom-checkbox_040"
              />
              <button
                onClick={handleCancel}
                className="cancel-button_040"
                disabled={cancelDisabled}>
                Cancel
              </button>
            </td>
            <td className="order-details-cell_040">
              <input
                type="checkbox"
                id="shipped1"
                name="shipped1"
                checked={status.shipped}
                disabled={disabledState.shipped}
                onChange={handleShippedChange}
                className="custom-checkbox_040"
              />
            </td>
            <td className="order-details-cell_040">
              <input
                type="checkbox"
                id="delivery1"
                name="delivery1"
                checked={status.delivery}
                disabled={disabledState.delivery}
                onChange={handleDeliveryChange}
                className="custom-checkbox_040"
              />
            </td>
            <td className="order-details-cell_040">

              <div className="submit-container_040">
                <button
                  onClick={handleSubmit}
                  className="submit-button_040"
                  disabled={submitDisabled}
                >
                  Submit
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};


export default AdminOrderDetails;