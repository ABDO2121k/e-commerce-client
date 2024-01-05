import { useNavigate } from 'react-router-dom';
import './ProductCard.css'

const ProductCard = ({product}) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/product/${product._id}`)} className="productCard w-[15rem] m-3 transition-all cursor-pointer">
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={product.imageUrl.length>1?product.imageUrl[2]:product.imageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
        <p className="font-bold opacity-60">{product.brand}</p>
          <p>
            {product.title}
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <p className="font-semibold">{product.discountPrice} $</p>
            <p className="line-through opacity-50">{product.price}$</p>
            <p className="text-green-600 font-semibold">{product.discountPercent}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
