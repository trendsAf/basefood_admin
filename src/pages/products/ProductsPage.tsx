import ProducerProductComponent from "../../components/products/Producer/ProducerProductComponent";
import ConsumerProductComponent from "../../components/products/consumer/ConsumerProductComponent";
import { useRole } from "../../context/RoleProvider";

const ProductsPage = () => {
  const { isProducer } = useRole();

  return (
    <div>
      {isProducer("producer") ? (
        <ProducerProductComponent />
      ) : (
        <ConsumerProductComponent />
      )}
    </div>
  );
};

export default ProductsPage;
