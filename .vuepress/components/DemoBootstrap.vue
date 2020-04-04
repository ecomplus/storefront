<template>
  <div class="demo">
    <table class="table" v-if="showTable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>

    <div v-if="showButtons">
      <button type="button" class="btn btn-secondary btn-sm">Small button</button>
      <br><br>
      <input class="btn btn-primary" type="submit" value="Submit">
      <br><br>
      <button type="button" class="btn btn-primary btn-lg">Large button</button>
      <br><br>
      <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
    </div>

    <div v-if="showForms">
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Example select</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Example multiple select</label>
          <select multiple class="form-control" id="exampleFormControlSelect2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Example text area</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </form>
    </div>

    <div v-if="showDropdown">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </div>

    <div v-if="showButtonGroup1">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">Left</button>
        <button type="button" class="btn btn-secondary">Middle</button>
        <button type="button" class="btn btn-secondary">Right</button>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'DemoBootstrap',
    props: {
      showTable: {
        default: false
      },
      showButtons: {
        default: false
      },
      showForms: {
        default: false
      },
      showDropdown: {
        default: false
      },
      showButtonGroup1: {
        default: false
      },
      show: {
        default: false
      },
      show: {
        default: false
      },
    }
  }
</script>


<styles lang="scss">
  .demo {
  @import "../../@ecomplus/storefront-twbs/scss/styles.scss";
  }
</styles>