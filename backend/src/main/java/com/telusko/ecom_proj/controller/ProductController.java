package com.telusko.ecom_proj.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.telusko.ecom_proj.model.Product;
import com.telusko.ecom_proj.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductService service;

	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts() {
		return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
	}

	@GetMapping("product/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable int id) {
		Product product = service.getProductById(id);
		if (product != null)
			return new ResponseEntity<>(service.getProductById(id), HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PostMapping(value = "/product", consumes = "multipart/form-data")
	public ResponseEntity<?> addProduct(@RequestPart("product") Product product,
			@RequestPart("imageFile") MultipartFile imageFile) {

		try {
			Product savedProduct = service.addProduct(product, imageFile);

			return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);

		} catch (Exception e) {
			e.printStackTrace();

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/product/{productId}/image")
	public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId) {

		Product product = service.getProductById(productId);
		// Guard against null product or missing image data
		if (product == null || product.getImageData() == null || product.getImageData().length == 0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		byte[] imageFile = product.getImageData();

		// Guard against null/blank imageType from the database
		String imageType = product.getImageType();
		MediaType mediaType = (imageType != null && !imageType.isBlank()) ? MediaType.valueOf(imageType)
				: MediaType.IMAGE_JPEG; // fallback
		return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(imageFile);
	}

	@PutMapping("/product/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart("product") Product product,
			@RequestPart("imageFile") MultipartFile imageFile) {
		Product product1;
		try {
			product1 = service.updateProduct(id, product, imageFile);
		} catch (IOException e) {
			return new ResponseEntity<>("Failed to Updated", HttpStatus.BAD_REQUEST);
		}
		if (product1 != null) {
			return new ResponseEntity<>("Updated", HttpStatus.OK);

		} else {
			return new ResponseEntity<>("Failed to Updated", HttpStatus.BAD_REQUEST);

		}
	}

	@DeleteMapping("/product/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable int id) {
		Product product = service.getProductById(id);

		if (product != null) {
			service.deleteProduct(id);
			return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("products/search")
	public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
		System.out.println("searching with" + keyword);
		List<Product> products = service.searchproducts(keyword);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

}
