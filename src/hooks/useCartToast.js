import { useState, useRef, useEffect } from 'react';
import { Toast } from 'bootstrap';

// TODO: 考慮將此狀態提升至 Global Context，以支援全域呼叫與防止卸載消失
export function useCartToast() {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const toastRef = useRef(null);
  const bsToastRef = useRef(null);

  useEffect(() => {
    bsToastRef.current = new Toast(toastRef.current);
  }, []);

  useEffect(() => {
    if (showToast) {
      bsToastRef.current.show();
    }
  }, [showToast]);

  function showCartToast(message, isSuccess = true) {
    setMessage(message);
    setIsSuccess(isSuccess);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  }
 
  return {
    toastRef,
    message,
    isSuccess,
    showCartToast
  };
}