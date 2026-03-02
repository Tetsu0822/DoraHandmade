import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import ProductCard from '@components/ProductCard';
import CartToast from '@components/CartToast';
import { useFavoriteProductsContext } from '@contexts/FavoriteProducts';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 導入圖片
import products1 from '@images/products/product-1.png';
import products2 from '@images/products/product-2.png';
import products3 from '@images/products/product-3.png';
import products4 from '@images/products/product-4.png';
import products5 from '@images/products/product-5.png';
import products6 from '@images/products/product-6.png';
import products7 from '@images/products/product-7.png';
import products8 from '@images/products/product-8.png';
import products9 from '@images/products/product-9.png';
import products10 from '@images/products/material-1.jpg';
import products11 from '@images/products/material-2.jpg';
import products12 from '@images/products/material-3.jpg';
import products13 from '@images/products/material-4.jpg';
import products14 from '@images/products/material-5.jpg';
import products15 from '@images/products/material-6.jpg';
import products16 from '@images/products/material-7.jpg';

const productData = [
  { id: 'p1', title: '聖誕雪花點點蝴蝶結', category: '蝴蝶結', price: 777, img: products1 },
  { id: 'p2', title: '聖誕紅緞帶雙層蝴蝶結', category: '蝴蝶結', price: 777, img: products2 },
  { id: 'p3', title: '銀白冬夜亮片蝴蝶結', category: '蝴蝶結', price: 777, img: products3 },
  { id: 'p4', title: '暖冬毛絨小鹿蝴蝶結', category: '蝴蝶結', price: 777, img: products4 },
  { id: 'p5', title: '晨光霧面緞帶蝴蝶結', category: '蝴蝶結', price: 777, img: products5 },
  { id: 'p6', title: '柔霧奶茶雙層蝴蝶結', category: '蝴蝶結', price: 777, img: products6 },
  { id: 'p7', title: '奶油白簡約蝴蝶結髮夾', category: '蝴蝶結', price: 777, img: products7 },
  { id: 'p8', title: '星光點點紗質蝴蝶結', category: '蝴蝶結', price: 777, img: products8 },
  { id: 'p9', title: '深海藍典雅蝴蝶結髮束', category: '蝴蝶結', price: 777, img: products9 },
  { id: 'p10', title: '紅色荷葉邊緞帶', category: '帶子', price: 150, img: products10 },
  { id: 'p11', title: '桃紅色荷葉邊緞帶', category: '帶子', price: 150, img: products11 },
  { id: 'p12', title: '粉橘色荷葉邊緞帶', category: '帶子', price: 150, img: products12 },
  { id: 'p13', title: '酒紅色荷葉邊緞帶', category: '帶子', price: 150, img: products13 },
  { id: 'p14', title: '韓國蕾絲黑色蝴蝶結髮夾', category: '夾子', price: 100, img: products14 },
  { id: 'p15', title: '韓國蕾絲粉色蝴蝶結髮夾', category: '夾子', price: 100, img: products15 },
  { id: 'p16', title: '韓國蕾絲白色蝴蝶結髮夾', category: '夾子', price: 100, img: products16 },
];

function Products() {

  const itemsPerPage = 9;
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState(productData);
  const { toggleFavoriteProduct, isProductFavorite } = useFavoriteProductsContext();

  const [toastMsg, setToastMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const toastRef = useRef(null);

  const showToast = (message, success = true) => {
    setToastMsg(message);
    setIsSuccess(success);
    if (toastRef.current && window.bootstrap) {
      const toastEl = toastRef.current.querySelector('.toast');
      if (toastEl) {
        const bsToast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
        bsToast.show();
      }
    }
  };

  // API 取得商品
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        const _products = response.data.products?.filter(p => p.is_enabled);
        // 轉換圖片 key, title, price
        const mapped = _products.map(p => ({
          ...p,
          img: p.imageUrl || p.img,
          title: p.name || p.title,
          price: p.origin_price || p.price,
        }));
        setSortedProducts(mapped);
      } catch (err) {
        console.error('取得商品失敗', err);
      }
    }
    fetchProducts();
  }, []);

  // 排序
  const handleSortChange = (sortType) => {
    let sorted = [...productData];
    if (sortType === 'priceHigh') sorted.sort((a, b) => b.price - a.price);
    else if (sortType === 'priceLow') sorted.sort((a, b) => a.price - b.price);
    else if (sortType === 'dateNew') sorted.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    else if (sortType === 'dateOld') sorted.sort((a, b) => new Date(a.published_at) - new Date(b.published_at));
    setSortedProducts(sorted);
    setCurrentPage(1);
  };

   // 類別篩選
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  const filteredProducts = (sortedProducts || []).filter(
  product => currentCategory === 'all' || product.category === currentCategory
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container pt-5">
      <div ref={toastRef}>
        <CartToast message={toastMsg} isSuccess={isSuccess} />
      </div>

      <div className="row">
        {/* 左側選單 */}
        <nav className="d-none d-md-block col-md-3 bg-white p-4">
          <div className="nav flex-column sticky-top" style={{ top: '20px' }}>
            <a className="nav-link ps-4 py-2 fw-bold text-secondary-700" href="#" onClick={(e) => { e.preventDefault(); handleCategoryChange('all'); }}>全部商品</a>
            <a className="nav-link ps-4 py-2 fw-bold text-secondary-700" href="#" onClick={(e) => { e.preventDefault(); handleCategoryChange('蝴蝶結'); }}>蝴蝶結</a>

            <div className="dropdown material-dropdown">
              <a className="nav-link dropdown-toggle d-flex justify-content-between align-items-center fw-bold ps-4 py-2 text-secondary-700" 
                 href="#" data-bs-toggle="dropdown">
                材料
                <ChevronDown size={16} strokeWidth={2} />
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item fw-bold" href="#" onClick={(e) => { e.preventDefault(); handleCategoryChange('帶子'); }}>帶子</a></li>
                <li><a className="dropdown-item fw-bold" href="#" onClick={(e) => { e.preventDefault(); handleCategoryChange('夾子'); }}>夾子</a></li>
                <li><a className="dropdown-item fw-bold" href="#" onClick={(e) => { e.preventDefault(); handleCategoryChange('貼片'); }}>貼片</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* 主要內容區 */}
        <main className="col-12 col-md-9 col-lg-9 p-4">
        <header className="mb-4">
          <ul className="list-unstyled mb-4 d-flex align-items-center main-content-title">
            <li>
              <h2 className="fs-2 fw-bold">
                {currentCategory === 'all' ? '全部商品' : currentCategory}
                </h2>
            </li>
          </ul>

            <div className="d-flex justify-content-between align-items-center">
              <div className="dropdown app-dropdown ms-4 mt-2 mb-4">
                <button className="btn dropdown-toggle border-0 p-0 fw-bold d-flex align-items-center gap-1 text-secondary-700" 
                        type="button" data-bs-toggle="dropdown">
                  預設排序
                  <ChevronDown size={16} strokeWidth={2} />
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item fw-bold" onClick={() => handleSortChange('default')}>預設排序</button></li>
                  <li><button className="dropdown-item fw-bold" onClick={() => handleSortChange('priceHigh')}>價錢由高至低</button></li>
                  <li><button className="dropdown-item fw-bold" onClick={() => handleSortChange('priceLow')}>價錢由低至高</button></li>
                  <li><button className="dropdown-item fw-bold" onClick={() => handleSortChange('dateNew')}>上架日期由新到舊</button></li>
                  <li><button className="dropdown-item fw-bold" onClick={() => handleSortChange('dateOld')}>上架日期由舊到新</button></li>
                  <li><button className="dropdown-item fw-bold" onClick={() => handleSortChange('hot')}>本週熱賣</button></li>
                </ul>
              </div>
              <div className="text-muted small">
                共 <span className="text-dark fw-bold">{filteredProducts.length}</span> 樣商品
              </div>
            </div>
          </header>

        {/* 商品清單 */}
        <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
          {paginatedProducts.map((product) => (
            <li className="col list-unstyled" key={product.id}>
              <ProductCard 
              product={{
                ...product,
                image: product.img,    
                imageUrl: product.img,
                name: product.title,
                productName: product.title,
                origin_price: product.price,
                unit: "個",
                bgClass: 'bg-gray-100'
              }} 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              />
            </li>
          ))}
        </ul>

          {/* 分頁控制 */}
          {totalPages > 1 && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center align-items-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); if(currentPage > 1) setCurrentPage(currentPage - 1); }}>
                    <ChevronLeft size={20} className="text-secondary-700" strokeWidth={2} />
                  </a>
                </li>
                {[...Array(totalPages).keys()].map(pageNum => (
                  <li className={`page-item ${pageNum + 1 === currentPage ? 'active' : ''}`} key={pageNum}>
                    <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(pageNum + 1); }}>
                      {pageNum + 1}
                    </a>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) setCurrentPage(currentPage + 1); }}>
                    <ChevronRight size={20} className="text-secondary-700" strokeWidth={2} />
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;