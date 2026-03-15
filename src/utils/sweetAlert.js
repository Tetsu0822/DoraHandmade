import Swal from "sweetalert2";

/**
 * 通用刪除確認 Dialog
 * @param {string} title   - 標題
 * @param {string} text    - 說明文字
 * @returns {Promise<boolean>} - 使用者按確認回 true，取消回 false
 *
 * 使用範例：
 * const confirmed = await confirmDelete("確定刪除？", "此操作無法復原");
 * if (!confirmed) return;
 */
export const confirmDelete = async (title = "確定刪除？", text = "此操作無法復原") => {
    const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確認刪除",
        cancelButtonText: "取消",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        reverseButtons: true,           // 取消在左、確認在右
    });
    return result.isConfirmed;
};

/**
 * 通用成功提示（可選用，取代 showSuccess）
 */
export const alertSuccess = (title = "操作成功", text = "") => {
    return Swal.fire({
        title,
        text,
        icon: "success",
        confirmButtonText: "確認",
        confirmButtonColor: "#198754",
        timer: 1500,
        timerProgressBar: true,
    });
};

/**
 * 通用錯誤提示（可選用，取代 showError）
 */
export const alertError = (title = "操作失敗", text = "") => {
    return Swal.fire({
        title,
        text,
        icon: "error",
        confirmButtonText: "確認",
        confirmButtonColor: "#dc3545",
    });
};
