import { Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./products.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const groupByCategory = () => {
    const groupedProducts = {};
    for (const product of products) {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    }
    return groupedProducts;
  };

  return (
    <div className="products-container">
      {Object.entries(groupByCategory()).map(([category, products]) => (
        <Accordion key={category}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              {products.map((product, index) => (
                <Card key={index} className="col-md-4 mt-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  <div>
                    <Typography variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: {product.price}
                    </Typography>
                  </div>
                </Card>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Products;
