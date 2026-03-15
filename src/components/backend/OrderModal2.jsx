function OrderModal({
    modalType,
    templateOrder,
    getOrders,
    currentPage,
    closeOrderModal
}) {
    return (
        <>
        <div
            className="modal fade"
            id="orderModal"
            tabIndex="-1"
            aria-labelledby="orderModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content border-0">
                    <div className={`modal-header bg-${modalType === 'delete' ? 'danger' : 'dark'} text-white`}>
                        <h5 className="modal-title" id="orderModalLabel">
                            <span>{
                                    modalType === 'delete' ? '刪除' :
                                    modalType === 'edit' ? '編輯' : '新增'}訂單
                            </span>
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* 訂單詳情內容 */}
                        Test
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-primary cancelBtn"
                            data-bs-dismiss="modal"
                        >
                            取消
                        </button>
                        {
                            modalType === 'delete' ? (
                                <button
                                    type="button"
                                    className="btn btn-danger text-white"
                                    onClick={() => {
                                        closeOrderModal();
                                    }}
                                >
                                    確認刪除
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary text-white">
                                    確認
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default OrderModal;