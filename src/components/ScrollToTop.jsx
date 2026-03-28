import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // 取得路徑
  const navType = useNavigationType(); // 取得導航類型：PUSH, POP, 或 REPLACE

  useEffect(() => {
    // 只有在「非後退」的操作（例如點擊 Link 跳轉，即 PUSH）時，才強制捲動到頂部
    if (navType !== "POP") {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
      return () => clearTimeout(timer);
    }
    
    // 如果是 POP (回上一頁)，就不執行 scrollTo(0, 0)
    // 瀏覽器會自動嘗試恢復到先前的滾動位置
  }, [pathname, navType]); 

  return null;
};

export default ScrollToTop;
