import React, { Component } from "react";
import Input from "../Common/Input";
import Sidebar from "../Sidebar/Sidebar";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../Common/Firebase";
import Spinner from "../Common/Spinner";

class Categories extends Component {
  state = { name: "", categories: [], loading: false };

  async componentDidMount() {
    this.setState({ loading: true });
    const categories = await getCategories();

    this.setState({
      categories,
      loading: false,
    });
  }
  inputHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  addCategory = async () => {
    if (this.state.name === "") {
      alert("Category Name is required.");
    } else {
      this.setState({ loading: true });
      try {
        await createCategory(this.state.name);
        const categories = await getCategories();
        this.setState({
          categories,
          loading: false,
        });
      } catch (error) {
        this.setState({ loading: false });
        alert(error.message);
      }
    }
  };

  delete = async (id) => {
    this.setState({ loading: true });

    try {
      await deleteCategory(id);
      const categories = this.state.categories.filter(
        (category) => category.uid !== id
      );
      this.setState({
        categories,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };
  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="categories">
            <div className="text-center my-3">
              <h2>Add New Category</h2>
            </div>
            <div>
              <Input
                name="name"
                label="Category Name"
                onChange={this.inputHandler}
                type="text"
                placeholder="Enter Category Name"
              />
            </div>

            <div className="text-center">
              <button
                onClick={this.addCategory}
                className="btn primary-button px-5"
              >
                Add Category{" "}
              </button>
            </div>

            <table className="responsive__table mt-3">
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map((category) => {
                  return (
                    <tr className="table-list-item" key={category.uid}>
                      <td data-label="Category Name">{category.name}</td>
                      <td data-label="Delete">
                        <div className="d-flex justify-content-end">
                        <i
                          className="fa fa-trash"
                          onClick={() => this.delete(category.uid)}
                        ></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Categories;