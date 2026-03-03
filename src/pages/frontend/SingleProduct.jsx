import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';
import productImg from "../../assets/images/product-4_2.png";


// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;


function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const {id} = useParams();
  // --- 靜態資料 (取代 API，確保切版時有東西看) ---
  const mainProduct = {
    id: id || "item_001",
    title: "暖冬毛絨小鹿蝴蝶結",
    description: "柔軟毛絨搭配小鹿點綴，散發冬季溫暖氛圍，適合日常或節慶穿搭的可愛蝴蝶結。",
    price: 777,
    image: productImg
  };

  const relatedProducts = [
    { id: 1, title: "銀白冬夜亮片蝴蝶結", price: 777, images: "/src/assets/images/product-1.png" },
    { id: 2, title: "聖誕紅緞帶雙層蝴蝶結", price: 777, images: "/src/assets/images/product-2.png" },
    { id: 3, title: "聖誕雪花點點蝴蝶結", price: 777, images: "/src/assets/images/product-3.png" },
    { id: 4, title: "銀白冬夜亮片蝴蝶結", price: 777, images: "/src/assets/images/product-4.png" },
  ];

  // --- 函式處理 (補齊你報錯的功能) ---
  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(99, prev + delta)));
  };

  const handleAddToCart = (productId) => {
    alert(`商品 ID: ${productId} 已加入購物車 (數量: ${quantity})`);
  };

  const handleBuyNow = () => {
    alert(`立即購買商品！即將導向結帳頁面...`);
  };

  const handleAddToWishlist = () => {
    alert('已加入收藏清單！');
  };
  

  

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
            <li className="breadcrumb-item"><a href="#">蝴蝶結</a></li>
            <li className="breadcrumb-item active text-primary" aria-current="page">暖冬毛絨小鹿蝴蝶結</li>
          </ol>
        </nav>
      </div>

      <div className="single-product container mt-4 pb-5">
        <div className="row ">
          <div className="col-md-6">
            <img src={mainProduct.image} alt={mainProduct.title} className="img-fluid image-hover" style={{ width: '636px' }}/>
          </div>
          <div className="col-md-6">
            <h3>{mainProduct.title}</h3>
            <p>{mainProduct.description}</p>
           <div className="d-flex justify-content-between align-items-center">
              <span className="fs-3 fw-bold text-pink">
                ${mainProduct.price}
              </span>
              <button 
                type="button" 
                className="ms-auto btn p-1 border-0 bg-transparent d-block d-md-none"
                onClick={handleAddToWishlist}
              >
                <Heart />
              </button>
            </div>

            <div className="input-group" style={{ width: "192px" }}>
              <button className="btn  btn-minus btn-sm p-3" type="button" onClick={() => handleQuantityChange(-1)}><Minus /></button>
              <input type="number" className="form-control text-center bg-white border-0" value={quantity} readOnly />
              <button className="btn  btn-plus btn-sm p-3" type="button" onClick={() => handleQuantityChange(+1)}><Plus /></button>
            </div>
            {/* 操作按鈕 */}
              <div className="d-flex flex-row gap-3 mb-3  mt-4">
                
                  <button 
                    className="btn btn-sm btn-outline-primary flex-grow-1 text-nowrap d-flex align-items-center justify-content-center"
                     onClick={() => handleAddToCart(mainProduct.id)} 
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
                    onClick={handleAddToWishlist}>
                  
                    <span className='mr-2 '><Heart /></span>
                    <span>加入收藏</span>
                  </button>
                
              </div>

            
          
       
            
          </div>
        </div>
      </div>
      <main>
        <div className="mb-5 border-bottom border-primary-200 pb-4 border-bottom border-primary-200 pb-4">
          <h6 className="fw-bold mb-3">商品介紹</h6>
          <p className="mb-1">在寒冷的季節裡，讓一個小小的蝴蝶結替你帶來溫暖。</p>
          <p className="mb-1">《暖冬毛絨小鹿蝴蝶結》選用細緻柔軟的毛絨布料，搭配可愛的小鹿元素點綴，呈現冬日專屬的溫馨氣息。</p>
          <p className="mb-0">不論是日常穿搭、聖誕節交換禮物，或是冬季拍照造型，都能為整體造型增添溫柔亮點。</p>
        </div>
        <div className="mb-5 border-bottom border-primary-200 pb-4" >
           <h6 className="fw-bold mb-3">商品特色</h6>
            <ul className="mb-0">
              <li>柔軟毛絨質地，觸感舒適</li>
              <li>小鹿造型點綴，充滿冬季與節慶感</li>
              <li>手工製作，每一個蝴蝶結略有不同</li>
              <li>輕巧不厚重，長時間配戴也舒適</li>
              <li>適合送禮、自用皆宜</li>
            </ul>
        </div>
        <div className="mb-5 border-bottom border-primary-200 pb-4 ">
          <h6 className="fw-bold mb-3">商品規格</h6>
          

          <p className='mb-2 lh-sm'><span className="fw-bold">商品​名​稱：</span><span>​ 暖​冬毛絨​小鹿蝴蝶結</span></p>
          <p className='mb-2 lh-sm'><span className="fw-bold">尺寸：</span><span>​ 約​ 寬 8 cm × ​高 5 cm​（手工製​作略​有​誤差）​</span></p>
          <p className='mb-2 lh-sm'><span className="fw-bold">材質：</span><span>毛​絨布、​緞帶、​金屬​配件​</span></p>
          <p><span className="fw-bold">顏色：</span><span>​ 奶​油白​／​暖​棕色系​（依實​際出貨​為準）</span></p>
          

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
            {relatedProducts.map(item => (
            <div className="col-md-3 col-12 mb-4" key={item.id}>
              {/* 卡片容器：必須要有 position-relative */}
              <div className="card w-100 h-100 border-0 shadow-sm position-relative">
                
                {/* 1. 愛心收藏按鈕 (絕對定位在圖片右上角) */}
                <button 
                  className="btn btn-light shadow-sm rounded-circle position-absolute wishlist-btn  "
                  style={{ top: '30px', right: '30px', zIndex: 10, padding: '12px 12px' }}
                  onClick={handleAddToWishlist}
                >
                  <Heart  />
                </button>

                <img src={item.images} className="card-img-top image-hover p-4" alt={item.title} style={{ objectFit: 'cover' }} />
                
                <div className="card-body p-2 d-flex flex-column px-4">
                  <p className="card-title text-truncate small mb-2 fw-bold text-gray-600">{item.title}</p>
                  
                  {/* 2. 金額與購物車 (使用 justify-content-between 推向兩端) */}
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className=" fw-bold">NT${item.price}</span>
                    <button 
                      className="btn btn-sm  p-1 btn-add-cart-icon" 
                      onClick={() => handleAddToCart(item.id)}
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
