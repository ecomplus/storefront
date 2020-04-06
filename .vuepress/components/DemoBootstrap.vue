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

    <div v-if="showButtonGroup">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">Left</button>
        <button type="button" class="btn btn-secondary">Middle</button>
        <button type="button" class="btn btn-secondary">Right</button>
      </div>
    </div>

    <div v-if="showInputGroup">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">@example.com</span>
        </div>
      </div>

      <label for="basic-url">Your vanity URL</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
        </div>
        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
          <span class="input-group-text">.00</span>
        </div>
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">With textarea</span>
        </div>
        <textarea class="form-control" aria-label="With textarea"></textarea>
      </div>
    </div>

    <div v-if="showCustomForms">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Options</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <select class="custom-select" id="inputGroupSelect02">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div class="input-group-append">
          <label class="input-group-text" for="inputGroupSelect02">Options</label>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
        <select class="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="input-group">
        <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
      </div>
    </div>

    <div v-if="showNav">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>

    <div v-if="showCard">
      <div class="card" style="width: 18rem;">
        <img src="/assets/img/banner.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div v-if="showBreadcrumb">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">Home</li>
        </ol>
      </nav>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
      </nav>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Library</a></li>
          <li class="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav>
    </div>

    <div v-if="showPagination">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
    <div v-if="showBagde1">
      <h1>Example heading <span class="badge badge-secondary">New</span></h1>
      <h2>Example heading <span class="badge badge-secondary">New</span></h2>
      <h3>Example heading <span class="badge badge-secondary">New</span></h3>
    </div>

    <div v-if="showBagde2">
      <button type="button" class="btn btn-primary">
      Profile <span class="badge badge-light">9</span>
      <span class="sr-only">unread messages</span>
      </button>
    </div>

    <div v-if="showAlert">
      <div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
      <div class="alert alert-secondary" role="alert">
        A simple secondary alert—check it out!
      </div>
      <div class="alert alert-primary" role="alert">
      A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
      </div>
      <div class="alert alert-secondary" role="alert">
      A simple secondary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
      </div>
    </div>

    <div v-if="showListGroup1">
      <ul class="list-group">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>

    <div v-if="showListGroup2">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">
          Cras justo odio
        </a>
        <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
        <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
        <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
        <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
      </div>
    </div>

    <div v-if="showToasts">
      <button
        @click="clickToShowToast()"
        class="btn btn-secondary btn-sm">
        Click to show toast
      </button>
      <br />
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
        <div class="toast-header">
          <img src="/assets/img/logo.png" class="rounded mr-2" alt="...">
          <strong class="mr-auto">Bootstrap</strong>
          <small class="text-muted">11 mins ago</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>

    <div v-if="showModal">
      <button
        @click="clickToShowModal()"
        class="btn btn-secondary btn-sm">
        Click to show modal
      </button>
      <br />
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showTooltip">
      <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
        Tooltip on top
      </button>
      <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Tooltip on right">
        Tooltip on right
      </button>
      <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
        Tooltip on bottom
      </button>
      <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
        Tooltip on left
      </button>
    </div>

    <div v-if="showPopover">
      <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
    </div>

    <div v-if="showSpinners">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-if="showClearfix">
      <div class="bg-info clearfix">
        <button type="button" class="btn btn-secondary float-left">Example Button floated left</button>
        <button type="button" class="btn btn-secondary float-right">Example Button floated right</button>
      </div>
    </div>

    <div v-if="showDisplay">
      <div class="d-inline p-2 bg-primary text-white">d-inline</div>
      <div class="d-inline p-2 bg-dark text-white">d-inline</div>
    </div>

    <div v-if="showEmbed">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
      </div>
    </div>

    <div v-if="showStretchedLink">
      <div class="card" style="width: 18rem;">
        <img src="/assets/img/banner.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card with stretched link</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary stretched-link">Go somewhere</a>
        </div>
      </div>
    </div>

    <div v-if="showSpacing">
      <div class="row mx-md-n5">
        <div class="col px-md-5"><div class="p-3 border bg-light">Custom column padding</div></div>
        <div class="col px-md-5"><div class="p-3 border bg-light">Custom column padding</div></div>
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
      showButtonGroup: {
        default: false
      },
      showInputGroup:{
        default: false
      },
      showCustomForms: {
        default: false
      },
      showNav: {
        default: false
      },
      showCard: {
        default: false
      },
      showBreadcrumb: {
        default: false
      },
      showPagination: {
        default: false
      },
      showBagde1: {
        default: false
      },
      showBagde2: {
        default: false
      },
      showAlert: {
        default: false
      },
      showListGroup1: {
        default: false
      },
      showListGroup2: {
        default: false
      },
      showToasts: {
        default: false
      },
      showModal: {
        default: false
      },
      showTooltip: {
        default:false
      },
      showPopover: {
        default:false
      },
      showSpinners: {
        default:false
      },
      showClearfix: {
        default:false
      },
      showDisplay: {
        default:false
      },
      showEmbed: {
        default:false
      },
      showStretchedLink: {
        default:false
      },
      showSpacing: {
        default:false
      }
    },
    methods: {
      clickToShowToast() {
        $('.toast').toast('show')
      },
      clickToShowModal() {
        $('.modal').modal('show')
      }
    }
  }
</script>


<styles lang="scss">
  .demo {
  @import "../../@ecomplus/storefront-twbs/scss/styles.scss";
  }
</styles>