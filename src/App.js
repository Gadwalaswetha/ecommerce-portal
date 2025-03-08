import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import "./styles.css";
const App = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  // State for invoices
  const [invoices, setInvoices] = useState([]);

  // State for form inputs
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  // Fetch initial data
  useEffect(() => {
    // Dummy data for products
    setProducts([
      { id: 1, name: "Product A", price: 50, description: "Description A" },
      { id: 2, name: "Product B", price: 100, description: "Description B" },
    ]);

    // Dummy data for invoices
    setInvoices([
      { id: 1, store: "Store A", date: "2025-03-01", total: 120 },
      { id: 2, store: "Store B", date: "2025-03-02", total: 200 },
    ]);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...form, id: p.id } : p
        )
      );
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    handleClose();
  };

  // Open and close modal
  const handleOpen = (product = null) => {
    setEditingProduct(product);
    if (product) setForm(product);
    else setForm({ name: "", price: "", description: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Filter products by search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <AppBar
        position="static"
        style={{ marginBottom: "20px", backgroundColor: "#3f51b5" }}
      >
        <Toolbar>
          <Typography variant="h6">Store Management Portal</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Product Management
        </Typography>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          style={{ marginBottom: "20px" }}
        >
          Add Product
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <Slide
                  key={product.id}
                  direction="up"
                  in={true}
                  mountOnEnter
                  unmountOnExit
                >
                  <TableRow>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        onClick={() => handleOpen(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </Slide>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h2 style={{ marginTop: "40px" }}>Invoices</h2>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Store</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <Slide
                  key={invoice.id}
                  direction="up"
                  in={true}
                  mountOnEnter
                  unmountOnExit
                >
                  <TableRow>
                    <TableCell>{invoice.store}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>${invoice.total}</TableCell>
                  </TableRow>
                </Slide>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editingProduct ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default App;
