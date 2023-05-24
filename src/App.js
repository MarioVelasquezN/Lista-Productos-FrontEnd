import './App.css';
import { useEffect ,useState} from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Button, Modal, Box} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const DEFAULT_IMAGE_URL = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg';
function App() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  
  useEffect(()=>{
    const fetchItems = async () => {
      try {
        const response = await fetch('/products-data.json');
        const data= await response.json();
        setProducts(data.products.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  },[]);


  return (
    <div class="products-container">
        <h1>Products List </h1>
        {products.map((product) => (  
          <div class="card-container">
            <Card key={product.id} 
            sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            marginBottom:'1rem',
            borderRadius:'10px'
            }}>
              <div class="img-container">
                <CardMedia
                  component="img"
                  height="150"
                  borderRadius="10px 0 0 10px"
                  image={product.imageUrl ||DEFAULT_IMAGE_URL}
                  alt="Product Image"
                />
              </div>
                <CardContent>
                  <Typography variant="h5" component="div" className="product-name" color="primary-name" onClick={() => openModal(product)}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h5" >
                    ${product.price}
                  </Typography>
                </CardContent>
          </Card>
          </div>
          ))}
        <Modal open={open} onClose={() => setOpen(false)} className="mdl-container">
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
          {selectedProduct && (
          <>
          <p className="sub-container">{selectedProduct.category}&gt;{selectedProduct.subcategory}</p>
          <div class="img-container">
            <CardMedia
              component="img"
              height="150"
              borderRadius="10px 0 0 10px"
              image={selectedProduct.imageUrl ||DEFAULT_IMAGE_URL}
              alt="Product Image"
            />
          </div>
            <Typography variant="h5" component="div" color="primary">
              {selectedProduct.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedProduct.description}
            </Typography>
            <Typography variant="h6">${selectedProduct.price}</Typography>
          </>
          )}
          <Button variant="contained" onClick={()=>toast.success('Product added to cart')} className="btm-container">
            Add to Cart
          </Button>
        </Box>
        </Modal>
      <ToastContainer />
    </div>
  );
}

export default App;
