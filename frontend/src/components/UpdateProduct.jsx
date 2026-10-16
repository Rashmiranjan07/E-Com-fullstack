import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    available: false,
    quantity: "",
  });

  // Helper function: Convert fetched image blob into a File object so it can be re-uploaded
  const convertUrlToFile = async (blobData, fileName) => {
    const file = new File([blobData], fileName || "image.jpg", {
      type: blobData.type || "image/jpeg",
    });
    return file;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);

        // Fetch the corresponding image file
        const responseImage = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );

        const imageFile = await convertUrlToFile(
          responseImage.data,
          response.data.imageName
        );
        setImage(imageFile);

        // Map backend values into updateProduct state safely
        setUpdateProduct({
          id: response.data.id,
          name: response.data.name || "",
          description: response.data.description || response.data.desc || "",
          brand: response.data.brand || "",
          price: response.data.price || "",
          category: response.data.category || "",
          releaseDate: response.data.releaseDate
            ? response.data.releaseDate.substring(0, 10)
            : "",
          available: response.data.available ?? response.data.productAvailable ?? false,
          quantity: response.data.quantity ?? response.data.stockQuantity ?? 0,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append("imageFile", image);

    // Format numbers properly so Spring doesn't throw coercion/null errors
    const productPayload = {
      ...updateProduct,
      id: parseInt(id, 10),
      price: parseFloat(updateProduct.price) || 0.0,
      quantity: parseInt(updateProduct.quantity, 10) || 0,
      available: Boolean(updateProduct.available),
    };

    updatedFormData.append(
      "product",
      new Blob([JSON.stringify(productPayload)], { type: "application/json" })
    );

    axios
      .put(`http://localhost:8080/api/product/${id}`, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        alert("Product updated successfully!");
        navigate(`/product/${id}`);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Error updating product");
      });
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label"><h6>Name</h6></label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
              required
            />
          </div>

          {/* Brand */}
          <div className="col-md-6">
            <label className="form-label"><h6>Brand</h6></label>
            <input
              type="text"
              name="brand"
              className="form-control"
              value={updateProduct.brand}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label"><h6>Description</h6></label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.description}
              name="description"
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="col-5">
            <label className="form-label"><h6>Price</h6></label>
            <input
              type="number"
              className="form-control"
              value={updateProduct.price}
              name="price"
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label"><h6>Category</h6></label>
            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
              required
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="col-md-4">
            <label className="form-label"><h6>Quantity</h6></label>
            <input
              type="number"
              className="form-control"
              value={updateProduct.quantity}
              name="quantity"
              onChange={handleChange}
              required
            />
          </div>

          {/* Release Date */}
          <div className="col-md-4">
            <label className="form-label"><h6>Release Date</h6></label>
            <input
              type="date"
              className="form-control"
              value={updateProduct.releaseDate}
              name="releaseDate"
              onChange={handleChange}
              required
            />
          </div>

          {/* Image */}
          <div className="col-md-4">
            <label className="form-label"><h6>Image</h6></label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          {/* Available Checkbox */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="available"
                id="availableCheck"
                checked={updateProduct.available}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    available: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="availableCheck">
                Product Available
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;