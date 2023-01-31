import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div>
            <div className="btn">Successfull</div>
            <p>Your order is being prepared. Thanks for choosing Bloom Shop</p>
            <Link to="/">Back Home</Link>
        </div>
    );
};

export default Success;
