import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ClassicBow } from '@components/icons';
import ProductCard from '@components/ProductCard';
import ProductCardSkeleton from '@components/ProductCardSkeleton';
import { useFavoriteProductsContext } from '@contexts/FavoriteProducts';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const STORAGE_KEY = 'favorite_product_ids';

function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFF0F4, #FCE4EE)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          border: '1.5px solid #F0D8E4',
        }}
      >
        <Heart size={32} color="#D4849E" />
      </div>
      <h3
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: '1.15rem',
          fontWeight: 600,
          color: '#2a2a2a',
          marginBottom: '10px',
        }}
      >
        還沒有收藏商品
      </h3>
      <p style={{ color: '#aaa', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '28px' }}>
        快去逛逛，把喜歡的蝴蝶結加入收藏吧 ♡
      </p>
      <Link
        to="/product"
        className="btn btn-dora d-inline-flex align-items-center gap-2"
      >
        <ShoppingBag size={16} strokeWidth={2.5} />
        去逛逛
      </Link>
    </div>
  );
}

function MyFavorites() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toggleFavoriteProduct } = useFavoriteProductsContext();

  // 讀取 localStorage 並同步收藏商品
  useEffect(() => {
    async function loadFavorites() {
      setIsLoading(true);
      try {
        // 讀取 localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        let ids = [];
        try {
          ids = stored ? JSON.parse(stored) : [];
        } catch (e) {
          console.log('解析收藏 ID 失敗，重置收藏', e);
          ids = [];
        }
        if (!Array.isArray(ids)) ids = [];

        if (ids.length === 0) {
          setFavoriteProducts([]);
          setIsLoading(false);
          return;
        }

        // 取得所有商品
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
        console.log('所有商品', response.data.products);
        const allProducts = response.data.products?.filter((p) => p.is_enabled) ?? [];

        // 比對收藏 id，保留順序
        const matched = ids
          .map((id) => allProducts.find((p) => String(p.id) === String(id)))
          .filter(Boolean);

        setFavoriteProducts(matched);
      } catch (error) {
        console.error('載入收藏商品失敗', error);
        setFavoriteProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadFavorites();
  }, []);

  function handleRemove(product) {
    toggleFavoriteProduct(product);
    setFavoriteProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  function handleClearAll() {
    if (!window.confirm('確定要清空所有收藏嗎？')) return;
    localStorage.removeItem(STORAGE_KEY);
    favoriteProducts.forEach((p) => toggleFavoriteProduct(p));
    setFavoriteProducts([]);
  }

  return (
    <div className="my-favorites">
      {/* ── Hero ── */}
      <div className="favorites-hero">
        <div className="favorites-hero__circle-1" />
        <div className="favorites-hero__circle-2" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="favorites-hero__eyebrow">DORA HANDMADE</p>
          <h1 className="favorites-hero__title">我的收藏</h1>
          <p className="favorites-hero__subtitle">My Favorites</p>
          <div className="favorites-hero__divider">
            <div className="favorites-hero__line" />
            <Heart size={18} color="#D4849E" fill="#D4849E" />
            <div className="favorites-hero__line" />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container py-10 py-lg-15">

        {/* Loading skeleton */}
        {isLoading && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8">
            {[1, 2, 3].map((i) => (
              <div className="col" key={i}>
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && favoriteProducts.length === 0 && <EmptyState />}

        {/* Product grid */}
        {!isLoading && favoriteProducts.length > 0 && (
          <>
            {/* Toolbar */}
            <div className="favorites-toolbar">
              <p className="favorites-toolbar__count mb-0">
                共 <strong>{favoriteProducts.length}</strong> 件收藏商品
              </p>
              <button
                type="button"
                className="favorites-toolbar__clear"
                onClick={handleClearAll}
              >
                <Trash2 size={14} strokeWidth={2} />
                清空收藏
              </button>
            </div>

            <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
              {favoriteProducts.map((product) => (
                <li className="col list-unstyled" key={product.id}>
                  <ProductCard
                    product={product}
                    onUnfavorite={() => handleRemove(product)}
                  />
                </li>
              ))}
            </ul>

            {/* Decorative bows */}
            <div className="d-flex align-items-center justify-content-center gap-12 py-4 mb-6">
              <ClassicBow className="d-none d-lg-inline-flex" />
              <ClassicBow />
              <ClassicBow width={60} height={44} />
              <ClassicBow />
              <ClassicBow className="d-none d-lg-inline-flex" />
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to="/product" className="btn btn-underline">
                繼續逛逛，發現更多喜歡的商品
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyFavorites;