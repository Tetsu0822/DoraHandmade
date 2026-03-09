import { Link } from "react-router";

function OrderToast({ ref, message = "訂單已成立！", isSuccess = true, orderId }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div ref={ref} className="toast w-auto" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body px-6 py-4">
          <div className="d-flex align-items-center gap-6">
            <p className="fw-bold mb-0">{message}</p>
            {isSuccess && orderId && (
              <Link to={`/order/${orderId}`} className="btn btn-underline">立即查看</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderToast;
