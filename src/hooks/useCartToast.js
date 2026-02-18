import { useState, useRef, useEffect } from 'react';
// import { Toast } from 'bootstrap';
// TODO: 考慮是否統一使用 import from 'bootstrap';
// https://chatgpt.com/share/6995f1df-8118-800e-b0ef-78fa5ced6b15
import { Toast } from "bootstrap/dist/js/bootstrap.bundle.min.js";

// TODO: 考慮將此狀態提升至 Global Context，以支援全域呼叫與防止卸載消失
export function useCartToast() {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const toastRef = useRef(null);
  const bsToastRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    bsToastRef.current = new Toast(toastRef.current, { autohide: false });
  }, []);

  useEffect(() => {
    if (showToast) {
      bsToastRef.current.show();
    }
    else {
      bsToastRef.current.hide();
    }
  }, [showToast]);

  function showCartToast(message, isSuccess = true) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setShowToast(false);
      setTimeout(() => {
        setMessage(message);
        setIsSuccess(isSuccess);
        setShowToast(true);
        setHideTimeout();
      }, 300); // 等待隱藏動畫
    }
    else {
      setMessage(message);
      setIsSuccess(isSuccess);
      setShowToast(true);
      setHideTimeout();
    }

    function setHideTimeout() {
      timeoutRef.current = setTimeout(() => {
        setShowToast(false);
        timeoutRef.current = null;
      }, 5000);
    }
  }
 
  return {
    toastRef,
    message,
    isSuccess,
    showCartToast
  };
}