function CartToast({ ref, message = "商品已加入購物車！", isSuccess = true }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div ref={ref} className="toast w-auto" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body px-6 py-4">
          <div className="d-flex align-items-center gap-6">
            <p className="fw-bold mb-0">{message}</p>
            {isSuccess && (
              <a href="#" className="btn btn-underline">立即查看</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartToast;
