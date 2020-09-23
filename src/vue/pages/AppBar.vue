<template>
  <div>
    <header
      class="navbar navbar-dark navbar-full bg-primary doc-navbar-default"
    >
      <button
        aria-controls="navdrawerDefault"
        aria-expanded="false"
        aria-label="Toggle Navdrawer"
        class="navbar-toggler"
        data-target="#navdrawerDefault"
        data-toggle="navdrawer"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <span class="navbar-brand mr-auto">Navdrawer</span>
      <div class="ml-3">
        <div class="dropdown">
          <button
            aria-expanded="false"
            aria-haspopup="true"
            class="navbar-toggler"
            data-toggle="dropdown"
            id="app-bar-overflow-menu"
            type="button"
          >
            <i class="material-icons mx-auto">more_vert</i>
          </button>
          <div
            aria-labelledby="app-bar-overflow-menu"
            class="dropdown-menu dropdown-menu-right"
          >
            <div class="text-dark">
              <div class="border-bottom border-light mb-3 pb-2 px-3">
                <p class="m-0 p-0 text-muted text-right small">
                  <i class="material-icons md-18">offline_bolt</i>
                  Super User
                </p>
              </div>
              <div class="px-3 text-center">
                <p>
                  <i class="material-icons md-36 text-primary"
                    >account_circle</i
                  >
                </p>
                <p class="mb-0 pb-0">Robert Starek</p>
                <p class="text-muted">robertstarek@gmail.com</p>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <i class="material-icons mr-3">facebook</i>Connect with Facebook
            </a>
            <a class="dropdown-item" href="#">
              <i class="material-icons mr-3">settings</i>Settings
            </a>
            <a class="dropdown-item" href="#">
              <i class="material-icons mr-3">logout</i>Log Out
            </a>
          </div>
        </div>
      </div>
    </header>
    <div
      aria-hidden="true"
      class="navdrawer"
      id="navdrawerDefault"
      tabindex="-1"
    >
      <div class="navdrawer-content">
        <div class="navdrawer-header">
          <a class="navbar-brand px-0" href="#">Navdrawer header</a>
        </div>
        <nav class="navdrawer-nav">
          <a class="nav-item nav-link active" href="#">Active</a>
          <a class="nav-item nav-link disabled" href="#">Disabled</a>
          <a class="nav-item nav-link" href="#">Link</a>
        </nav>
        <div class="navdrawer-divider"></div>
        <p class="navdrawer-subheader">Navdrawer subheader</p>
        <ul class="navdrawer-nav">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="material-icons mr-3">alarm_on</i> Active with icon
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">
              <i class="material-icons mr-3">alarm_off</i> Disabled with icon
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="material-icons mr-3">link</i> Link with icon
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBar'
};
</script>

<style scoped>
.dropdown-menu {
  width: 80vw;
}

@media (min-width: 576px) {
  .dropdown-menu {
    width: 60vw;
  }
}

@media (min-width: 768px) {
  .dropdown-menu {
    width: 300px;
  }
}
</style>
