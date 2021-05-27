import React, { Component } from 'react';
import Modal from 'react-aria-modal';

import BaseAuthPage from '../BaseAuthPage/BaseAuthPage';
import Spinner from '../Spinner/Spinner';

import EditRecordForm from './EditRecordForm';

import globals from '../globals';
import { postRequest } from '../utils';
import * as styles from './AdminPageStyles';

const chainedRequests = requests => {
  return requests.reduce((acc, req) => acc.then(
    () => new Promise(resolve => req(resolve)),
    () => { console.log('Promise chain failed'); }
  ), new Promise(resolve => resolve()));
};

const makeFileField = (id, label, image) => ({
  id, 
  type: 'file', 
  label, 
  value: image ? image : null,
});

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined,
      products: undefined,

      editCategory: undefined,
      displayEditCategoryForm: false,

      editProduct: undefined,
      displayEditProductForm: false,

      authenticated: false,
    }
  }

  onAuth = (userState) => {
    console.log(userState);
    this.session = userState.session;
    this.userdata = userState.userdata;

    this.setState({ authenticated: true });

    chainedRequests([
      resolve => this.loadData('categories', 'categories', resolve),
      resolve => this.loadData('products', 'products', resolve),
      resolve => this.loadData('orders', 'orders', resolve),
    ]);
  }

  loadData = (name, variable, resolve) => {
    console.log('loading data', name);

    // Get a dataset from the list webservice
    const postData = {
      sid: this.session.sid,
      req: name,
    };
    postRequest(globals.endpointList, postData).then(
      responseText => {
        const result = JSON.parse(responseText);
        if (result.status === 1) {
          this.setState({
            [variable]: result.result,
          });
          resolve();
        } else {
          this.setState({ [variable]: null });
        }
      },
      errorMsg => {
        console.log('Error: ', errorMsg);
      }
    );
  }

  displayThumbnail = (thumbnail) => thumbnail ? (
    <li css={styles.thumbnailListItem}>
      <img
        css={styles.thumbnailImage}
        src={`${globals.imageUrlBase}${thumbnail.filename}_64x64${thumbnail.ext}`}
        alt="category example"
      />
    </li>
  ) : null;

  formatCategory = (category) => (
    <tr key={category.id}>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.siteOrder}</td>
      <td css={styles.imageCell}>
        <ol css={styles.thumbnailList}>
          {category.thumbnails.map(thumbnail => this.displayThumbnail(thumbnail))}
        </ol>
      </td>
      <td>
        <button onClick={() => {this.editCategory(category.id)}}>
          Edit
        </button>
        <button onClick={() => {this.deleteCategory(category.id)}}>
          Delete
        </button>
      </td>
    </tr>
  )

  formatProduct = (product) => {
    const category = this.getCategoryById(product.category);

    return (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{category ? category.name : ''}</td>
        <td>{product.name}</td>
        <td>
          <img
            css={styles.thumbnailImage}
            src={`${globals.imageUrlBase}/${product.filename}_64x64${product.ext}`}
            alt="the product"
          />
        </td>
        <td>${product.price}</td>
        <td>
          <button onClick={() => {this.editProduct(product.id)}}>
            Edit
          </button>
          <button onClick={() => {this.deleteProduct(product.id)}}>
            Delete
          </button>
        </td>
      </tr>
    );
  }

  formatOrder = (order) => (
    <tr>
      <td>{order.id}</td>
      <td>{order.userId}</td>
      <td>{order.paypalId}</td>
      <td>{order.status}</td>
      <td>${order.total}</td>
    </tr>
  )

  addNewProduct = () => {
  }

  deleteProduct = (id) => {
  }

  getProductById = (id) => {
    if (this.state.products) {
      for (let i = 0; i < this.state.products.length; i += 1) {
        if (this.state.products[i].id === id) {
          return this.state.products[i];
        }
      }
    }
    return undefined;
  }

  getCategoryById = (id) => {
    if (this.state.categories) {
      for (let i = 0; i < this.state.categories.length; i += 1) {
        if (this.state.categories[i].id === id) {
          return this.state.categories[i];
        }
      }
    }
    return undefined;
  }

  makeCategoryForm = (id) => {
    const category = this.getCategoryById(id);
    console.log('cat>>>', category);
    return [
      { id: 'name', type: 'text', value: category.name, label: 'Name' },
      { id: 'siteOrder', type: 'text', value: category.siteOrder.toString(), label: 'Site Order' },
      makeFileField('thumbnail1', 'Thumbnail 1', category.thumbnails.length > 0 && category.thumbnails[0]),
      makeFileField('thumbnail2', 'Thumbnail 2', category.thumbnails.length > 1 && category.thumbnails[1]),
      makeFileField('thumbnail3', 'Thumbnail 3', category.thumbnails.length > 2 && category.thumbnails[2]),
      makeFileField('thumbnail4', 'Thumbnail 4', category.thumbnails.length > 3 && category.thumbnails[3]),
    ];
  }

  makeProductForm = (id) => {
    const product = this.getProductById(id);
    console.log('product>>>', product);
    return [
      { id: 'name', type: 'text', value: product.name, label: 'Name' },
      makeFileField('image', 'Image', { filename: product.filename, ext: product.ext }),
      { id: 'price', type: 'text', value: product.price, label: 'Price' },
    ];
  }

  editCategory = (id) => {
    this.setState({
      editCategory: id,
      displayEditCategoryForm: true
    });
  }

  editProduct = (id) => {
    this.setState({
      editProduct: id,
      displayEditProductForm: true
    });
  }

  updateRecord = (recordType, listRecordType, variable, id, values) => {
    const postData = {
      sid: this.session.sid,
      req: recordType,
      id: id,
      record: values,
    };
    postRequest(globals.endpointUpdate, postData).then(
      responseText => {
        const result = JSON.parse(responseText);
        if (result.status === 1) {
          // Complete, now let products reload from scratch
          this.setState({ [variable]: undefined });
          this.loadData(listRecordType, variable, () => {});
        } else {
          this.setState({ [variable]: undefined });
        }
      },
      errorMsg => {
        console.log(`Error loading ${recordType}: `, errorMsg);
      }
    );
  }

  prefixFilename = (value, prefix) => {
    if (value.name && value.data) {
      value.name = `${prefix}${value.name}`;
    }
  }

  updateCategory = (id, values) => {
    const prefix = `category_${id}_`;
    this.prefixFilename(values.thumbnail1, prefix);
    this.prefixFilename(values.thumbnail2, prefix);
    this.prefixFilename(values.thumbnail3, prefix);
    this.prefixFilename(values.thumbnail4, prefix);
    
    const formName = (thumbnail) => ({
      name: thumbnail.data ? thumbnail.name : `${thumbnail.name}${thumbnail.ext}`,
      data: thumbnail.data,
    });

    const submitValues = {
      name: values.name,
      siteOrder: values.siteOrder,
      thumbnail1: formName(values.thumbnail1),
      thumbnail2: formName(values.thumbnail2),
      thumbnail3: formName(values.thumbnail3),
      thumbnail4: formName(values.thumbnail4),
    };
    
    console.log(submitValues);
    this.updateRecord('category', 'categories', 'categories', id, submitValues);
    return true;
  }

  updateProduct = (id, values) => {
    console.log('>>> updateProduct()', values);
    const submitValues = {};

    this.updateRecord('product', 'products', 'products', id, submitValues);
    return true;
  }

  render() {

    if (this.state.authenticated && !this.session.admin) {
      return (
        <div>Access Denied</div>
      );
    }

    return (
      <BaseAuthPage onAuth={this.onAuth} showSpinner>
        <div css={styles.content}>
          <h1>Admin</h1>

          <div>
            <h2>Categories</h2>
            <button onClick={this.addNewCategory}>
              New Category
            </button>
            { this.state.categories ? <table css={styles.table}>
              <thead css={styles.tableHead}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Site Order</th>
                  <th>Thumbnails</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody css={styles.tableData}>
                {this.state.categories.map(this.formatCategory)}
              </tbody>
                </table> : Spinner
            }
          </div>

          <div>
            <h2>Products</h2>
            <button onClick={this.addNewProduct}>
              New Product
            </button>
            <div>
              { this.state.products ? <table css={styles.table}>
                  <thead css={styles.tableHead}>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody css={styles.tableData}>
                    {this.state.products.map(this.formatProduct)}
                  </tbody>
                </table>
                : <Spinner />
              }
            </div>
          </div>

          <div>
            <h2>Orders</h2>
            <div>
              { this.state.orders ? <table css={styles.table}>
                  <thead css={styles.tableHead}>
                    <tr>
                      <th>ID</th>
                      <th>User ID</th>
                      <th>PayPal ID</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody css={styles.tableData}>
                    {this.state.orders.map(this.formatOrder)}
                  </tbody>
                </table>
                : <Spinner />
              }
            </div>
          </div>

          {
            this.state.displayEditProductForm && <Modal titleText="Edit Product">
              <EditRecordForm
                title="Edit Product"
                onClose={() => this.setState({ displayEditProductForm: false })}
                onSubmit={(values) => {
                  const result = this.updateProduct(this.state.editProduct, values);
                  if (result) {
                    this.setState({ displayEditProductForm: false, editProduct: null });
                  }
                }}
                formContent={this.makeProductForm(this.state.editProduct)}
              />
            </Modal>
          }

          {
            this.state.displayEditCategoryForm && <Modal titleText="Edit Category">
              <EditRecordForm
                title="Edit Category"
                onClose={() => this.setState({ displayEditCategoryForm: false })}
                onSubmit={(values) => {
                  const result = this.updateCategory(this.state.editCategory, values);
                  if (result) {
                    this.setState({ displayEditCategoryForm: false, editCategory: null });
                  }
                }}
                formContent={this.makeCategoryForm(this.state.editCategory)}
              />
            </Modal>
          }
        </div>
      </BaseAuthPage>
    );
  }
}

export default AdminPage;
