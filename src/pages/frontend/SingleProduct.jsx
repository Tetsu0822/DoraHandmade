import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import product1 from '@images/product-1.png';
import product2 from '@images/product-2.png';
import product3 from '@images/product-3.png';
import product4 from '@images/product-4.png';



// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;


function SingleProduct() {
  const [qty, setQty] = useState(1);
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [wishlistUpdated, setWishlistUpdated] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
        
        setProduct(res.data.product);
      } catch (error) {
        console.error("取得商品失敗：", error);
      }
    };
     if (id) {
    getProduct();
  }
  }, [id]);

<<<<<<< HEAD
 const relatedProducts = [
=======
  const relatedProducts = [
>>>>>>> 592223fbe0eed60f17c41ced2a39e6b03489b24e
  { id: 1, title: "銀白冬夜亮片蝴蝶結", price: 777, images: product1 },
  { id: 2, title: "聖誕紅緞帶雙層蝴蝶結", price: 777, images: product2 },
  { id: 3, title: "聖誕雪花點點蝴蝶結", price: 777, images: product3 },
  { id: 4, title: "銀白冬夜亮片蝴蝶結", price: 777, images: product4 },
];

  // --- 函式處理 (補齊你報錯的功能) ---
  const handleQtyChange = (delta) => {
    setQty(prev => Math.max(1, Math.min(99, prev + delta)));
  };
// 加入購物車功能
  const handleAddToCart = async (productId, qty = 1) => {
    try {
      const cartData = {
      data: {
        product_id: productId,
        qty: Number(qty) // 確保數量是數字
      }
    };
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, 
        cartData
      );
      if (res.data.success) {
        alert("已加入購物車！");
        navigate('/category/:mainCat/:subCat');
      }
    } catch (error) {
      alert("加入購物車失敗，請稍後再試", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const cartData = {
      data: {
        product_id: product.id,
        qty: Number(qty)
      }
    };
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`,  cartData);
      if (res.data.success) {
        navigate('/cart');
      }
    } catch (error) {
      alert("系統忙碌中，請稍後再試", error);
    }
  };

  const handleAddToWishlist = (productItem) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isBookmarked = wishlist.some(item => String(item.id) === String(productItem.id));
    if (!isBookmarked) {
    wishlist.push(productItem);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('已加入收藏！');
  } else {
    // 如果已經收藏了，再點一次就「取消收藏」 (這功能很貼心！)
    const newWishlist = wishlist.filter(item => String(item.id) !== String(productItem.id));
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    alert('已移除收藏！');
  }
  setWishlistUpdated(!wishlistUpdated);
  };

  const isFavorite = (productId) => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  return wishlist.some(item => String(item.id) === String(productId));
};

  if (!product) {
  return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-2">商品資料讀取中...</p>
    </div>
  );
}
  

  

  return (
    <>
    
    <div className="single-product container mt-4">
      <div className="container">
        <nav
          style={{ "--bs-breadcrumb-divider": "'>'" }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">首頁</a></li>
            <li className="breadcrumb-item"><a href="#/product">全部商品</a></li>
            <li className="breadcrumb-item"><a href="#/category/handmade/bow">{product.category}</a></li>
            <li className="breadcrumb-item active text-primary" aria-current="page">{product.title}</li>
          </ol>
        </nav>
      </div>

      <div className="single-product container mt-4 pb-5">
        <div className="row ">
          <div className="col-md-6">
            <img src={product.imageUrl} alt={product.title} className="img-fluid image-hover" style={{ width: '636px' }}/>
          </div>
          <div className="col-md-6">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
           <div className="d-flex justify-content-between align-items-center">
              <span className="fs-3 fw-bold text-pink">
                ${product.price}
              </span>
              <button 
                type="button" 
                className="ms-auto btn p-1 border-0 bg-transparent d-block d-md-none"
                onClick={handleAddToWishlist}
              >
                <Heart            
                />
              </button>
            </div>

            <div className="input-group" style={{ width: "192px" }}>
              <button className="btn  btn-minus btn-sm p-3" type="button" onClick={() => handleQtyChange(-1)}><Minus /></button>
              <input type="number" className="form-control text-center bg-white border-0" value={qty} readOnly />
              <button className="btn  btn-plus btn-sm p-3" type="button" onClick={() => handleQtyChange(+1)}><Plus /></button>
            </div>
            {/* 操作按鈕 */}
              <div className="d-flex flex-row gap-3 mb-3  mt-4">
                
                  <button 
                    className="btn btn-sm btn-outline-primary flex-grow-1 text-nowrap d-flex align-items-center justify-content-center"
                     onClick={() => handleAddToCart(product.id,qty)} 
                  >
                   加入購物車
                  </button>
                
                
                  <button 
                    className="btn btn-sm btn-primary flex-grow-1 text-nowrap d-flex align-items-center justify-content-center text-white "
                    onClick={handleBuyNow}
                  >
                   <span className='mr-2'>立即購買</span> <ShoppingCart />
                  </button>
                

                {/* 加入收藏按鈕 */}
                

                  <button 
                    className="btn btn-sm  flex-grow-1 text-nowrap d-flex align-items-center justify-content-center d-none d-md-block btn-add-cart"
                    onClick={() => handleAddToWishlist(product)}>
                  
                    <span className='mr-2 '><Heart className={isFavorite(product.id) ? "is-favorite" : ""} /></span>
                    <span>加入收藏</span>
                  </button>
                
              </div>

            
          
       
            
          </div>
        </div>
      </div>
      <main>
        <div className="mb-5 border-bottom border-primary-200 pb-4 border-bottom border-primary-200 pb-4 ">
          <h6 className="fw-bold mb-3">商品介紹</h6>
          {product.content?.split('\n').map((line, index) => (
            
            line.trim() && <p key={index} className="mb-2">{line}</p>
          ))}
          
        </div>
        <div className="mb-5 border-bottom border-primary-200 pb-4" >
           <h6 className="fw-bold mb-3">商品特色</h6>
            <ul className="mb-0">
              {product.features?.split('\n').map((feature, index) => (
                feature.trim() && <li key={index} className="mb-2">{feature}</li>
              ))}
                           
            </ul>
        </div>
        <div className="mb-5 border-bottom border-primary-200 pb-4 ">
          <h6 className="fw-bold mb-3">商品規格</h6>
          {product.specifications?.split('\n').map((line, index) => {
            // 1. 拆分標題與內容 (以第一個冒號為準)
            const [label, ...valueParts] = line.split('：');
            const value = valueParts.join('：');

            return (
              line.trim() && (
                <p key={index} className="mb-2 lh-sm">
                  {/* 標題：粗體 (fw-bold) */}
                  <span className="fw-bold">{label}：</span>
                  {/* 內容：細體 (預設或 fw-normal) */}
                  <span className="fw-normal">{value}</span>
                </p>
              )
            );
          })}    
          

        </div>
        <div className="mb-5 border-bottom border-primary-200 pb-4">
          <h6 className="fw-bold mb-3">保養與注意事項</h6>
            <ul className="mb-0">
              <li>建議避免長時間受潮或浸水</li>
              <li>若有灰塵可輕拍或使用柔軟刷具清理</li>
              <li>請勿大力拉扯或機洗</li>
              <li>手工商品每款略有差異，屬正常現象</li>
            </ul>
        </div>
        <div className="mb-5 border-bottom border-primary-200 pb-4">
          <h6 className="fw-bold mb-3">貼心提醒</h6>
          <ul className="mb-0">
            <li className="mb-4">螢幕顯示顏色可能與實品略有差異</li>
            <li>
              若有客製化需求（尺寸、配件），歡迎使用
              <a href="#/customization" className='fw-bold text-decoration-underline'>客製化服務</a>
              洽詢
            </li>
          </ul>
        </div>
      </main>
    </div>
    <section className="py-7">
        <div className="container">
          <h6 className='fw-bold mb-4'>相關商品</h6>
          <div className="row">
            {relatedProducts?.map(item => (
            <div className="col-md-3 col-12 mb-4" key={item.id}>
              {/* 卡片容器：必須要有 position-relative */}
              <div className="card w-100 h-100 border-0 shadow-sm position-relative">
                
                {/* 1. 愛心收藏按鈕 (絕對定位在圖片右上角) */}
                <button 
                  className="btn btn-light shadow-sm rounded-circle position-absolute wishlist-btn "
                  style={{ top: '30px', right: '30px', zIndex: 10, padding: '12px 12px' }}
                  onClick={() => handleAddToWishlist(item)}
                >
                  <Heart className={isFavorite(item.id) ? "is-favorite" : ""} />
                </button>

                <img src={item.images} className="card-img-top image-hover p-4" alt={item.title} style={{ objectFit: 'cover' }} />
                
                <div className="card-body p-2 d-flex flex-column px-4">
                  <p className="card-title text-truncate small mb-2 fw-bold text-gray-600">{item.title}</p>
                  
                  {/* 2. 金額與購物車 */}
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className=" fw-bold">NT${item.price}</span>
                    <button 
                      className="btn btn-sm  p-1 btn-add-cart-icon" 
                      onClick={() => handleAddToCart(item.id,1)}
                    >
                      <ShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
            
            
          </div>

        </div>
    </section>
    </>
  );
}

export default SingleProduct;
